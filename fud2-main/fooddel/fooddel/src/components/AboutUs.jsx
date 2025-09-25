import React from "react";
import { Box, Typography, Paper, Divider, Grid } from "@mui/material";

const AboutUs = () => {
  return (
    <Box
      sx={{
        background: "linear-gradient(to right, #fff1e6, #ffd9d9)",
        minHeight: "100vh",
        width: "100vw",
        pt: 10, // ✅ adds space below navbar
        pb: 6,
        px: 4,
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start", // ✅ start below navbar
      }}
    >
      <Paper
        elevation={8}
        sx={{
          p: 5,
          borderRadius: 4,
          backgroundColor: "#ffffffee",
          backdropFilter: "blur(6px)",
          width: "100%",
          maxWidth: "1400px",
        }}
      >
        {/* Title */}
        <Typography
          variant="h3"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#d32f2f", textAlign: "center", mb: 2 }}
        >
          🍔 Welcome to FoodieExpress
        </Typography>

        <Divider sx={{ my: 3, borderColor: "#d32f2f" }} />

        {/* Image + Description */}
        <Grid container spacing={4} alignItems="center">
          {/* Left: Image */}
          <Grid item xs={12} md={6}>
            <img
              src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092"
              alt="Food Delivery"
              style={{
                width: "100%",
                borderRadius: "16px",
                boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
              }}
            />
          </Grid>

          {/* Right: Text */}
          <Grid item xs={12} md={6}>
            <Typography variant="body1" paragraph sx={{ fontSize: "1.15rem", lineHeight: 1.8 }}>
              <strong>FoodieExpress</strong> is your go-to platform for delicious meals delivered
              right to your doorstep. From <em>gourmet dishes to everyday favorites</em>, we make
              ordering food fast, easy, and reliable.
            </Typography>

            <Typography variant="body1" paragraph sx={{ fontSize: "1.15rem", lineHeight: 1.8 }}>
              Enjoy a seamless experience with our <strong>intuitive interface</strong> and track
              your orders in real-time. We connect customers, restaurants, and delivery partners
              effortlessly for maximum convenience.
            </Typography>
          </Grid>
        </Grid>

        {/* Key Highlights */}
        <Typography
          variant="h5"
          sx={{ mt: 5, color: "#d32f2f", fontWeight: "bold", mb: 1 }}
        >
          🍽️ Why Choose FoodieExpress?
        </Typography>
        <ul
          style={{
            fontSize: "1.1rem",
            marginTop: "0.5rem",
            paddingLeft: "1.5rem",
            lineHeight: 1.8,
          }}
        >
          <li>🚀 <strong>Fast & Reliable Delivery</strong> - Always on time</li>
          <li>🍕 <strong>Wide Variety of Restaurants</strong> - Something for everyone</li>
          <li>📱 <strong>Mobile-Friendly Design</strong> - Order anytime, anywhere</li>
          <li>💳 <strong>Secure Payments</strong> - Your information is safe</li>
          <li>⭐ <strong>Easy Tracking</strong> - Know exactly where your order is</li>
        </ul>

        {/* Bottom Food Image */}
        <Box sx={{ mt: 4, textAlign: "center" }}>
          <img
            src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c"
            alt="Delicious Food"
            style={{
              width: "80%",
              maxWidth: "600px",
              borderRadius: "20px",
              boxShadow: "0 8px 28px rgba(0,0,0,0.3)",
            }}
          />
        </Box>

        {/* Founders Section */}
        <Divider sx={{ my: 4, borderColor: "#1976d2" }} />
        <Typography
          variant="h5"
          sx={{ textAlign: "center", fontWeight: "bold", color: "#1976d2", mb: 1 }}
        >
          👩‍💻 Our Founders
        </Typography>
        <Box
          sx={{
            textAlign: "center",
            mt: 2,
            fontSize: "1.15rem",
            lineHeight: 1.8,
          }}
        >
          <Typography sx={{ fontWeight: "bold", color: "#d32f2f" }}>
            Jothsna Sara Kuruvilla
          </Typography>
          <Typography sx={{ fontStyle: "italic", color: "#555" }}>CEO</Typography>

          <Typography sx={{ fontWeight: "bold", color: "#d32f2f", mt: 2 }}>
            Liya Rose Tomy
          </Typography>
          <Typography sx={{ fontStyle: "italic", color: "#555" }}>CTO</Typography>

          <Typography sx={{ fontWeight: "bold", color: "#d32f2f", mt: 2 }}>
            Lesna Varghese
          </Typography>
          <Typography sx={{ fontStyle: "italic", color: "#555" }}>COO</Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default AboutUs;
