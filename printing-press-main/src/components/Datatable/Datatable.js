import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Button } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

export default function Datatable(props) {
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
            <h1>Party Table</h1>

            <Button
                variant="contained"
                color="primary"
                onClick={() => navigate("/ClientForm")}
                style={{ marginBottom: "20px" }}
            >
                Add Party
            </Button>

            {loading ? (
                <CircularProgress />
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Party ID</TableCell>
                                <TableCell>Party Name</TableCell>
                                <TableCell>GST No</TableCell>
                                <TableCell>Contact</TableCell>
                                <TableCell align="center">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {props.data.map((party) => (
                                <TableRow key={party.party_id}>
                                    <TableCell>{party.party_id}</TableCell>
                                    <TableCell>{party.party_name}</TableCell>
                                    <TableCell>{party.gst}</TableCell>
                                    <TableCell>{party.contact}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            size="small"
                                            onClick={() => navigate(`/TaxInvoiceBill/${party.party_id}`)}
                                            style={{ marginRight: "10px" }}
                                        >
                                            Add Bill
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            onClick={() => navigate(`/ViewBills/${party.party_id}`)}
                                            style={{ marginRight: "10px" }}
                                        >
                                            View Bills
                                        </Button>
                                        <Button
                                            variant="contained"
                                            size="small"
                                            onClick={() => navigate(`/ClientForm/${party.party_id}`)}
                                            style={{ marginRight: "10px" }}
                                        >
                                            Edit    
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </div>
    );

}