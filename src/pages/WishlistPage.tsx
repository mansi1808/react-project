import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { useAppSelector } from '../store/hooks';

const WishlistPage: React.FC = () => {
  const products = useAppSelector((s) => s.products.items);
  const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
  const items = products.filter((p) => wishlist.includes(p.id));

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5">Wishlist</Typography>
      {items.length === 0 ? (
        <Typography sx={{ mt: 2 }}>Your wishlist is empty</Typography>
      ) : (
        <Box sx={{ mt: 2, display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' } }}>
          {items.map((p) => (
            <Box key={p.id} sx={{ p: 2, borderRadius: 2, background: '#fff' }}>
              <img src={p.thumbnail} alt={p.title} style={{ width: '100%', borderRadius: 8 }} />
              <Typography sx={{ mt: 1 }}>{p.title}</Typography>
              <Typography sx={{ color: 'text.secondary' }}>${p.price}</Typography>
              <Button sx={{ mt: 1 }} onClick={() => {
                const list = JSON.parse(localStorage.getItem('wishlist') || '[]').filter((id: number) => id !== p.id);
                localStorage.setItem('wishlist', JSON.stringify(list));
                window.location.reload();
              }}>Remove</Button>
            </Box>
          ))}
        </Box>
      )}
    </Container>
  );
};

export default WishlistPage;
