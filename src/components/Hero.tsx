import React from 'react';
import { Box, Button, Typography, Container } from '@mui/material';
import { motion } from 'framer-motion';

const slides = [
  { title: 'Premium Electronics', subtitle: 'Top deals on latest gadgets', cta: 'Shop Now', color: 'linear-gradient(90deg,#8ec5fc 0%,#e0c3fc 100%)' },
  { title: 'Home Essentials', subtitle: 'Comfort & style for your home', cta: 'Explore', color: 'linear-gradient(90deg,#fbc2eb 0%,#a6c1ee 100%)' },
];

const Hero: React.FC = () => {
  return (
    <Box sx={{ py: 6, overflow: 'hidden' }}>
      <Container>
        <Box sx={{ position: 'relative', height: { xs: 220, md: 320 }, borderRadius: 3, overflow: 'hidden' }}>
          {slides.map((s, i) => (
            <motion.div key={i} initial={{ x: i === 0 ? 0 : 300, opacity: i === 0 ? 1 : 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.4, duration: 0.8 }} style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center' }}>
              <Box sx={{ p: { xs: 2, md: 4 }, borderRadius: 3, width: '100%', height: '100%', background: s.color, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: '#0f1724' }}>{s.title}</Typography>
                  <Typography sx={{ mt: 1, mb: 2, color: '#0f1724', opacity: 0.9 }}>{s.subtitle}</Typography>
                  <Button variant="contained" color="secondary" sx={{ borderRadius: 8 }}>{s.cta}</Button>
                </Box>
                <Box sx={{ width: { xs: '30%', md: '38%' }, display: { xs: 'none', md: 'block' } }}>
                  <div style={{ width: '100%', height: '160px', background: 'rgba(255,255,255,0.4)', borderRadius: 12 }} />
                </Box>
              </Box>
            </motion.div>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Hero;
