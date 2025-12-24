import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchProducts, fetchCategories } from '../features/products/productsSlice';
import ProductCard from '../components/ProductCard';
import { Container, Select, MenuItem, FormControl, InputLabel, Pagination, Box, Skeleton } from '@mui/material';
import Hero from '../components/Hero';
import Sidebar from '../components/Sidebar';
import DashboardHeader from '../components/DashboardHeader';
import { useLocation } from 'react-router-dom';

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, loading, categories, total } = useAppSelector((s) => s.products);
  const error = useAppSelector((s) => s.products.error);
  const [page, setPage] = useState(1);
  const limit = 12;

  const [category, setCategory] = useState('');
  const location = useLocation();

  // sync category from query param
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get('category') || '';
    if (q !== category) setCategory(q);
  }, [location.search]);

  useEffect(() => {
    dispatch(fetchProducts({ limit, skip: (page - 1) * limit, category: category || undefined }));
    dispatch(fetchCategories());
  }, [dispatch, page, category]);


  return (
    <Container sx={{ mt: 3 }}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '240px 1fr' }, gap: 3 }}>
        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
          {/* Sidebar placed here for desktop */}
          <div style={{ position: 'sticky', top: 20 }}>
            <Sidebar />
          </div>
        </Box>

        <Box>
          <Hero />
          <DashboardHeader />

          <Box sx={{ mb: 2 }}>
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel>Category</InputLabel>
              <Select label="Category" value={category} onChange={(e) => setCategory(e.target.value)}>
                <MenuItem value="">All</MenuItem>
                {categories.map((c) => (
                  <MenuItem key={c} value={c}>{c}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {loading ? (
            <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', sm: 'repeat(2,1fr)', md: 'repeat(3,1fr)', lg: 'repeat(4,1fr)' } }}>
              {Array.from({ length: 8 }).map((_, i) => (
                <Box key={i}>
                  <Box sx={{ borderRadius: 2, overflow: 'hidden' }}>
                    <Skeleton variant="rectangular" height={160} />
                    <Box sx={{ p: 2 }}>
                      <Skeleton variant="text" width="80%" />
                      <Skeleton variant="text" width="40%" />
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
          ) : (
            <>
              {/** Show error if present */}
              {error && (
                <Box sx={{ color: 'error.main', mb: 2 }}>{error}</Box>
              )}

              <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', sm: 'repeat(2,1fr)', md: 'repeat(3,1fr)', lg: 'repeat(4,1fr)' } }}>
                {items.map((p) => (
                  <Box key={p.id} sx={{ background: '#fff', p: 1, borderRadius: 2, boxShadow: '0 6px 20px rgba(20,20,80,0.04)' }}>
                    <ProductCard product={p} />
                  </Box>
                ))}
              </Box>

              <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                <Pagination count={Math.ceil(total / limit)} page={page} onChange={(_, value) => setPage(value)} />
              </Box>
            </>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default HomePage;