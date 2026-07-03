import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import { NavLink } from 'react-router-dom';
import logo from '../assets/hospital-logo.svg';
import { DRAWER_WIDTH } from '../utils/constants.js';

const navigationItems = [
  { label: 'Dashboard', path: '/', icon: <DashboardIcon /> },
  { label: 'Patients', path: '/patients', icon: <PeopleIcon /> },
  { label: 'Add Patient', path: '/patients/add', icon: <AddCircleOutlinedIcon /> },
];

function SidebarContent({ onNavigate }) {
  return (
    <Box sx={{ height: '100%' }}>
      <Toolbar>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Box component="img" src={logo} alt="Hospital logo" sx={{ height: 40, width: 40 }} />
          <Box>
            <Typography variant="h6">MediCare</Typography>
            <Typography color="text.secondary" variant="caption">
              Admin Portal
            </Typography>
          </Box>
        </Stack>
      </Toolbar>

      <List sx={{ px: 1 }}>
        {navigationItems.map((item) => (
          <ListItemButton
            key={item.path}
            component={NavLink}
            to={item.path}
            onClick={onNavigate}
            sx={{
              borderRadius: 2,
              mb: 0.5,
              '&.active': {
                bgcolor: 'primary.main',
                color: 'white',
                '& .MuiListItemIcon-root': {
                  color: 'white',
                },
              },
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}

// Sidebar uses a temporary Drawer on phones and a permanent Drawer on desktops.
function Sidebar({ mobileOpen, onClose }) {
  return (
    <Box component="nav" sx={{ width: { md: DRAWER_WIDTH }, flexShrink: { md: 0 } }}>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH },
        }}
      >
        <SidebarContent onNavigate={onClose} />
      </Drawer>

      <Drawer
        variant="permanent"
        open
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': {
            borderRight: '1px solid',
            borderColor: 'divider',
            boxSizing: 'border-box',
            width: DRAWER_WIDTH,
          },
        }}
      >
        <SidebarContent />
      </Drawer>
    </Box>
  );
}

export default Sidebar;
