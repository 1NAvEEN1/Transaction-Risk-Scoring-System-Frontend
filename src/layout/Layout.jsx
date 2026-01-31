import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopOpen, setDesktopOpen] = useState(true);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleDesktopDrawerToggle = () => {
    setDesktopOpen(!desktopOpen);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Header
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
        desktopOpen={desktopOpen}
        handleDesktopDrawerToggle={handleDesktopDrawerToggle}
      />
      <Sidebar
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
        desktopOpen={desktopOpen}
        handleDesktopDrawerToggle={handleDesktopDrawerToggle}
      />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: {
            xs: '100%',
            sm: desktopOpen ? `calc(100% - 240px)` : '100%'
          },
          ml: { sm: desktopOpen ? '240px' : 0 },
          mt: 8,
          transition: 'all 0.3s ease-in-out',
          height: 'calc(100vh - 64px)',
            overflow: 'auto',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
