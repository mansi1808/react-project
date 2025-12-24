import React from 'react';
import { Box, Typography, Chip } from '@mui/material';

const DashboardHeader: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>Explore</Typography>
        <Typography variant="body2" color="text.secondary">Discover curated picks and latest trends</Typography>
      </Box>

      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        <Chip label="37 Orders" />
        <Chip label="Website" variant="outlined" />
      </Box>
    </Box>
  );
};

export default DashboardHeader;
