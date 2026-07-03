import { api } from './api.js';

// This file is a reusable API layer for patient CRUD operations.
export const getPatients = () => api.get('/patients');

export const createPatient = (patientData) => api.post('/patients', patientData);

export const updatePatient = (patientId, patientData) =>
  api.put(`/patients/${patientId}`, patientData);

export const deletePatient = (patientId) => api.delete(`/patients/${patientId}`);
