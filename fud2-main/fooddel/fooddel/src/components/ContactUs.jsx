/*import React, { useState } from "react";
import axios from "axios";
import { Box, Typography, TextField, Button, Grid, Paper } from "@mui/material";

const ContactUs = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  // Safely parse loggedInUser from localStorage
 let loggedInUser = null;
  try {
    loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")) || null;
  } catch (err) {
    loggedInUser = null;
  }
 


  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!form.name || !form.email || !form.message) {
    alert("Please fill all fields!");
    return;
  }

  try {
    setLoading(true);

    const user_id = localStorage.getItem("user_id"); // fetch stored id

    const response = await fetch("http://localhost:5000/contact/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: user_id || null,
        name: form.name,
        email: form.email,
        message: form.message,
      }),
    });

    const data = await response.json();
    console.log("✅ Contact saved:", data);

    alert(`✅ Message submitted successfully! ID: ${data.contact_id}`);
    setForm({ name: "", email: "", message: "" });
  } catch (err) {
    console.error("❌ Submission failed:", err);
    alert("❌ Failed to submit. Try again.");
  } finally {
    setLoading(false);
  }
};




  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 3,
        background: "linear-gradient(to right, #ffe0b2, #ffcc80)",
      }}
    >
      <Paper
        sx={{ p: 5, borderRadius: 3, maxWidth: 700, width: "100%", backgroundColor: "#ffffffee" }}
      >
        <Typography
          variant="h3"
          sx={{ fontWeight: "bold", color: "#d32f2f", textAlign: "center", mb: 3 }}
        >
          📞 Contact Us
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Your Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Your Email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Your Message"
                name="message"
                value={form.message}
                onChange={handleChange}
                fullWidth
                multiline
                rows={5}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={loading}
                sx={{ py: 1.5, fontWeight: "bold" }}
              >
                {loading ? "Submitting..." : "Send Message"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>



  );
};

export default ContactUs;
*/
import React, { useState } from "react";
import { Box, Typography, TextField, Button, Grid, Paper } from "@mui/material";

const ContactUs = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  // Safely parse loggedInUser from localStorage
  let loggedInUser = null;
  try {
    loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")) || null;
  } catch (err) {
    loggedInUser = null;
  }

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      alert("Please fill all fields!");
      return;
    }

    try {
      setLoading(true);

      const user_id = localStorage.getItem("user_id"); // fetch stored id

      const response = await fetch("http://localhost:5000/contact/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: user_id || null,
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      });

      const data = await response.json();
      console.log("✅ Contact saved:", data);

      alert(`✅ Message submitted successfully! ID: ${data.contact_id}`);
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("❌ Submission failed:", err);
      alert("❌ Failed to submit. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: { xs: 2, sm: 3 },
        background: "linear-gradient(to right, #ffe0b2, #ffcc80)",
      }}
    >
      <Paper
        sx={{
          p: { xs: 3, sm: 5 },
          borderRadius: 3,
          maxWidth: 420,
          width: "100%",
          backgroundColor: "#ffffffee",
          boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
        }}
      >
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", color: "#d32f2f", textAlign: "center", mb: 3 }}
        >
          📞 Contact Us
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Your Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Your Email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Your Message"
                name="message"
                value={form.message}
                onChange={handleChange}
                fullWidth
                multiline
                rows={5}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={loading}
                sx={{ py: 1.5, fontWeight: "bold" }}
              >
                {loading ? "Submitting..." : "Send Message"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default ContactUs;
