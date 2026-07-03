import { createBrowserRouter } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute.jsx';
import AddPatientPage from '../pages/AddPatientPage.jsx';
import AppLayout from '../pages/AppLayout.jsx';
import DashboardPage from '../pages/DashboardPage.jsx';
import LoginPage from '../pages/LoginPage.jsx';
import NotFoundPage from '../pages/NotFoundPage.jsx';
import PatientsPage from '../pages/PatientsPage.jsx';

// Routes describe which component should render for each URL.
export const appRouter = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          { path: '/', element: <DashboardPage /> },
          { path: '/patients', element: <PatientsPage /> },
          { path: '/patients/add', element: <AddPatientPage /> },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
