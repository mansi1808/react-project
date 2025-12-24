import React, { useState } from 'react';
import { Container, TextField, Button, Box, Alert } from '@mui/material';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import api from '../api/axios';
import { logout } from '../features/auth/authSlice';

const ProfilePage: React.FC = () => {
  const { user, token } = useAppSelector((s) => s.auth);
  const dispatch = useAppDispatch();
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  if (!user) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="info">You must be logged in to view your profile.</Alert>
      </Container>
    );
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      // Attempt to patch user on API if id exists
      if (user.id) {
        await api.patch(`/users/${user.id}`, { firstName, lastName });
        setSuccess('Profile updated');
      } else {
        // fallback: update stored registered_users entry
        const registered = JSON.parse(localStorage.getItem('registered_users') || '[]');
        const idx = registered.findIndex((r: any) => r.username === user.username);
        if (idx >= 0) {
          registered[idx] = { ...registered[idx], firstName, lastName };
          localStorage.setItem('registered_users', JSON.stringify(registered));
          setSuccess('Profile updated (local)');
        } else {
          setError('Unable to update profile');
        }
      }
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Update failed');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Box component="form" onSubmit={handleUpdate} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}
        <TextField label="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
        <TextField label="Last name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
        <TextField label="Username" value={user.username} disabled />
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button type="submit" variant="contained">Save</Button>
          <Button variant="outlined" color="error" onClick={() => { dispatch(logout()); }}>Logout</Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ProfilePage;
