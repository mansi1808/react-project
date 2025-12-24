import React from 'react';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { Container, List, ListItem, ListItemText, Typography, Button } from '@mui/material';
import { clearCart, removeFromCart } from '../features/cart/cartSlice';

const CheckoutPage: React.FC = () => {
  const cart = useAppSelector((s) => s.cart.items);
  const dispatch = useAppDispatch();
  const total = cart.reduce((a, b) => a + b.price * b.quantity, 0);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5">Checkout</Typography>
      <List>
        {cart.map((item) => (
          <ListItem key={item.id} secondaryAction={<Button onClick={() => dispatch(removeFromCart(item.id))}>Remove</Button>}>
            <ListItemText primary={`${item.title} x ${item.quantity}`} secondary={`$${item.price} each`} />
          </ListItem>
        ))}
      </List>
      <Typography variant="h6">Total: ${total.toFixed(2)}</Typography>
      <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={() => { dispatch(clearCart()); alert('Order placed (demo)'); }}>Place Order</Button>
    </Container>
  );
};

export default CheckoutPage;
