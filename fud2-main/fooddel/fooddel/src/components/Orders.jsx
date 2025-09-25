import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, Grid, Paper, Button, TextField, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { useLocation } from "react-router-dom";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const location = useLocation();

  const fetchOrders = async () => {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  const user_id = user?.user_id

    try {
      const res = await axios.get(`http://localhost:5000/orders/user/${user_id}`);
      setOrders(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // If navigated with new order in state
  useEffect(() => {
    if (location.state?.newOrder) {
      setOrders(prev => [location.state.newOrder, ...prev]);
    }
  }, [location.state]);

  const updateOrderField = async (orderId, field, value) => {
    const updatedOrders = orders.map(o => o.order_id === orderId ? { ...o, [field]: value } : o);
    setOrders(updatedOrders);

    const order = updatedOrders.find(o => o.order_id === orderId);
    try {
      await axios.put(`http://localhost:5000/orders/${orderId}`, {
        address: order.address,
        payment_method: order.payment,
        status: order.status,
      });
    } catch (err) {
      console.error("Error updating order:", err);
    }
  };

  const handlePayment = async (orderId) => {
    const order = orders.find(o => o.order_id === orderId);
    if (!order.address || !order.payment) {
      alert("Please enter address and select payment method!");
      return;
    }

    try {
      await axios.put(`http://localhost:5000/orders/${orderId}`, {
        address: order.address,
        payment_method: order.payment,
        status: "Completed",
      });

      setOrders(orders.map(o => o.order_id === orderId ? { ...o, status: "Completed" } : o));
      alert(`✅ Order Completed! Your ${order.item} will be delivered soon.`);
    } catch (err) {
      console.error(err);
      alert("Failed to complete order. Try again.");
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", width: "100vw", backgroundColor: "#fff5f0", display: "flex", flexDirection: "column" }}>
      <Box sx={{ py: 3, backgroundColor: "#d32f2f" }}>
        <Typography variant="h3" sx={{ fontWeight: "bold", color: "white", textAlign: "center" }}>📦 Your Orders</Typography>
      </Box>

      <Box sx={{ flex: 1, p: 3 }}>
        {orders.length === 0 ? (
          <Typography variant="h6" sx={{ textAlign: "center", color: "gray" }}>No orders yet. Go to the menu and add some items!</Typography>
        ) : (
          <Grid container spacing={3}>
            {orders.map(order => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={order.order_id}>
                <Paper elevation={6} sx={{ p: 3, borderRadius: 3, backgroundColor: "#ffffffee", display: "flex", flexDirection: "column" }}>
                  <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>Order#{order.order_id}</Typography>
                  <Typography variant="subtitle1" sx={{ mb: 1 }}>Item: {order.item}</Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>Quantity: {order.quantity}</Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>Price: ₹{order.price}</Typography>

                  {order.status === "Completed" ? (
                    <Typography variant="h6" sx={{ color: "green", fontWeight: "bold", textAlign: "center", mt: "auto" }}>✅ Order Completed</Typography>
                  ) : (
                    <>
                      <TextField label="Delivery Address" size="small" fullWidth sx={{ mb: 2 }} value={order.address || ""} onChange={(e) => updateOrderField(order.order_id, "address", e.target.value)} />
                      <Typography variant="subtitle2" sx={{ fontWeight: "bold", mb: 1 }}>Payment Method:</Typography>
                      <RadioGroup value={order.payment || ""} onChange={(e) => updateOrderField(order.order_id, "payment", e.target.value)}>
                        <FormControlLabel value="COD" control={<Radio />} label="Cash on Delivery" />
                        <FormControlLabel value="UPI" control={<Radio />} label="UPI" />
                        <FormControlLabel value="Card" control={<Radio />} label="Credit/Debit Card" />
                      </RadioGroup>
                      <Button variant="contained" color="success" fullWidth sx={{ mt: 2 }} onClick={() => handlePayment(order.order_id)}>Confirm & Pay</Button>
                    </>
                  )}
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default Orders;
