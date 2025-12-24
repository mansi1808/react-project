import React from 'react';
import Drawer from '@mui/material/Drawer';
import { Box, Typography, IconButton, List, ListItem, ListItemText, Button, Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { removeFromCart, clearCart } from '../features/cart/cartSlice';

const CartDrawer: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
  const cart = useAppSelector((s) => s.cart.items);
  const dispatch = useAppDispatch();
  const total = cart.reduce((a, b) => a + b.price * b.quantity, 0);

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 360, p: 2 }} role="presentation">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">Your Cart</Typography>
          <IconButton onClick={onClose}><CloseIcon /></IconButton>
        </Box>
        <Divider sx={{ my: 1 }} />
        <List>
          {cart.length === 0 && <Typography sx={{ mt: 2 }}>Cart is empty</Typography>}
          {cart.map((item) => (
            <ListItem key={item.id} secondaryAction={<Button onClick={() => dispatch(removeFromCart(item.id))}>Remove</Button>}>
              <ListItemText primary={`${item.title} x${item.quantity}`} secondary={`$${item.price}`} />
            </ListItem>
          ))}
        </List>
        <Divider sx={{ my: 1 }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">Total</Typography>
          <Typography variant="h6">${total.toFixed(2)}</Typography>
        </Box>
        <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
          <Button variant="contained" fullWidth onClick={() => { dispatch(clearCart()); onClose(); }}>Checkout</Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default CartDrawer;
