import logo from './logo.svg';
import './App.css';
import NavBar from './pages/Layout';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home';
import ID from './pages/ID';
import Client from './pages/Client';
import Datatable from './components/Datatable/Datatable';
import ClientForm from './components/Forms/ClientForm';
import TaxInvoiceBill from './components/Forms/TaxInvoiceBill';
import InvoiceForm from './components/Forms/SampleInvoice';
import State from "./context/stateContext";
import StateContext from './context/stateContext';
import TaxInvoiceSummary from './components/TaxInvoiceSummary';
import Bills from './pages/Bills';
import BillsList from './pages/BillsList';
import EditBill from './components/Forms/EditBill';
import Dashboard from './pages/DashboardPage';
import DashboardPage from './pages/DashboardPage';
import AppNavbar from './components/AppNavbar';


function App() {

  // const location = useLocation();
  // const isHome = location.pathname === '/';


  return (
    <StateContext>
      <BrowserRouter>
        <NavBar />

        <div className="pages">
          {/* {isHome ? <HomepageNavbar />: */}
           <AppNavbar />
          {/* } */}

          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path='/ID' element={<ID />} />
            <Route path='/Client' element={<Client />} />
            <Route path='/Bills/:party_id' element={<Bills />} />
            <Route path="/ViewBills/:party_id" element={<BillsList />} />

            {/* Trial and RUn Bills */}
            {/* <Route path='/Client' element={<InvoiceForm />} /> */}

            <Route path='/ClientForm' element={<ClientForm />} />
            <Route path='/ClientForm/:id' element={<ClientForm />} />

            <Route path='/TaxInvoiceBill/:party_id' element={<TaxInvoiceBill />} />
            <Route path='/EditBill/:bill_id' element={<EditBill />} />

            <Route path='/TaxInvoiceBill' element={<TaxInvoiceBill />} />

            <Route path='/TaxInvoiceSummary' element={<TaxInvoiceSummary />} />

            <Route path='/Dashboard' element={<DashboardPage />} />

            {/* This is working bill */}
            {/* <Route path='/TaxInvoiceBill' element={<TaxInvoiceBill/>}/> */}



            {/* <Route path='/Client' element={<Datatable/>}/> */}

            {/* <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} /> */}
          </Routes>
        </div>
      </BrowserRouter>
    </StateContext>
  );
}

export default App;
