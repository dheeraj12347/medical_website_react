import { Alert, Paper, Snackbar, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PatientForm from '../components/PatientForm.jsx';
import { createPatient } from '../services/patientService.js';

// AddPatientPage demonstrates a POST request through the reusable API layer.
function AddPatientPage() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleCreatePatient = async (patientData) => {
    try {
      setErrorMessage('');
      await createPatient(patientData);
      setSnackbarOpen(true);

      // Give the success snackbar a short moment before returning to the table.
      window.setTimeout(() => {
        navigate('/patients');
      }, 700);
    } catch {
      setErrorMessage('Could not create patient. Is JSON Server running?');
    }
  };

  return (
    <Stack spacing={3}>
      <Stack spacing={0.5}>
        <Typography variant="h4">Add Patient</Typography>
        <Typography color="text.secondary">
          Create a new patient record with React Hook Form validation.
        </Typography>
      </Stack>

      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

      <Paper sx={{ p: { xs: 2, md: 3 } }}>
        <PatientForm submitLabel="Add Patient" onSubmit={handleCreatePatient} />
      </Paper>

      <Snackbar
        autoHideDuration={3000}
        message="Patient added successfully"
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
      />
    </Stack>
  );
}

export default AddPatientPage;
