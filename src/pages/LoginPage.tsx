import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { loginUser } from '../features/auth/authSlice';
import { TextField, Button, Container, Box, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((s) => s.auth);
  const navigate = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await dispatch(loginUser({ username, password }));
    if (loginUser.fulfilled.match(res)) {
      navigate('/');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Box component="form" onSubmit={submit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {error && <Alert severity="error">{(error as any) || 'Login failed'}</Alert>}
        <TextField label="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <TextField label="Password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" required />
        <Button type="submit" variant="contained" disabled={loading}>Login</Button>
      </Box>
    </Container>
  );
};

export default LoginPage;
