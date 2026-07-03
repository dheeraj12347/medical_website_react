import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  Stack,
  Typography,
} from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import Loader from '../components/Loader.jsx';
import PaginationComponent from '../components/PaginationComponent.jsx';
import PatientForm from '../components/PatientForm.jsx';
import PatientTable from '../components/PatientTable.jsx';
import SearchBar from '../components/SearchBar.jsx';
import {
  deletePatient,
  getPatients,
  updatePatient,
} from '../services/patientService.js';

const rowsPerPage = 5;

// PatientsPage owns the data state and passes smaller responsibilities to child components.
function PatientsPage() {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ field: 'id', direction: 'asc' });
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [patientToDelete, setPatientToDelete] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    loadPatients();
  }, []);

  async function loadPatients() {
    try {
      setIsLoading(true);
      const response = await getPatients();
      setPatients(response.data);
    } catch {
      setErrorMessage('Could not load patients. Start JSON Server and try again.');
    } finally {
      setIsLoading(false);
    }
  }

  const filteredPatients = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    if (!normalizedSearch) {
      return patients;
    }

    return patients.filter((patient) =>
      [patient.name, patient.disease, patient.doctor, patient.status, patient.gender]
        .join(' ')
        .toLowerCase()
        .includes(normalizedSearch),
    );
  }, [patients, searchTerm]);

  const sortedPatients = useMemo(() => {
    return [...filteredPatients].sort((firstPatient, secondPatient) => {
      const firstValue = firstPatient[sortConfig.field];
      const secondValue = secondPatient[sortConfig.field];

      if (Number.isFinite(Number(firstValue)) && Number.isFinite(Number(secondValue))) {
        return sortConfig.direction === 'asc'
          ? Number(firstValue) - Number(secondValue)
          : Number(secondValue) - Number(firstValue);
      }

      return sortConfig.direction === 'asc'
        ? String(firstValue).localeCompare(String(secondValue))
        : String(secondValue).localeCompare(String(firstValue));
    });
  }, [filteredPatients, sortConfig]);

  const totalPages = Math.max(1, Math.ceil(sortedPatients.length / rowsPerPage));
  const visiblePatients = sortedPatients.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const handleSearchChange = (nextSearchTerm) => {
    setSearchTerm(nextSearchTerm);
    setPage(1);
  };

  const handleSort = (field) => {
    setSortConfig((currentSort) => ({
      field,
      direction:
        currentSort.field === field && currentSort.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const handleUpdatePatient = async (updatedPatientData) => {
    try {
      const response = await updatePatient(selectedPatient.id, {
        ...selectedPatient,
        ...updatedPatientData,
      });
      setPatients((currentPatients) =>
        currentPatients.map((patient) =>
          patient.id === selectedPatient.id ? response.data : patient,
        ),
      );
      setSelectedPatient(null);
      setSnackbarMessage('Patient updated successfully');
    } catch {
      setSnackbarMessage('Could not update patient');
    }
  };

  const handleDeletePatient = async () => {
    try {
      await deletePatient(patientToDelete.id);
      setPatients((currentPatients) =>
        currentPatients.filter((patient) => patient.id !== patientToDelete.id),
      );
      setPatientToDelete(null);
      setSnackbarMessage('Patient deleted successfully');
    } catch {
      setSnackbarMessage('Could not delete patient');
    }
  };

  if (isLoading) {
    return <Loader message="Loading patients..." />;
  }

  return (
    <Stack spacing={3}>
      <Stack spacing={0.5}>
        <Typography variant="h4">Patient Management</Typography>
        <Typography color="text.secondary">
          Search, sort, edit, and delete patient records.
        </Typography>
      </Stack>

      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

      <SearchBar value={searchTerm} onChange={handleSearchChange} />

      <PatientTable
        patients={visiblePatients}
        sortConfig={sortConfig}
        onSort={handleSort}
        onEdit={setSelectedPatient}
        onDelete={setPatientToDelete}
      />

      <PaginationComponent
        count={totalPages}
        page={Math.min(page, totalPages)}
        rowsPerPage={rowsPerPage}
        totalItems={sortedPatients.length}
        onChange={setPage}
      />

      <Dialog fullWidth maxWidth="md" open={Boolean(selectedPatient)} onClose={() => setSelectedPatient(null)}>
        <DialogTitle>Edit Patient</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          {selectedPatient && (
            <PatientForm
              initialValues={selectedPatient}
              submitLabel="Update Patient"
              onSubmit={handleUpdatePatient}
            />
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={Boolean(patientToDelete)} onClose={() => setPatientToDelete(null)}>
        <DialogTitle>Delete Patient</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete {patientToDelete?.name}? This action cannot be
            undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPatientToDelete(null)}>Cancel</Button>
          <Button color="error" variant="contained" onClick={handleDeletePatient}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        autoHideDuration={3000}
        message={snackbarMessage}
        open={Boolean(snackbarMessage)}
        onClose={() => setSnackbarMessage('')}
      />
    </Stack>
  );
}

export default PatientsPage;
