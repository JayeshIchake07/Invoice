export default function Dates({ invoiceNumber, invoiceDate, supplyDate }) {
  // const { invoiceNumber, invoiceDate, dueDate } = useContext(State);

  return (
    <>
      <article className="mt-10 mb-14 flex items-end justify-end">
        <ul>
          <li className="p-1 ">
            <span className="font-bold">Invoicer number:</span> {invoiceNumber}
          </li>
          <li className="p-1 bg-gray-100">
            <span className="font-bold">Invoice date:</span> {invoiceDate}
          </li>
          <li className="p-1 ">
            <span className="font-bold">Supply date:</span> {supplyDate}
          </li>
        </ul>
      </article>
    </>
  );
}
