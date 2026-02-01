import React, { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopOpen, setDesktopOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleDesktopDrawerToggle = () => {
    setDesktopOpen(!desktopOpen);
  };

  // Auto navigate from "/" to "/dashboard"
  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/dashboard", { replace: true });
    }
  }, [location.pathname, navigate]);

  return (
    <Box sx={{ display: "flex" }}>
      <Box
        sx={{
          display: { xs: "none", sm: "block" },
          bgcolor: "primary.lighter",
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "64px",
          zIndex: (theme) => theme.zIndex.appBar - 1,
        }}
      />
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
          p: { xs: 2, sm: 3 },
          width: {
            xs: "100%",
            sm: desktopOpen ? `calc(100% - 240px)` : "100%",
          },
          ml: { sm: desktopOpen ? "240px" : 0 },
          mt: 6,
          transition: "all 0.3s ease-in-out",
          height: "calc(100vh - 50px)",
          overflow: "auto",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
