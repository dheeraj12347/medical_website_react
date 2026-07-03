import { api } from './api.js';

// The dashboard needs several resources, so Promise.all loads them in parallel.
export const getDashboardSummary = async () => {
  const [patientsResponse, doctorsResponse, appointmentsResponse, bedsResponse] =
    await Promise.all([
      api.get('/patients'),
      api.get('/doctors'),
      api.get('/appointments'),
      api.get('/beds'),
    ]);

  const availableBeds = bedsResponse.data.reduce(
    (total, bedGroup) => total + Number(bedGroup.available),
    0,
  );

  return {
    totalPatients: patientsResponse.data.length,
    doctors: doctorsResponse.data.length,
    appointments: appointmentsResponse.data.length,
    availableBeds,
  };
};
