import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Datatable from '../components/Datatable/Datatable';
import BillDatatable from '../components/Datatable/BillDatatable';
import BillsListDatatable from '../components/Datatable/BillsListDatatable';
import { useParams } from 'react-router-dom';

function BillsList() {

  const { party_id } = useParams();

  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    axios.get(`http://localhost:5000/api/invoices/${party_id}`)
      .then((res) => {
        setBills(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching bills", err);
        setLoading(false);
      });
  }, [party_id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <BillsListDatatable data={bills} />
    </>
  );
}

export default BillsList;
