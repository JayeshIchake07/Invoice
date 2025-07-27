const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
const port = 5000;




// Middleware to parse JSON
app.use(express.json());

// Enable CORS for all routes
app.use(cors());


// Create MySQL connection
const db = mysql.createPool({
  host: 'localhost', // or your cloud database host
  user: 'root',      // your MySQL username
  password: 'mysql@25', // your MySQL password
  database: 'printing_press' // your MySQL database name
});

// Connect to MySQL
// db.connect((err) => {
//     if (err) {
//         console.error('Error connecting to MySQL:', err);
//         return;
//     }
//     console.log('Connected to MySQL database!');
// });


// A simple route
app.get('/', (req, res) => {
  res.send('Hello, this is the backend API!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});


// Create a new party
// POST: Add a new party
app.post('/api/parties', async (req, res) => {
  const { partyName, gst_no, contact_no } = req.body;

  try {
    const [result] = await db.query(
      'INSERT INTO parties (party_name, gst, contact) VALUES (?, ?, ?)',
      [partyName, gst_no, contact_no]
    );

    res.status(201).json({
      success: 'Party added successfully',
      partyId: result.insertId,
    });
  } catch (err) {
    console.error('Error inserting party:', err);
    res.status(500).json({ error: 'Failed to add party' });
  }
});


app.put('/api/parties/:id', async (req, res) => {
  const partyId = req.params.id;
  const { partyName, gst_no, contact_no } = req.body;

  try {
    const [result] = await db.query(
      'UPDATE parties SET party_name = ?, gst = ?, contact = ? WHERE party_id = ?',
      [partyName, gst_no, contact_no, partyId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Party not found' });
    }

    res.status(200).json({ success: 'Party updated successfully' });
  } catch (err) {
    console.error('Error updating party:', err);
    res.status(500).json({ error: 'Failed to update party' });
  }
});



// GET: Fetch all parties
app.get('/api/parties-list', async (req, res) => {
  try {
    const [result] = await db.query(
      'SELECT party_id, party_name, gst, contact FROM parties'
    );

    res.status(200).json({ data: result });
  } catch (err) {
    console.error('Error fetching parties:', err);
    res.status(500).json({ error: 'Failed to fetch parties' });
  }
});



// GET: Fetch a single party by ID
app.get('/api/get-party/:id', async (req, res) => {
  const partyId = req.params.id;

  try {
    const [result] = await db.query(
      'SELECT party_id, party_name, gst, contact FROM parties WHERE party_id = ?',
      [partyId]
    );

    if (result.length === 0) {
      return res.status(404).json({ error: 'Party not found' });
    }

    res.status(200).json({ data: result[0] });
  } catch (err) {
    console.error('Error fetching party:', err);
    res.status(500).json({ error: 'Failed to fetch party' });
  }
});


app.post('/api/invoices', async (req, res) => {
  const connection = await db.getConnection();
  try {
    const {
      partyName,
      invoice_no,
      invoice_date,
      supply_date,
      items,
      totalAmount,
      grandTotal,
      rupeesInWords,
    } = req.body;

    await connection.beginTransaction();

    const created = Math.floor(Date.now() / 1000);

    const [invoiceResult] = await connection.query(
      `INSERT INTO bill_details (party_id, invoice_no, invoice_date, supply_date, totalAmount, grandTotal, rupeesInWords, created)
       VALUES (?, ?, ?, ?, ?, ?, ?,?)`,
      [partyName, invoice_no, invoice_date, supply_date, totalAmount, grandTotal, rupeesInWords, created]
    );

    const invoiceId = invoiceResult.insertId;

    for (const item of items) {
      await connection.query(
        `INSERT INTO invoice_items (invoice_id, description, hsn_code, quantity, rate, app_gst, amount)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          invoiceId,
          item.description,
          item.hsn_code,
          item.quantity,
          item.rate,
          item.app_gst,
          item.amount,
        ]
      );
    }

    await connection.commit();
    res.status(201).json({ message: 'Invoice saved successfully' });
  } catch (err) {
    await connection.rollback();
    console.error('Error saving invoice:', err);
    res.status(500).json({ message: 'Server error' });
  } finally {
    connection.release();
  }
});


app.get('/api/invoices/:party_id', async (req, res) => {
  const partyId = req.params.party_id;

  try {
    const [result] = await db.query(
      'SELECT * FROM bill_details WHERE party_id = ? ORDER BY invoice_date DESC',
      [partyId]
    );

    res.status(200).json(result); // return array of bills
  } catch (err) {
    console.error('Error fetching bills:', err);
    res.status(500).json({ error: 'Failed to fetch bills' });
  }
});


app.get('/api/invoice-bill/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [invoiceResult] = await db.query(
      'SELECT bd.bill_id, bd.invoice_no, bd.invoice_date, bd.supply_date,bd.totalAmount,bd.grandTotal, bd.rupeesInWords, p.party_id,p.party_name,p.gst,p.contact FROM bill_details bd JOIN parties p ON bd.party_id = p.party_id WHERE bd.bill_id = ?',
    [id]
    );

const [itemsResult] = await db.query(
  'SELECT * FROM invoice_items WHERE invoice_id = ?',
  [id]
);

if (invoiceResult.length === 0) {
  return res.status(404).json({ error: 'Invoice not found' });
}

res.json({ invoice: invoiceResult[0], items: itemsResult });
  } catch (err) {
  console.error(err);
  res.status(500).json({ error: 'Error fetching invoice' });
}
});
