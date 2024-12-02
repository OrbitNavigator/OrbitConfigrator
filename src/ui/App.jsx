import React, { useState } from "react";
import {
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
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
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";

const drawerWidth = 250;

// Page Components
const Home = () => <div>Home Content</div>;
const SensorHealth = () => <div>Sensor Health Content</div>;
const Logger = () => <div>Logger Content</div>;
const IMUData = () => <div>IMU Data Content</div>;
const ConnectDisconnect = () => <div>Connect/Disconnect Content</div>;
const Map = () => <div>Map Content</div>;

const navItems = [
  { label: "Home", icon: <HomeIcon />, path: "/" },
  { label: "Sensor Health", icon: <HealthAndSafetyIcon />, path: "/sensor-health" },
  { label: "Logger", icon: <StorageIcon />, path: "/logger" },
  { label: "IMU Data", icon: <SensorsIcon />, path: "/imu-data" },
  { label: "Connect/Disconnect", icon: <LinkOffIcon />, path: "/connect-disconnect" },
  { label: "Map", icon: <MapIcon />, path: "/map" },
];

const App = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(true);
  const [isDarkMode, setDarkMode] = useState(false);

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
        main: isDarkMode ? "#90caf9" : "#1976d2",
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
      <Router>
        <Box sx={{ display: "flex" }}>
          {/* Hamburger Icon and Light/Dark Mode Toggle */}
          <Box sx={{ position: "fixed", top: 10, left: 10, zIndex: 1300, display: "flex", alignItems: "center" }}>
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
                  button
                  key={index}
                  component={Link}
                  to={item.path}
                  sx={{
                    "&:hover": {
                      backgroundColor: isDarkMode ? "#333333" : "#EBEAFF",
                    },
                  }}
                >
                  <ListItemIcon sx={{ color: theme.palette.primary.main }}>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.label} />
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
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/sensor-health" element={<SensorHealth />} />
              <Route path="/logger" element={<Logger />} />
              <Route path="/imu-data" element={<IMUData />} />
              <Route path="/connect-disconnect" element={<ConnectDisconnect />} />
              <Route path="/map" element={<Map />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
};

export default App;
