import React, { useRef } from 'react';
import { useLocation } from 'react-router-dom';
import ReactToPrint, { useReactToPrint } from 'react-to-print';

// Import your components (adjust based on export type)
import TaxHeader from './Forms/TaxHeader';
import MainDetails from './Forms/MainDetails';
import Dates from './Forms/Dates';
import Table from './Forms/Table';
import Notes from './Forms/Notes';
import Footer from './Forms/Footer';

export default function TaxInvoiceSummary() {
  const componentRef = React.useRef(null);
  const location = useLocation();
  const { fullInvoiceData } = location.state || {}; // Retrieve the data safely

  console.log(fullInvoiceData);


  const handleAfterPrint = React.useCallback(() => {
    console.log("`onAfterPrint` called");
  }, []);

  const handleBeforePrint = React.useCallback(() => {
    console.log("`onBeforePrint` called");
    return Promise.resolve();
  }, []);

  // const contentRef = useRef<HTMLDivElement>(null);
  const printFn = useReactToPrint({
    contentRef: componentRef,
    documentTitle: "AwesomeFileName",
    onAfterPrint: handleAfterPrint,
    onBeforePrint: handleBeforePrint,
  });



  return (
    <div className="invoice__preview bg-white p-5 rounded-2xl border-4 border-blue-200">
      {/* <ReactToPrint
        trigger={() => (
          <button className="bg-blue-500 ml-5 text-white font-bold py-2 px-8 rounded hover:bg-blue-600 hover:text-white transition-all duration-150 hover:ring-4 hover:ring-blue-400">
            Print / Download
          </button>
        )}
        content={() => {
          console.log(componentRef.current); // Check the value of the ref
          return componentRef.current;
        }}
      /> */}





      <button onClick={printFn}>Print</button>

      <div ref={componentRef} className="p-5">
        <TaxHeader />
        <MainDetails name={fullInvoiceData.partyName} gst_no={fullInvoiceData.gst_no} invoice_no={fullInvoiceData.invoice_no}
          invoice_date={fullInvoiceData.invoice_date} supply_date={fullInvoiceData.supply_date} />
        {/* <Dates
          invoiceNumber={fullInvoiceData.invoice_no}
          invoiceDate={fullInvoiceData.invoice_date}
          supplyDate={fullInvoiceData.supply_date}
        /> */}
        <Table list={fullInvoiceData.items}  data={fullInvoiceData} />


        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '2rem', width: '1000px' }}>
          <div style={{ border: '1px solid black', 'padding':'2rem' }}>
            <div style={{width:'680px', 'height':'70px', 'float':'left', 'color':'#DF3628', 'font-weight':'700'}}>
              Rs. In Words: 
            </div>
            <div style={{width:'200px', 'height':'70px', 'float':'right'}}>
              Amunkar Printers Stamp
            </div>
          </div>
        </div>

        <Notes />
        {/* <Footer /> */}
      </div>
    </div>
  );
}
