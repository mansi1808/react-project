import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarIcon from '@mui/icons-material/Star';
import { motion } from 'framer-motion';
import { useAppDispatch } from '../store/hooks';
import { addToCart } from '../features/cart/cartSlice';
import QuickViewModal from './QuickViewModal';

const ProductCard: React.FC<{ product: any }> = ({ product }) => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [quickOpen, setQuickOpen] = useState(false);
  const [added, setAdded] = useState(false);
  const [wish, setWish] = useState(false);

  useEffect(() => {
    const list = JSON.parse(localStorage.getItem('wishlist') || '[]');
    setWish(list.includes(product.id));
  }, [product.id]);

  const handleAdd = () => {
    dispatch(addToCart({ id: product.id, title: product.title, price: product.price, quantity: 1, thumbnail: product.thumbnail }));
    setAdded(true);
    setOpen(true);
    setTimeout(() => setAdded(false), 900);
  };

  const toggleWish = () => {
    const list = JSON.parse(localStorage.getItem('wishlist') || '[]');
    let next;
    if (list.includes(product.id)) next = list.filter((id: number) => id !== product.id);
    else next = [product.id, ...list];
    localStorage.setItem('wishlist', JSON.stringify(next));
    setWish(next.includes(product.id));
  };

  return (
    <>
      <motion.div whileHover={{ scale: 1.03, y: -6 }} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.28 }}>
        <Card sx={{ position: 'relative', overflow: 'hidden' }}>
          {/* Discount badge */}
          {product.discountPercentage && (
            <Badge badgeContent={`-${Math.round(product.discountPercentage)}%`} color="secondary" sx={{ position: 'absolute', right: 8, top: 8 }} />
          )}

          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', right: 8, top: 8, zIndex: 4 }}>
              <IconButton onClick={toggleWish} size="small" color={wish ? 'secondary' : 'default'}>
                {wish ? <FavoriteIcon color="secondary" /> : <FavoriteBorderIcon />}
              </IconButton>
            </div>
            <CardMedia component="img" height="160" image={product.thumbnail} alt={product.title} style={{ objectFit: 'cover', transition: 'transform 0.35s ease' }} />
          </div>

          <CardContent>
            <Typography gutterBottom variant="h6" component="div" sx={{ height: 44, overflow: 'hidden' }}>{product.title}</Typography>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <StarIcon fontSize="small" sx={{ color: '#ffb400', mr: 0.5 }} />
                <Typography variant="body2">{product.rating?.toFixed(1)}</Typography>
              </div>
              <Typography variant="body2" color="text.secondary">${product.price}</Typography>
            </div>
          </CardContent>

          <CardActions sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Button size="small" onClick={handleAdd} variant={added ? 'outlined' : 'contained'} component={motion.button} whileTap={{ scale: 0.95 }}>
              {added ? 'Added' : 'Add to Cart'}
            </Button>
            <Button size="small" variant="text" onClick={() => setQuickOpen(true)}>Quick View</Button>
          </CardActions>
        </Card>
      </motion.div>

      <QuickViewModal open={quickOpen} onClose={() => setQuickOpen(false)} product={product} />

      <Snackbar open={open} autoHideDuration={2200} onClose={() => setOpen(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert onClose={() => setOpen(false)} severity="success" sx={{ width: '100%' }}>
          Added "{product.title}" to cart
        </Alert>
      </Snackbar>
    </>
  );
};

export default ProductCard;
