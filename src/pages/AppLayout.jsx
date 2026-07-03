import { Box, Container, Toolbar } from '@mui/material';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import Sidebar from '../components/Sidebar.jsx';

// AppLayout wraps every protected page with the shared navbar and sidebar.
function AppLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <Box sx={{ display: 'flex' }}>
      <Navbar onMenuClick={() => setMobileOpen(true)} />
      <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      <Box component="main" sx={{ flexGrow: 1, minHeight: '100vh', width: '100%' }}>
        <Toolbar />
        <Container maxWidth="xl" sx={{ py: 4 }}>
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
}

export default AppLayout;
