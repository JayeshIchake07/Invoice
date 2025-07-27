
export default function MainDetails({ name, gst_no, invoice_no, invoice_date, supply_date }) {

  return (
    <>
      {/* <div>
        <section className="flex flex-col items-end justify-end">
          <h2 className="font-bold text-3xl uppercase mb-1">{name}</h2>
          <p>{gst_no}</p>
        </section>
      </div> */}


      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '2rem', width: '1000px' }}>
        <div style={{ border: '1px solid black' }}>
          {/* First Row with "Party Name" spanning two rows */}
          <div style={{ display: 'flex', width: '100%' }}>
            {/* "Party Name" spans two rows */}
            <div class="main-title"
              style={{
                display: 'flex',
                flexDirection: 'row',
                // justifyContent: 'center',
                gap: '0.5rem',
                // borderBottom: '1px solid black',
                padding: '0.5rem',
                // flex: '1',
                width: '75%'
              }}
            >
              <span style={{'color':'#DF3628'}}>Party Name:</span>
              <div class="main-title-content"
                style={{
                  // borderBottom: '1px solid black',
                  height: '2rem', // Adjust this height as needed to visually span two rows
                }}
              >{name}</div>
            </div>

            {/* Right Column for Invoice No and Supply Date */}
            <div style={{ display: 'flex', flexDirection: 'column', flex: '2', width: '25%' }}>
              {/* First Row - Invoice No. */}
              <div class="main-title" style={{ display: 'flex', alignItems: 'center', padding: '0.5rem', gap: '1rem' }}>
                <span>Invoice No.:</span>
                <div class="main-title-content"
                  style={{
                    // borderBottom: '1px solid black',
                    // width: 25%,
                  }}
                >{invoice_no}</div>
              </div>

              {/* Second Row - Supply Date */}
              <div class="main-title" style={{ display: 'flex', alignItems: 'center', padding: '0.5rem', gap: '1rem' }}>
                <span>Supply Date:</span>
                <div class="main-title-content"
                  style={{
                    // borderBottom: '1px solid black',
                    // width: '200px',
                  }}
                >{supply_date}
                </div>
              </div>
            </div>
          </div>

          {/* Third Row for GSTIN and Invoice Date */}
          <div style={{ display: 'flex', width: '100%' }}>
            {/* GSTIN */}
            <div class="main-title" style={{
              display: 'flex',
              flexDirection: 'row',
              // justifyContent: 'center',
              gap: '0.5rem',
              // borderBottom: '1px solid black',
              padding: '0.5rem',
              // flex: '1',
              width: '75%'
            }}
            >
              <span style={{'color':'#DF3628'}}>GSTIN:</span>
              <div class="main-title-content"
                style={{
                  // borderBottom: '1px solid black',
                }}
              >{gst_no}</div>
            </div>

            {/* Invoice Date */}
            <div class="main-title" style={{ display: 'flex', alignItems: 'center', padding: '0.5rem', gap: '1rem' }}>
              <span>Invoice Date:</span>
              <div class="main-title-content"
                style={{
                  // borderBottom: '1px solid black',
                  // width: '200px',
                }}
              >{invoice_date}</div>
            </div>
          </div>
        </div>


      </div>

    </>
  );
}
