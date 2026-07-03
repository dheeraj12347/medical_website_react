import BedIcon from '@mui/icons-material/Bed';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import PeopleIcon from '@mui/icons-material/People';
import { Alert, Grid, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import DashboardCard from '../components/DashboardCard.jsx';
import Loader from '../components/Loader.jsx';
import { getDashboardSummary } from '../services/dashboardService.js';

// DashboardPage demonstrates API loading with useEffect and conditional rendering.
function DashboardPage() {
  const [summary, setSummary] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    async function loadDashboard() {
      try {
        setIsLoading(true);
        const dashboardSummary = await getDashboardSummary();
        setSummary(dashboardSummary);
      } catch {
        setErrorMessage('Could not load dashboard data. Is JSON Server running?');
      } finally {
        setIsLoading(false);
      }
    }

    loadDashboard();
  }, []);

  if (isLoading) {
    return <Loader message="Loading dashboard summary..." />;
  }

  if (errorMessage) {
    return <Alert severity="error">{errorMessage}</Alert>;
  }

  return (
    <Stack spacing={3}>
      <BoxTitle title="Dashboard" subtitle="Hospital operations at a glance" />
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} lg={3}>
          <DashboardCard
            color="primary.main"
            icon={<PeopleIcon />}
            title="Total Patients"
            value={summary.totalPatients}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <DashboardCard
            color="secondary.main"
            icon={<MedicalServicesIcon />}
            title="Doctors"
            value={summary.doctors}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <DashboardCard
            color="warning.main"
            icon={<EventAvailableIcon />}
            title="Appointments"
            value={summary.appointments}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <DashboardCard
            color="success.main"
            icon={<BedIcon />}
            title="Available Beds"
            value={summary.availableBeds}
          />
        </Grid>
      </Grid>
    </Stack>
  );
}

function BoxTitle({ title, subtitle }) {
  return (
    <Stack spacing={0.5}>
      <Typography variant="h4">{title}</Typography>
      <Typography color="text.secondary">{subtitle}</Typography>
    </Stack>
  );
}

export default DashboardPage;
