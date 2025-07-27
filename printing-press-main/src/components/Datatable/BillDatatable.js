import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Button } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

export default function BillDatatable(props) {
    console.log(props);
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);



    // useEffect(() => {
    //     // Fetch data from API when the component mounts
    //     const fetchData = async () => {
    //         try {
    //             const response = await axios.get("http://localhost:5000/api/parties-list");
    //             console.log(response)
    //             setData(response.data.data);
    //             setLoading(false);
    //         } catch (error) {
    //             console.error("Error fetching data:", error);
    //             setLoading(false);
    //         }
    //     };

    //     fetchData();
    // }, []);

    return (
        <div>
            <h1>Bills Table</h1>

            {/* Add Button Above the Table */}
            <Button
                variant="contained"
                color="primary"
                onClick={()=> navigate("/TaxInvoiceBill")} // Button to Refresh the Data
                style={{ marginBottom: "20px" }}
            >
                Add Bill
            </Button>

            {loading ? (
                <CircularProgress />
            ) : (
                <TableContainer component={Paper}>

                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Party Id</TableCell>
                                <TableCell>Party Name</TableCell>
                                <TableCell>GST No</TableCell>
                                <TableCell>Contact</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {props.data.map((user) => (
                                <TableRow key={user.party_id}>
                                    <TableCell>{user.party_id}</TableCell>
                                    <TableCell>{user.party_name}</TableCell>
                                    <TableCell>{user.gst}</TableCell>
                                    <TableCell>{user.contact}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </div>
    );

}