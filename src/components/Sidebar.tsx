import React from 'react';
import { Box, List, ListItemButton, ListItemIcon, ListItemText, Avatar, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import CategoryIcon from '@mui/icons-material/Category';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BarChartIcon from '@mui/icons-material/BarChart';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ width: 240, p: 2, height: '100vh', position: 'sticky', top: 0, bgcolor: 'transparent' }}>
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
        <Avatar sx={{ bgcolor: 'secondary.main' }}>BS</Avatar>
        <Box>
          <Typography sx={{ fontWeight: 700 }}>BuyMore</Typography>
          <Typography variant="caption" color="text.secondary">Premium shop</Typography>
        </Box>
      </Box>

      <List>
        <ListItemButton onClick={() => navigate('/') }>
          <ListItemIcon><HomeIcon /></ListItemIcon>
          <ListItemText primary="Explore" />
        </ListItemButton>
        <ListItemButton onClick={() => navigate('/') }>
          <ListItemIcon><CategoryIcon /></ListItemIcon>
          <ListItemText primary="Categories" />
        </ListItemButton>
        <ListItemButton onClick={() => navigate('/wishlist') }>
          <ListItemIcon><FavoriteIcon /></ListItemIcon>
          <ListItemText primary="Wishlist" />
        </ListItemButton>
        <ListItemButton onClick={() => navigate('/checkout') }>
          <ListItemIcon><ShoppingBagIcon /></ListItemIcon>
          <ListItemText primary="Orders" />
        </ListItemButton>
        <ListItemButton onClick={() => navigate('/') }>
          <ListItemIcon><BarChartIcon /></ListItemIcon>
          <ListItemText primary="Insights" />
        </ListItemButton>
        <ListItemButton onClick={() => navigate('/profile') }>
          <ListItemIcon><LogoutIcon /></ListItemIcon>
          <ListItemText primary="Account" />
        </ListItemButton>
      </List>
    </Box>
  );
};

export default Sidebar;
