import React, { useEffect, useState } from 'react';
import { TextField, Button, Box, Typography, Grid, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ContactSupportOutlined } from '@mui/icons-material';
import { FullscreenOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';

const TaxInvoiceBill = () => {
    const navigate = useNavigate();

    const { party_id } = useParams();

    console.log(party_id);
    const [parties, setParties] = useState([]); // Initialize as an empty array 
    const [allparties, setAllparties] = useState([]);

    useEffect(() => {

        if (party_id) {
            const source = axios.CancelToken.source(); // Create a cancel token for the request

            const fetchParties = async () => {
                try {
                    const response = await axios.get('http://localhost:5000/api/get-party/' + party_id, {
                        cancelToken: source.token, // Attach the cancel token to the request
                    });
                    console.log(response.data.data);

                    const party = response.data.data;
                    // Prefill partyName and gst_no into invoiceData
                    setInvoiceData((prevData) => ({
                        ...prevData,
                        partyName: party?.party_name,
                        gst_no: party?.gst,
                    }));



                    setParties(response.data.data);
                } catch (err) {
                    if (axios.isCancel(err)) {
                        console.log('Request canceled', err.message);
                    } else {
                        setError('Error fetching parties list');
                    }
                }
            };

            fetchParties();
            // Cleanup function to cancel the request if the component unmounts
            return () => {
                source.cancel('Component unmounted: request canceled.');
            };


        } else {
            const source = axios.CancelToken.source(); // Create a cancel token for the request


            const fetchAllParties = async () => {
                try {
                    const response = await axios.get('http://localhost:5000/api/parties-list', {
                        cancelToken: source.token, // Attach the cancel token to the request
                    });
                    console.log(response.data.data);
                    setAllparties(response.data.data);
                } catch (err) {
                    if (axios.isCancel(err)) {
                        console.log('Request canceled', err.message);
                    } else {
                        setError('Error fetching parties list');
                    }
                }
            };

            fetchAllParties();


            // Cleanup function to cancel the request if the component unmounts
            return () => {
                source.cancel('Component unmounted: request canceled.');
            };

        }


    }, [])

    // useEffect(() => {
    // }, [party_id]); // Empty dependency array to run once on mount

    const [invoiceData, setInvoiceData] = useState({
        partyName: '',
        gst_no: '',
        invoice_no: '',
        invoice_date: '',
        supply_date: '',
        items: [
            { description: '', hsn_code: 0, quantity: 0, rate: 0, app_gst: 0, amount: 0 }
        ],
        totalAmount: 0,
        grandTotal: 0,
        rupeesInWords: ''
    });

    const [error, setError] = useState('');

    // Handle input changes for the main form fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInvoiceData({
            ...invoiceData,
            [name]: value,
        });
    };

    // Handle changes for each line item
    // Handle changes for each line item
    const handleItemChange = (index, event) => {
        const { name, value } = event.target;

        const newItems = invoiceData.items.map((item, i) => {
            // Make sure you're modifying only the item that matches the index
            if (i === index) {
                // Copy the current item and apply the changes for 'rate', 'quantity', 'app_gst'
                let updatedItem = { ...item };

                // Update values based on 'name' from the event
                if (name === 'rate' || name === 'quantity' || name === 'app_gst') {
                    const rate = name === 'rate' ? parseFloat(value) : updatedItem.rate || 0;
                    const quantity = name === 'quantity' ? parseFloat(value) : updatedItem.quantity || 0;
                    const app_gst = name === 'app_gst' ? parseFloat(value) : updatedItem.app_gst || 0;

                    // Calculate amount based on the updated values
                    const amount = quantity * rate + app_gst;

                    // Apply updates to the specific item
                    updatedItem = { ...updatedItem, rate, quantity, app_gst, amount };
                }

                // Update the specific field for that item
                updatedItem[name] = value;

                // Return the updated item
                return updatedItem;
            }

            // Return the unchanged item if it's not the one we're updating
            return item;
        });

        // Update the state with the new items array
        setInvoiceData({ ...invoiceData, items: newItems });
    };


    // Add new line item
    const addItem = () => {
        setInvoiceData({
            ...invoiceData,
            items: [...invoiceData.items, { description: '', quantity: 1, price: 0 }],
        });
    };

    // Remove a line item
    const removeItem = (index) => {
        const newItems = invoiceData.items.filter((_, i) => i !== index);
        setInvoiceData({ ...invoiceData, items: newItems });
    };

    // Calculate total amount (sum of each item's quantity * price)
    const calculateTotalAmount = () => {
        const total = invoiceData.items.reduce(
            (acc, item) => acc + item.amount,
            0
        );
        console.log(total)
        return total;
    };

    // Handle form submission
    const onSubmit = async (e) => {
        e.preventDefault();
        // try {
        const totalAmount = calculateTotalAmount();
        console.log(totalAmount)
        const fullInvoiceData = { ...invoiceData, totalAmount, partyName : party_id };

        console.log(fullInvoiceData)

        // Navigate to InvoiceSummary component, passing invoiceData
        // navigate('/taxInvoiceSummary', { state: { fullInvoiceData } });

          await axios.post('http://localhost:5000/api/invoices', fullInvoiceData);
          navigate('/client');
        // } catch (error) {
        //   setError('Error submitting the invoice. Please try again.');
        // }
    };


    // console.log(allparties);
    return (
        <Box
            component="form"
            onSubmit={onSubmit}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                maxWidth: '1000px',
                margin: '0 auto',
                gap: 2,
            }}
        >
            <Typography variant="h4" component="h1" gutterBottom>
                Tax Invoice Form
            </Typography>


            {/* Party Name */}
            <TextField
                label="Party Name"
                name="partyName"
                value={invoiceData.partyName}
                onChange={handleChange}
                required
                disabled
            />



            {/* GSTIN */}
            <Box sx={{ display: 'flex', gap: 2 }}>

                <TextField
                    label="GSTIN"
                    name="gst_no"
                    value={invoiceData.gst_no}
                    onChange={handleChange}
                    required
                    fullWidth
                    disabled
                />
                {/* Invoice No */}

                <TextField
                    label="Invoice No"
                    name="invoice_no"
                    value={invoiceData.invoice_no}
                    onChange={handleChange}
                    required
                    fullWidth
                />
                {/* GST (Goods and Services Tax) */}
                {/* <TextField
                    label="GST (%)"
                    name="gst"
                    type="number"
                    value={invoiceData.gst}
                    onChange={handleChange}
                    required
                    fullWidth
                /> */}

            </Box>

            <Box sx={{ display: 'flex', gap: 2 }}>

                {/* Invoice Date */}
                <TextField
                    label="Invoice Date"
                    name="invoice_date"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={invoiceData.invoiceDate}
                    onChange={handleChange}
                    required
                    fullWidth
                />

                {/* Date of Supply */}
                <TextField
                    label="Date of Supply"
                    name="supply_date"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={invoiceData.dueDate}
                    onChange={handleChange}
                    required
                    fullWidth
                />

            </Box>


            <Typography variant="h6" component="h2">
                Invoice Items
            </Typography>

            {/* Line items */}
            {invoiceData.items.map((item, index) => (
                <Box key={index} sx={{ marginBottom: 2 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Description of Items"
                                name="description"
                                value={item.description}
                                onChange={(e) => handleItemChange(index, e)}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <TextField
                                label="HSN COde"
                                name="hsn_code"
                                type="number"
                                value={item.hsn_code}
                                onChange={(e) => handleItemChange(index, e)}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <TextField
                                label="QTY"
                                name="quantity"
                                type="number"
                                value={item.quantity}
                                onChange={(e) => handleItemChange(index, e)}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                label="Rate"
                                name="rate"
                                type="number"
                                value={item.rate}
                                onChange={(e) => handleItemChange(index, e)}
                                fullWidth
                                required
                            />
                        </Grid>
                        {/* <Grid item xs={2}> */}
                        {/* <TextField
                                label="App GST%"
                                name="app_gst"
                                type="number"
                                value={item.app_gst}
                                onChange={(e) => handleItemChange(index, e)}
                                fullWidth
                                required
                            /> */}
                        <Grid item xs={2}>
                            <FormControl fullWidth required variant="outlined">
                                <InputLabel id={`app-gst-label-${index}`}>App GST%</InputLabel>
                                <Select
                                    labelId={`app-gst-label-${index}`}
                                    id={`app-gst-select-${index}`}
                                    name="app_gst"
                                    value={item.app_gst}
                                    label="App GST%"  // 👈 This enables floating label
                                    onChange={(e) => handleItemChange(index, e)}
                                >
                                    <MenuItem value={2.5}>2.5%</MenuItem>
                                    <MenuItem value={6}>6%</MenuItem>
                                    <MenuItem value={9}>9%</MenuItem>
                                </Select>
                            </FormControl>  
                        </Grid>



                        <Grid item xs={3}>
                            <TextField
                                label="Amount"
                                name="amount"
                                type="number"
                                value={item.amount}
                                onChange={(e) => handleItemChange(index, e)}
                                fullWidth
                                required
                                disabled
                            />
                        </Grid>
                    </Grid>

                    {/* Button to remove item */}
                    {index > 0 && (
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={() => removeItem(index)}
                            sx={{ marginTop: 1 }}
                        >
                            Remove Item
                        </Button>
                    )}
                </Box>
            ))
            }

            {/* Button to add new line item */}
            <Button variant="outlined" onClick={addItem}>
                Add Item
            </Button>

            {
                error && (
                    <Typography color="error" variant="body2">
                        {error}
                    </Typography>
                )
            }

            {/* Submit Button */}
            <Button variant="contained" color="primary" type="submit">
                Submit Invoice
            </Button>
        </Box >
    );
};

export default TaxInvoiceBill;
