import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';

const drawerWidth = 240;

const Header = ({ mobileOpen, handleDrawerToggle, desktopOpen, handleDesktopDrawerToggle }) => {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: {
          xs: '100%',
          sm: desktopOpen ? `calc(100% - ${drawerWidth}px)` : '100%'
        },
        ml: { sm: desktopOpen ? `${drawerWidth}px` : 0 },
        transition: 'all 0.3s ease-in-out',
        backgroundColor: 'primary.lighter',
      }}
    >
      <Toolbar>
        <IconButton
          color="primary.darker"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <IconButton
          color="primary.darker"
          aria-label="toggle sidebar"
          edge="start"
          onClick={handleDesktopDrawerToggle}
          sx={{ mr: 2, display: { xs: 'none', sm: 'block' }, mt:0.5 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div" color='primary.darker'>
          Transaction Risk Scoring System
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
