import React, { useState } from "react";
import {
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemButton,
  ListItemText,
  Toolbar,
  Box,
  IconButton,
  Switch,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import HomeIcon from "@mui/icons-material/Home";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import StorageIcon from "@mui/icons-material/Storage";
import SensorsIcon from "@mui/icons-material/Sensors";
import LinkOffIcon from "@mui/icons-material/LinkOff";
import MapIcon from "@mui/icons-material/Map";

import ConnectDisconnect from "./pages/ConnectDisconnect";
import Home from "./pages/Home";
import IMUData from "./pages/IMUData";
import Logger from "./pages/Logger";
import Map from "./pages/Map";
import SensorHealth from "./pages/SensorHealth";

const drawerWidth = 250;

const navItems = [
  { label: "Home", icon: <HomeIcon />, component: <Home /> },
  {
    label: "Sensor Health",
    icon: <HealthAndSafetyIcon />,
    component: <SensorHealth />,
  },
  { label: "Logger", icon: <StorageIcon />, component: <Logger /> },
  { label: "IMU Data", icon: <SensorsIcon />, component: <IMUData /> },
  {
    label: "Connect/Disconnect",
    icon: <LinkOffIcon />,
    component: <ConnectDisconnect />,
  },
  { label: "Map", icon: <MapIcon />, component: <Map /> },
];

const App = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(true);
  const [isDarkMode, setDarkMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(<Home />); // Default to Home

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  const toggleTheme = () => {
    setDarkMode(!isDarkMode);
  };

  const theme = createTheme({
    palette: {
      mode: isDarkMode ? "dark" : "light",
      primary: {
        main: isDarkMode ? "#90caf9" : "#1976d2", // Icon Colour
      },
      background: {
        default: isDarkMode ? "#121212" : "#ffffff",
        paper: isDarkMode ? "#1d1d1d" : "#ffffff",
      },
      text: {
        primary: isDarkMode ? "#ffffff" : "#000000",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex" }}>
        {/* Light/Dark Mode Toggle */}
        <Box
          sx={{
            position: "fixed",
            top: 10,
            left: 10,
            zIndex: 1300,
            display: "flex",
            alignItems: "center",
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
          <IconButton onClick={toggleTheme} sx={{ marginLeft: 1 }}>
            {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Box>

        {/* Sidebar */}
        <Drawer
          variant="persistent"
          open={isDrawerOpen}
          sx={{
            width: isDrawerOpen ? drawerWidth : 0,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              backgroundColor: theme.palette.background.paper,
              color: theme.palette.text.primary,
              transition: "width 0.3s ease",
            },
          }}
        >
          <Toolbar />
          <List>
            {navItems.map((item, index) => (
              <ListItem
                key={index}
                onClick={() => setCurrentPage(item.component)} // Change current page
                disablePadding
              >
                <ListItemButton sx={{ color: theme.palette.text.primary }}>
                  <ListItemIcon sx={{ color: theme.palette.primary.main }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>

        {/* Main Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            bgcolor: theme.palette.background.default,
            color: theme.palette.text.primary,
            p: 3,
            marginLeft: isDrawerOpen ? `${drawerWidth}px` : "0",
            transition: "margin-left 0.3s ease",
          }}
        >
          {currentPage} {/* Render the current page */}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;
