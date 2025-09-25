/*import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography, TextField, Paper } from "@mui/material";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      alert("Login successful!");
      localStorage.setItem("loggedInUser", email);
      navigate("/orders");
    } else {
      alert("Invalid email or password!");
    }
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        backgroundImage: `linear-gradient(
          rgba(0, 0, 0, 0.5), 
          rgba(0, 0, 0, 0.5)
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
        <img
          src="https://cdn-icons-png.flaticon.com/512/1046/1046784.png"
          alt="FoodieExpress"
          style={{ width: "100px", marginBottom: "20px" }}
        />
        <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", color: "#d32f2f" }}>
          LOGIN
        </Typography>

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
          fullWidth
          color="primary"
          sx={{ mt: 3, py: 1.5, fontWeight: "bold" }}
          onClick={handleLogin}
        >
          LOGIN
        </Button>

        <Typography align="center" sx={{ my: 2, color: "#555" }}>
          OR
        </Typography>

        <Button
          variant="contained"
          color="secondary"
          fullWidth
          sx={{ py: 1.5, fontWeight: "bold" }}
          onClick={handleSignup}
        >
          CREATE ACCOUNT
        </Button>
      </Paper>
    </Box>
  );
};

export default Login;*/
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography, TextField, Paper } from "@mui/material";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /*const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter both email and password");
      return;
    }

    try {
     const response = await axios.post("http://localhost:5000/users/login", {
  email,
  password,
  
});


      if (response.data.success) {
        alert("Login successful!");
        localStorage.setItem("loggedInUser", email); // keep session in browser
        navigate("/orders");
      } else {
        alert("Invalid email or password!");
      }
    } catch (err) {
      console.error("❌ Login failed:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Error logging in");
    }
  };

  const handleSignup = () => {
    navigate("/signup");
  };*/
  const handleLogin = async () => {
  if (!email || !password) {
    alert("Please enter both email and password");
    return;
  }

  try {
    const response = await axios.post("http://localhost:5000/users/login", {
      email,
      password,
    });

   /* if (response.data.success) {
      const user = response.data.user; // ✅ get full user object from backend
      alert("Login successful!");

      // Save user info in localStorage
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      localStorage.setItem("user_id", user.user_id); // 🔑 keep id separately if needed

      navigate("/orders");
    } */if (response.data.success) {
  const user = response.data.user; // contains user_id, name, email
  alert("Login successful!");

  localStorage.setItem("loggedInUser", JSON.stringify(user));
  localStorage.setItem("user_id", user.user_id);

  navigate("/orders");
}

   else {
      alert("Invalid email or password!");
    }
  } catch (err) {
    console.error("❌ Login failed:", err.response?.data || err.message);
    alert(err.response?.data?.message || "Error logging in");
  }
};
const handleSignup = () => {
    navigate("/signup");
};

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        backgroundImage: `linear-gradient(
          rgba(0, 0, 0, 0.5), 
          rgba(0, 0, 0, 0.5)
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
        <img
          src="https://cdn-icons-png.flaticon.com/512/1046/1046784.png"
          alt="FoodieExpress"
          style={{ width: "100px", marginBottom: "20px" }}
        />
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#d32f2f" }}
        >
          LOGIN
        </Typography>

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
          fullWidth
          color="primary"
          sx={{ mt: 3, py: 1.5, fontWeight: "bold" }}
          onClick={handleLogin}
        >
          LOGIN
        </Button>

        <Typography align="center" sx={{ my: 2, color: "#555" }}>
          OR
        </Typography>

        <Button
          variant="contained"
          color="secondary"
          fullWidth
          sx={{ py: 1.5, fontWeight: "bold" }}
          onClick={handleSignup}
        >
          CREATE ACCOUNT
        </Button>
      </Paper>
    </Box>
  );
};

export default Login;

