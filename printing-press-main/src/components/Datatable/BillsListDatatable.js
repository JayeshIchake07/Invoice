import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Button } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { Typography } from "antd";

export default function BillsListDatatable(props) {
    console.log(props);
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    return (
        <div style={{ padding: "20px" }}>
            <Typography variant="h4" gutterBottom>
                Bills Details
            </Typography>

            {props.data.length === 0 ? (
                <Typography>No bills found for this party.</Typography>
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Bill ID</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Total Amount</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {props.data.map((bill) => (
                                <TableRow key={bill.bill_id}>
                                    <TableCell>{bill.bill_id}</TableCell>
                                    <TableCell>{new Date(bill.invoice_date).toLocaleDateString()}</TableCell>
                                    <TableCell>₹{bill.totalAmount}</TableCell>
                                    <TableCell>{bill.status || "Pending"}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            color="primary"
                                            onClick={() =>
                                                navigate('/taxInvoiceSummary', {
                                                    state: {
                                                        fullInvoiceData: {
                                                            partyName: bill.party_name,
                                                            gst_no: bill.gst,
                                                            invoice_no: bill.invoice_no,
                                                            invoice_date: bill.invoice_date,
                                                            supply_date: bill.supply_date,
                                                            totalAmount: bill.total_amount,
                                                            grandTotal: bill.grand_total,
                                                            rupeesInWords: bill.rupees_in_words,
                                                            items: bill.items || [] // or fetch separately if not included
                                                        }
                                                    }
                                                })
                                            }
                                        >
                                            View PDF
                                        </Button>

                                        <Button
                                            variant="outlined"
                                            onClick={() => navigate(`/EditBill/${bill.bill_id}`)}
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