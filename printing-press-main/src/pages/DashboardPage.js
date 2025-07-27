import React, { useState } from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
  CircularProgress
} from '@mui/material';

const DashboardPage = () => {
  const [stats] = useState({
    totalClients: 12,
    totalBills: 45,
    totalRevenue: 98000,
    pendingBills: 3
  });

  return (
    <Box className="dashboard-page-bg">
      <Box className="dashboard-overlay">
        <Box className="dashboard-wrapper">
          <Typography variant="h3" color="white" gutterBottom>
            Dashboard
          </Typography>

          <Grid container spacing={3}>
            {/* Stats Cards */}
            {[
              { label: 'Total Clients', value: stats.totalClients },
              { label: 'Total Bills', value: stats.totalBills },
              { label: 'Revenue', value: `₹${stats.totalRevenue}` },
              { label: 'Pending Bills', value: stats.pendingBills }
            ].map((stat, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Paper className="dashboard-card">
                  <Typography variant="subtitle1">{stat.label}</Typography>
                  <Typography variant="h5" fontWeight="bold">
                    {stat.value}
                  </Typography>
                </Paper>
              </Grid>
            ))}

            {/* Placeholder for Recent Bills */}
            <Grid item xs={12}>
              <Paper className="dashboard-section">
                <Typography variant="h6" gutterBottom>Recent Bills</Typography>
                {/* <RecentBillsTable /> */}
              </Paper>
            </Grid>

            {/* Placeholder for Revenue Chart */}
            <Grid item xs={12}>
              <Paper className="dashboard-section">
                <Typography variant="h6" gutterBottom>Revenue Chart</Typography>
                {/* <RevenueChart /> */}
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardPage;
