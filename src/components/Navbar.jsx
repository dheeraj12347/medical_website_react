import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Box, IconButton, Toolbar, Tooltip, Typography } from '@mui/material';
import { useAuth } from '../context/AuthContext.jsx';
import { DRAWER_WIDTH } from '../utils/constants.js';

// Navbar is the top application bar shown after login.
function Navbar({ onMenuClick }) {
  const { logout } = useAuth();

  return (
    <AppBar
      position="fixed"
      sx={{
        bgcolor: 'background.paper',
        borderBottom: '1px solid',
        borderColor: 'divider',
        boxShadow: 'none',
        color: 'text.primary',
        width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
        ml: { md: `${DRAWER_WIDTH}px` },
      }}
    >
      <Toolbar>
        <IconButton
          aria-label="Open navigation"
          edge="start"
          onClick={onMenuClick}
          sx={{ display: { md: 'none' }, mr: 1 }}
        >
          <MenuIcon />
        </IconButton>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6">Hospital Management Dashboard</Typography>
          <Typography color="text.secondary" variant="body2">
            Learn React with a real admin workflow
          </Typography>
        </Box>
        <Tooltip title="Logout">
          <IconButton aria-label="Logout" color="primary" onClick={logout}>
            <LogoutIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
