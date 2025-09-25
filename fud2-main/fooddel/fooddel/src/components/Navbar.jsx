import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Button, IconButton, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import FastfoodIcon from "@mui/icons-material/Fastfood";

const Navbar = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("loggedInUser");
    setLoggedInUser(user);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setLoggedInUser(null);
    navigate("/login"); // navigate without page reload
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#d32f2f" }}>
      <Toolbar>
        {/* Logo / Brand */}
        <IconButton edge="start" color="inherit" component={Link} to="/" sx={{ mr: 1 }}>
          <FastfoodIcon />
        </IconButton>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            textDecoration: "none",
            color: "inherit",
            fontWeight: "bold",
            flexGrow: 1,
          }}
        >
          FoodieExpress
        </Typography>

        {/* Navbar Links */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button color="inherit" component={Link} to="/about">
            About Us
          </Button>
          <Button color="inherit" component={Link} to="/menu">
            Menu
          </Button>
          <Button color="inherit" component={Link} to="/orders">
            Orders
          </Button>
          <Button color="inherit" component={Link} to="/contact">
            Contact
          </Button>
        </Box>

        {/* Login / Signup or Logout */}
        {loggedInUser ? (
          <Button
            variant="contained"
            color="secondary"
            sx={{ ml: 2, borderRadius: "20px", fontWeight: "bold" }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        ) : (
          <Button
            variant="contained"
            color="secondary"
            component={Link}
            to="/login"
            sx={{ ml: 2, borderRadius: "20px", fontWeight: "bold" }}
          >
            Login / Signup
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
