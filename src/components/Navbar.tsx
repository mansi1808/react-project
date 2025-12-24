import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { logout } from '../features/auth/authSlice';
import CartDrawer from './CartDrawer';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const cartCount = useAppSelector((s) => s.cart.items.reduce((a, b) => a + b.quantity, 0));
  const isLogged = !!useAppSelector((s) => s.auth.token);
  const categories = useAppSelector((s) => s.products.categories);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleMenu = (e: React.MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <AppBar position="sticky" color="transparent" sx={{ backdropFilter: 'blur(6px)', boxShadow: 'none', borderBottom: '1px solid rgba(0,0,0,0.04)' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, cursor: 'pointer', fontWeight: 700 }} onClick={() => navigate('/')}>React Store</Typography>
        <Button color="inherit" onClick={() => navigate('/')}>Home</Button>
        <Button color="inherit" onClick={handleMenu}>Categories</Button>
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          {categories.map((c) => <MenuItem key={c} onClick={() => { handleClose(); navigate('/'); }}>{c}</MenuItem>)}
        </Menu>

        <IconButton color="inherit" onClick={() => setDrawerOpen(true)}>
          <ShoppingCartIcon />
          <Typography sx={{ ml: 1 }}>{cartCount}</Typography>
        </IconButton>
        {isLogged ? (
          <>
            <Button color="inherit" onClick={() => navigate('/profile')}>Profile</Button>
            <Button color="inherit" onClick={() => { dispatch(logout()); navigate('/login'); }}>Logout</Button>
          </>
        ) : (
          <>
            <Button color="inherit" onClick={() => navigate('/register')}>Register</Button>
            <Button color="inherit" onClick={() => navigate('/login')}>Login</Button>
          </>
        )}

        <CartDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
