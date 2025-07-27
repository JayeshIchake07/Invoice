import React, { useEffect, useState } from 'react';
import { Form } from 'react-final-form';
import axios from 'axios';
import {
  TextField,
} from 'mui-rff';
import {
  Typography,
  Paper,
  Grid,
  Button,
  CssBaseline,
  CircularProgress,
} from '@material-ui/core';
import { useNavigate, useParams } from "react-router-dom";

function ClientForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);
  const [initialValues, setInitialValues] = useState(null);

  // Fetch data if edit mode
  useEffect(() => {
    if (isEdit) {
      axios.get(`http://localhost:5000/api/get-party/${id}`)
        .then((response) => {
          const party = response.data.data; // this is based on your route's output
          setInitialValues({
            partyName: party.party_name,
            gst_no: party.gst,
            contact_no: party.contact,
          });
        }).catch(err => {
          console.error("Failed to fetch party data", err);
        });
    }
  }, [id, isEdit]);

  const onSubmit = async (values) => {
    if (isEdit) {
      await axios.put(`http://localhost:5000/api/parties/${id}`, values);
    } else {
      await axios.post('http://localhost:5000/api/parties', values);
    }
    navigate('/Client');
  };

  const validate = (values) => {
    const errors = {};
    if (!values.partyName) errors.partyName = 'Required';
    if (!values.gst_no) errors.gst_no = 'Required';
    if (!values.contact_no) errors.contact_no = 'Required';
    return errors;
  };

  const formFields = [
    {
      size: 12,
      field: (
        <TextField
          label="Party Name"
          name="partyName"
          margin="none"
          required={true}
        />
      ),
    },
    {
      size: 12,
      field: (
        <TextField
          label="GSTIN"
          name="gst_no"
          margin="none"
          required={true}
        />
      ),
    },
    {
      size: 12,
      field: (
        <TextField
          type="number"
          label="Contact Number"
          name="contact_no"
          margin="none"
          required={true}
        />
      ),
    },
  ];

  // Wait until values are fetched for edit
  if (isEdit && !initialValues) return <CircularProgress />;

  return (
    <div style={{ padding: 16, margin: 'auto', maxWidth: 600 }}>
      <CssBaseline />
      <Typography variant="h4" align="center" component="h1" gutterBottom>
        {isEdit ? "Edit Party" : "Add Party"}
      </Typography>

      <Form
        key={isEdit ? id : 'new'} // Force rerender on edit/create toggle
        onSubmit={onSubmit}
        initialValues={initialValues}
        validate={validate}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit} noValidate>
            <Paper style={{ padding: 16 }}>
              <Grid container alignItems="flex-start" spacing={2}>
                {formFields.map((item, idx) => (
                  <Grid item xs={item.size} key={idx}>
                    {item.field}
                  </Grid>
                ))}
                <Grid item style={{ marginTop: 16 }}>
                  <Button
                    type="button"
                    variant="contained"
                    onClick={form.reset}
                    disabled={submitting || pristine}
                  >
                    Reset
                  </Button>
                </Grid>
                <Grid item style={{ marginTop: 16 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={submitting}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Paper>
            <pre>{JSON.stringify(values, 0, 2)}</pre>
          </form>
        )}
      />
    </div>
  );
}

export default ClientForm;
