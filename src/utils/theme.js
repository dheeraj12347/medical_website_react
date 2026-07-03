import { createTheme } from '@mui/material/styles';

// A central theme gives the dashboard a consistent production look.
export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2563eb',
    },
    secondary: {
      main: '#0f766e',
    },
    background: {
      default: '#f5f7fb',
      paper: '#ffffff',
    },
    success: {
      main: '#15803d',
    },
    warning: {
      main: '#d97706',
    },
    error: {
      main: '#dc2626',
    },
  },
  typography: {
    fontFamily: ['Inter', 'Roboto', 'Arial', 'sans-serif'].join(','),
    h4: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 700,
    },
    h6: {
      fontWeight: 700,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 700,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 10px 30px rgba(15, 23, 42, 0.08)',
        },
      },
    },
  },
});
