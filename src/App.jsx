import { RouterProvider } from 'react-router-dom';
import { appRouter } from './routes/AppRoutes.jsx';

// App stays small because routing is separated into src/routes.
function App() {
  return <RouterProvider router={appRouter} />;
}

export default App;
