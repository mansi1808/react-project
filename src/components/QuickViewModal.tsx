import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

const QuickViewModal: React.FC<{ open: boolean; onClose: () => void; product?: any }> = ({ open, onClose, product }) => {
  if (!product) return null;
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{product.title}</DialogTitle>
      <DialogContent>
        <img src={product.thumbnail} alt={product.title} style={{ width: '100%', borderRadius: 8 }} />
        <Typography sx={{ mt: 2 }}>{product.description}</Typography>
        <Typography sx={{ mt: 1, fontWeight: 700 }}>${product.price}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default QuickViewModal;
