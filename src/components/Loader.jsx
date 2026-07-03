import { Box, CircularProgress, Typography } from '@mui/material';

// Loader is reused anywhere data is being fetched.
function Loader({ message = 'Loading data...' }) {
  return (
    <Box
      sx={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        justifyContent: 'center',
        minHeight: 240,
      }}
    >
      <CircularProgress />
      <Typography color="text.secondary">{message}</Typography>
    </Box>
  );
}

export default Loader;
