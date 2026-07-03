import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import {
  Alert,
  Box,
  Button,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

// LoginPage demonstrates forms, validation, events, and localStorage auth.
function LoginPage() {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from?.pathname || '/';

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: 'admin@hospital.com',
      password: 'password123',
    },
  });

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const submitLogin = (credentials) => {
    login(credentials);
    navigate(redirectTo, { replace: true });
  };

  return (
    <Box
      sx={{
        alignItems: 'center',
        bgcolor: 'background.default',
        display: 'flex',
        minHeight: '100vh',
        py: 4,
      }}
    >
      <Container maxWidth="sm">
        <Paper sx={{ p: { xs: 3, sm: 5 } }}>
          <Stack spacing={3}>
            <Stack spacing={1} alignItems="center" textAlign="center">
              <LocalHospitalIcon color="primary" sx={{ fontSize: 48 }} />
              <Typography variant="h4">Hospital Login</Typography>
              <Typography color="text.secondary">
                Use the prefilled demo credentials to enter the dashboard.
              </Typography>
            </Stack>

            <Alert severity="info">
              Demo app: any valid email and password with 6+ characters will log in.
            </Alert>

            <Stack component="form" spacing={2.5} onSubmit={handleSubmit(submitLogin)}>
              <Controller
                name="email"
                control={control}
                rules={{
                  required: 'Email is required',
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: 'Enter a valid email address',
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Email"
                    error={Boolean(errors.email)}
                    helperText={errors.email?.message}
                  />
                )}
              />

              <Controller
                name="password"
                control={control}
                rules={{
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters',
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    type="password"
                    label="Password"
                    error={Boolean(errors.password)}
                    helperText={errors.password?.message}
                  />
                )}
              />

              <Button size="large" type="submit" variant="contained">
                Login
              </Button>
            </Stack>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}

export default LoginPage;
