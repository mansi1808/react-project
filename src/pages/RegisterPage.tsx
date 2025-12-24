import React, { useState } from 'react';
import { Container, TextField, Button, Box, Alert } from '@mui/material';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const payload = { username, password, firstName, lastName }; // minimal
      // Attempt to create on dummyjson; this is a demo endpoint
      const res = await api.post('/users/add', payload);
      // Store registered user locally in case dummyjson auth doesn't accept newly created users
      const registered = JSON.parse(localStorage.getItem('registered_users') || '[]');
      registered.push(res.data);
      localStorage.setItem('registered_users', JSON.stringify(registered));
      setSuccess('Registration successful. Please login.');
      setTimeout(() => navigate('/login'), 1200);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Registration failed');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Box component="form" onSubmit={submit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}
        <TextField label="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
        <TextField label="Last name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
        <TextField label="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <Button type="submit" variant="contained">Register</Button>
      </Box>
    </Container>
  );
};

export default RegisterPage;
