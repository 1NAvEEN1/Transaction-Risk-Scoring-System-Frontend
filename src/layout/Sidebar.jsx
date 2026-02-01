import React from "react";
import PropTypes from "prop-types";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Drawer,
  Toolbar,
  List,
  Typography,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  useTheme,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  Add as AddIcon,
  Rule as RuleIcon,
  Menu as MenuIcon,
  Close as CloseIcon,
} from "@mui/icons-material";

const drawerWidth = 240;

const menuItems = [
  { text: "Transactions", icon: <DashboardIcon />, path: "/dashboard" },
  { text: "Submit Transaction", icon: <AddIcon />, path: "/submit" },
  { text: "Risk Rules", icon: <RuleIcon />, path: "/rules" },
];

const Sidebar = ({
  mobileOpen,
  handleDrawerToggle,
  desktopOpen,
  handleDesktopDrawerToggle,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const handleMenuClick = (path) => {
    navigate(path);
    // Close drawer on mobile after navigation
    if (mobileOpen) {
      handleDrawerToggle();
    }
  };

  const drawer = (
    <>
      <Toolbar
        sx={{
          backgroundColor: "primary.lighter",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6" fontWeight={700} color="primary.darker">
          TRSS
        </Typography>
        <IconButton
          onClick={handleDesktopDrawerToggle}
          sx={{ display: { xs: "none", sm: "block" }, mt: 0.5, mr: -2 }}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <List
        sx={{
          borderRight: "1px solid",
          borderColor: theme.palette.grey[400],
          flexGrow: 1,
        }}
      >
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => handleMenuClick(item.path)}
              sx={{
                "&.Mui-selected": {
                  bgcolor: theme.palette.grey[500],
                  color: theme.palette.primary.contrastText,
                  "&:hover": {
                    bgcolor: theme.palette.grey[500],
                  },
                  "& .MuiListItemIcon-root": {
                    color: theme.palette.primary.contrastText,
                  },
                },
                "&:hover": {
                  bgcolor: theme.palette.action.hover,
                },
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  );

  return (
    <>
      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        {drawer}
      </Drawer>

      {/* Desktop drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            border: "none",
            width: drawerWidth,
            transition: "transform 0.3s ease-in-out",
            transform: desktopOpen
              ? "translateX(0)"
              : `translateX(-${drawerWidth}px)`,
            bgcolor: theme.palette.grey[300],
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

Sidebar.propTypes = {
  mobileOpen: PropTypes.bool.isRequired,
  handleDrawerToggle: PropTypes.func.isRequired,
  desktopOpen: PropTypes.bool.isRequired,
  handleDesktopDrawerToggle: PropTypes.func.isRequired,
};

export default Sidebar;
