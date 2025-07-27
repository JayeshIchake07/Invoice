import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Datatable from '../components/Datatable/Datatable';
import BillDatatable from '../components/Datatable/BillDatatable';

function Bills() {
  
  const [parties, setParties] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const source = axios.CancelToken.source(); // Create a cancel token for the request

    const fetchParties = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/parties-list', {
          cancelToken: source.token, // Attach the cancel token to the request
        });
        console.log(response.data.data);
        setParties(response.data.data);
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log('Request canceled', err.message);
        } else {
          setError('Error fetching parties list');
        }
      } finally {
        setLoading(false); // Always set loading to false when request completes
      }
    };

    fetchParties();

    // Cleanup function to cancel the request if the component unmounts
    return () => {
      source.cancel('Component unmounted: request canceled.');
    };
  }, []); // Empty dependency array to run once on mount

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <BillDatatable data={parties} />
    </>
  );
}

export default Bills;
