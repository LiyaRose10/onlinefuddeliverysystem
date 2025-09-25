// frontend/src/components/ConfirmOrder.jsx
import { Box, Button, FormControlLabel, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ConfirmOrder = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { item_id, item_name, price, quantity } = location.state || {};

  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("");

  if (!item_id) {
    return (
      <Box sx={{ p: 5 }}>
        <Typography variant="h5">No item selected for order.</Typography>
      </Box>
    );
  }

  const handleOrder = async () => {
    //const user_id = localStorage.getItem("loggedInUser");
    console.log("handle order called");

    const user = JSON.parse(localStorage.getItem("loggedInUser"));
const user_id = user?.user_id;

    if (!user_id) {
      alert("You must be logged in to place an order.");
      navigate("/login");
      return;
    }

    if (!address || !payment) {
      alert("Please enter delivery address and select payment method.");
      return;
    }
    try {
      const res = await axios.post("http://localhost:5000/orders/", {
        user_id,
        item_id,
        quantity,
        address,
        payment_method: payment
      });

      // ✅ Show success message
      alert(`✅ Order placed successfully for ${item_name}!`);

      // Navigate to orders page and pass new order in state
      navigate("/orders", { state: { newOrder: res.data.order } });

    } catch (err) {
      console.error("❌ Error creating order:", err.response?.data || err.message);
      alert("Failed to place order. Try again.");
    }
  };

  return (
    <Box sx={{ minHeight: "80vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", p: 3, backgroundColor: "#fff5f0" }}>
      <Typography variant="h4" sx={{ mb: 3 }}>Confirm Your Order</Typography>
      <Typography variant="h6">Item: {item_name}</Typography>
      <Typography variant="body1">Quantity: {quantity}</Typography>
      <Typography variant="body1">Price per item: ₹{price}</Typography>
      <Typography variant="h6" sx={{ mt: 2, mb: 2 }}>Total: ₹{price * quantity}</Typography>

      <TextField
        label="Delivery Address"
        fullWidth
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        sx={{ mb: 2 }}
      />

      <Typography variant="subtitle1" sx={{ mb: 1 }}>Payment Method:</Typography>
      <RadioGroup value={payment} onChange={(e) => setPayment(e.target.value)} row sx={{ mb: 2 }}>
        <FormControlLabel value="COD" control={<Radio />} label="Cash on Delivery" />
        <FormControlLabel value="UPI" control={<Radio />} label="UPI" />
        <FormControlLabel value="Card" control={<Radio />} label="Credit/Debit Card" />
      </RadioGroup>

      <Button variant="contained" color="success" onClick={handleOrder} sx={{ borderRadius: "20px", fontWeight: "bold" }}>
        Place Order
      </Button>
    </Box>
  );
};

export default ConfirmOrder;