import React, { useContext } from "react";
import { State } from "../../context/stateContext";
import { FaWeight } from "react-icons/fa";

export default function Table({ list, data }) {
  // const { list, total } = useContext(State);
console.log(data)
  return (
    <>
      <table width="100%" className="mb-10" class="table-container">
        <thead>
          <tr className="bg-gray-100 p-1 table-row">
            <td className="font-bold table-cell" style={{ 'width': '25px', 'font-weight': '700', 'text-align': 'center' }}>SR. NO.</td>
            <td className="font-bold table-cell" style={{ 'width': '450px', 'font-weight': '700', 'text-align': 'center' }}>DESCRIPTION OF ITEMS</td>
            <td className="font-bold table-cell" style={{ 'width': '70px', 'font-weight': '700', 'text-align': 'center' }}>HSN Code</td>
            <td className="font-bold table-cell" style={{ 'width': '50px', 'font-weight': '700', 'text-align': 'center' }}>QTY</td>
            <td className="font-bold table-cell" style={{ 'width': '85px', 'font-weight': '700', 'text-align': 'center' }}>RATE</td>
            <td className="font-bold table-cell" style={{ 'width': '40px', 'font-weight': '700', 'text-align': 'center' }}>App. GST%</td>
            <td className="font-bold table-cell" style={{ 'width': '150px', 'font-weight': '700', 'text-align': 'center' }}>AMOUNT</td>
          </tr>
        </thead>
        {list.map(({ description, hsn_code, quantity, rate, amount, app_gst }, index) => (
          <React.Fragment key={index + 1}>
            <tbody>
              <tr className="h-10 table-row">
                <td className="table-cell" style={{ 'width': '25px' }} >{index + 1}</td>
                <td className="table-cell" style={{ 'width': '450px' }}>{description}</td>
                <td className="table-cell" style={{ 'width': '70px' }}>{hsn_code}</td>
                <td className="table-cell" style={{ 'width': '50px' }}>{quantity}</td>
                <td className="table-cell" style={{ 'width': '85px' }}>{rate}</td>
                <td className="table-cell" style={{ 'width': '40px' }}>{app_gst}</td>
                <td className="table-cell" style={{ 'width': '150px' }}>{amount}</td>
              </tr>
            </tbody>
          </React.Fragment>
        ))}



        <tbody>
          <tr className="h-10 table-row-span">
            <td rowspan='2' colspan='1' className="table-cell-span" style={{ 'width': '227px' }} >
              <div>
                <div>
                  <span style={{ fontWeight: '700', display: 'inline-block', width: '80px' }}>GSTIN:</span>
                  27AACPA0943N1ZU
                </div>
                <div><span style={{ fontWeight: '700', display: 'inline-block', width: '80px' }}>PAN NO.:</span>AACPA0943N</div>
                <div><span style={{ fontWeight: '700', display: 'inline-block', width: '80px' }}>STATE</span>MAHARASHTRA (27)</div>
              </div>
            </td>
            <td className="table-cell-span" style={{ 'width': '50px' }}>GST %</td>
            <td className="table-cell-span" style={{ 'width': '100px' }}>2.5%</td>
            <td className="table-cell-span" style={{ 'width': '100px' }}>6%</td>
            <td className="table-cell-span" style={{ 'width': '100px' }}>9%</td>
            <td className="table-cell-span" style={{ 'width': '148px' }}>TOTAL AMOUNT</td>
            <td className="table-cell-span" style={{ 'width': '150px' }}>{data.totalAmount}</td>
          </tr>
          <tr className="h-10 table-row-span">
            <td className="table-cell-span" style={{ 'width': '50px' }}>VALUE</td>
            <td className="table-cell-span" style={{ 'width': '100px' }}></td>
            <td className="table-cell-span" style={{ 'width': '100px' }}></td>
            <td className="table-cell-span" style={{ 'width': '100px' }}></td>
            <td className="table-cell-span" style={{ 'width': '148px' }}>SGST</td>
            <td className="table-cell-span" style={{ 'width': '150px' }}></td>

          </tr>
          <tr className="h-10 table-row-span">
            <td rowspan='2' colspan='1' className="table-cell-span" style={{ 'width': '227px' }} >
            <div>
                <div>
                  <span style={{ fontWeight: '700' }}>Declaration: </span>
                  We declare that this Invoice shows the actual price of the goods described and that all particulars are true & correct.
                </div>
              </div>
            </td>
            <td className="table-cell-span" style={{ 'width': '50px' }}>SGST</td>
            <td className="table-cell-span" style={{ 'width': '100px' }}></td>
            <td className="table-cell-span" style={{ 'width': '100px' }}></td>
            <td className="table-cell-span" style={{ 'width': '100px' }}></td>
            <td className="table-cell-span" style={{ 'width': '148px' }}>CGST</td>
            <td className="table-cell-span" style={{ 'width': '150px' }}></td>
          </tr>
          <tr className="h-10 table-row-span">
            <td className="table-cell-span" style={{ 'width': '50px' }}>CGST</td>
            <td className="table-cell-span" style={{ 'width': '100px' }}></td>
            <td className="table-cell-span" style={{ 'width': '100px' }}></td>
            <td className="table-cell-span" style={{ 'width': '100px' }}></td>
            <td className="table-cell-span" style={{ 'width': '148px', 'color': '#DF3628', 'font-weight': '700' }}>GRAND TOTAL</td>
            <td className="table-cell-span" style={{ 'width': '150px' }}></td>

          </tr>
        </tbody>


      </table>
      <div>
        <h2 className="flex items-end justify-end text-gray-800 text-4xl font-bold">
          {/* Kshs. {total.toLocaleString()} */}
        </h2>
      </div>
    </>
  );
}
