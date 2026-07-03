import {
  Button,
  Grid,
  MenuItem,
  Stack,
  TextField,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { GENDER_OPTIONS, PATIENT_STATUS_OPTIONS } from '../utils/constants.js';

const defaultValues = {
  name: '',
  age: '',
  gender: '',
  disease: '',
  doctor: '',
  status: 'Stable',
};

// React Hook Form manages form state and validation with very little re-rendering.
function PatientForm({ initialValues, onSubmit, submitLabel = 'Save Patient' }) {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: initialValues || defaultValues,
  });

  const submitForm = (formData) => {
    onSubmit({
      ...formData,
      age: Number(formData.age),
    });
  };

  return (
    <Stack component="form" spacing={3} onSubmit={handleSubmit(submitForm)}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Controller
            name="name"
            control={control}
            rules={{ required: 'Patient name is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Patient Name"
                error={Boolean(errors.name)}
                helperText={errors.name?.message}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Controller
            name="age"
            control={control}
            rules={{
              required: 'Age is required',
              min: { value: 1, message: 'Age must be at least 1' },
              max: { value: 120, message: 'Age must be realistic' },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                type="number"
                label="Age"
                error={Boolean(errors.age)}
                helperText={errors.age?.message}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Controller
            name="gender"
            control={control}
            rules={{ required: 'Gender is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                select
                label="Gender"
                error={Boolean(errors.gender)}
                helperText={errors.gender?.message}
              >
                {GENDER_OPTIONS.map((gender) => (
                  <MenuItem key={gender} value={gender}>
                    {gender}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Controller
            name="disease"
            control={control}
            rules={{ required: 'Disease is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Disease"
                error={Boolean(errors.disease)}
                helperText={errors.disease?.message}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Controller
            name="doctor"
            control={control}
            rules={{ required: 'Doctor name is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Assigned Doctor"
                error={Boolean(errors.doctor)}
                helperText={errors.doctor?.message}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Controller
            name="status"
            control={control}
            rules={{ required: 'Status is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                select
                label="Status"
                error={Boolean(errors.status)}
                helperText={errors.status?.message}
              >
                {PATIENT_STATUS_OPTIONS.map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>
      </Grid>

      <Button disabled={isSubmitting} type="submit" variant="contained">
        {submitLabel}
      </Button>
    </Stack>
  );
}

export default PatientForm;
