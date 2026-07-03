import { Button, Paper, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

// A simple fallback route helps users recover from unknown URLs.
function NotFoundPage() {
  return (
    <Paper sx={{ p: 4, textAlign: 'center' }}>
      <Stack spacing={2} alignItems="center">
        <Typography variant="h4">Page not found</Typography>
        <Typography color="text.secondary">
          The page you requested does not exist in this dashboard.
        </Typography>
        <Button component={RouterLink} to="/" variant="contained">
          Go to Dashboard
        </Button>
      </Stack>
    </Paper>
  );
}

export default NotFoundPage;
