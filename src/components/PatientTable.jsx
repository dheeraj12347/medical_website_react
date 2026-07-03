import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  Box,
  Chip,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
  Typography,
} from '@mui/material';

const columns = [
  { id: 'id', label: 'ID' },
  { id: 'name', label: 'Name' },
  { id: 'age', label: 'Age' },
  { id: 'gender', label: 'Gender' },
  { id: 'disease', label: 'Disease' },
  { id: 'doctor', label: 'Doctor' },
  { id: 'status', label: 'Status' },
];

const statusColors = {
  Admitted: 'primary',
  Stable: 'success',
  'Under Observation': 'warning',
  Critical: 'error',
  Discharged: 'default',
};

// PatientTable is presentational: it receives data and event handlers as props.
function PatientTable({ patients, sortConfig, onSort, onEdit, onDelete }) {
  if (patients.length === 0) {
    return (
      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h6">No patients found</Typography>
        <Typography color="text.secondary">
          Try changing your search or add a new patient record.
        </Typography>
      </Paper>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.id}>
                <TableSortLabel
                  active={sortConfig.field === column.id}
                  direction={sortConfig.direction}
                  onClick={() => onSort(column.id)}
                >
                  {column.label}
                </TableSortLabel>
              </TableCell>
            ))}
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {patients.map((patient) => (
            <TableRow hover key={patient.id}>
              <TableCell>{patient.id}</TableCell>
              <TableCell>
                <Typography fontWeight={700}>{patient.name}</Typography>
              </TableCell>
              <TableCell>{patient.age}</TableCell>
              <TableCell>{patient.gender}</TableCell>
              <TableCell>{patient.disease}</TableCell>
              <TableCell>{patient.doctor}</TableCell>
              <TableCell>
                <Chip
                  color={statusColors[patient.status] || 'default'}
                  label={patient.status}
                  size="small"
                />
              </TableCell>
              <TableCell align="right">
                <Box sx={{ display: 'inline-flex', gap: 0.5 }}>
                  <Tooltip title="Edit patient">
                    <IconButton aria-label={`Edit ${patient.name}`} onClick={() => onEdit(patient)}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete patient">
                    <IconButton
                      aria-label={`Delete ${patient.name}`}
                      color="error"
                      onClick={() => onDelete(patient)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default PatientTable;
