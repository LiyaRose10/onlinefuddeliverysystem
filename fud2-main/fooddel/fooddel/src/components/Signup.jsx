/*import React, { useState } from "react";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = users.some(u => u.email === email);

    if (userExists) {
      alert("Email already registered. Please login.");
      return;
    }

    const newUser = { name, address, phone, email, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Signup successful! Please login.");
    navigate("/login");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        backgroundImage: `linear-gradient(
          rgba(0,0,0,0.5), 
          rgba(0,0,0,0.5)
        ), url(https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1470&q=80)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      <Paper
        elevation={12}
        sx={{
          backgroundColor: "rgba(255,255,255,0.95)",
          padding: { xs: 4, sm: 6 },
          width: { xs: "100%", sm: 400, md: 450 },
          maxWidth: "100%",
          boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
          borderRadius: 4,
          textAlign: "center",
          backdropFilter: "blur(8px)",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          sx={{ fontWeight: "bold", color: "#d32f2f", mb: 3 }}
        >
          SIGNUP
        </Typography>

        <TextField
          label="Name"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Address"
          fullWidth
          margin="normal"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <TextField
          label="Phone"
          fullWidth
          margin="normal"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 3, py: 1.5, fontWeight: "bold" }}
          onClick={handleSignup}
        >
          SIGNUP
        </Button>
      </Paper>
    </Box>
  );
};

export default Signup;*/




import React, { useState } from "react";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    if (!name || !email || !password) {
      alert("Name, Email and Password are required");
      return;
    }

    const newUser = { name, address, phone, email, password };

    try {
      const response = await axios.post(
        "http://localhost:5000/users/signup",
        newUser
      );

      if (response.status === 201) {
        alert("Signup successful! Please login.");
        navigate("/login");
      } else {
        alert("Signup failed. Try again.");
      }
    } catch (err) {
      console.error("❌ Signup failed:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Error signing up");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        backgroundImage: `linear-gradient(
          rgba(0,0,0,0.5), 
          rgba(0,0,0,0.5)
        ), url(https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1470&q=80)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      <Paper
        elevation={12}
        sx={{
          backgroundColor: "rgba(255,255,255,0.95)",
          padding: { xs: 4, sm: 6 },
          width: { xs: "100%", sm: 400, md: 450 },
          maxWidth: "100%",
          boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
          borderRadius: 4,
          textAlign: "center",
          backdropFilter: "blur(8px)",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          sx={{ fontWeight: "bold", color: "#d32f2f", mb: 3 }}
        >
          SIGNUP
        </Typography>

        <TextField
          label="Name"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Address"
          fullWidth
          margin="normal"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <TextField
          label="Phone"
          fullWidth
          margin="normal"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 3, py: 1.5, fontWeight: "bold" }}
          onClick={handleSignup}
        >
          SIGNUP
        </Button>
      </Paper>
    </Box>
  );
};

export default Signup;
