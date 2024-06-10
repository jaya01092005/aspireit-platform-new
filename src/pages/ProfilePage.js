import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { Container, TextField, Button, Typography, CircularProgress, Avatar } from '@mui/material';

const ProfilePage = () => {
  const [profile, setProfile] = useState({ username: '', email: '', bio: '', profilePic: '' });
  const [editMode, setEditMode] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('/profile');
        setProfile(response.data);
      } catch (error) {
        setError('Error fetching profile');
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await api.put('/profile', { email: profile.email, bio: profile.bio });
      setMessage(response.data.message);
      setEditMode(false);
      setError('');
    } catch (error) {
      setError('Failed to update profile');
      console.error('Error updating profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('profilePic', file);

    try {
      const response = await api.post('/profile/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setProfile((prevProfile) => ({
        ...prevProfile,
        profilePic: response.data.profilePic,
      }));
      setMessage(response.data.message);
      setError('');
    } catch (error) {
      setError('Failed to upload profile picture');
      console.error('Error uploading profile picture:', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>Profile Page</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <div>
        <Typography variant="h6">Username:</Typography>
        <Typography>{profile.username}</Typography>
      </div>
      <div>
        <TextField
          label="Email"
          type="email"
          name="email"
          value={profile.email}
          onChange={handleChange}
          disabled={!editMode}
          fullWidth
          margin="normal"
        />
      </div>
      <div>
        <TextField
          label="Bio"
          name="bio"
          value={profile.bio}
          onChange={handleChange}
          disabled={!editMode}
          fullWidth
          margin="normal"
        />
      </div>
      <div>
        <Avatar alt="Profile Picture" src={`http://localhost:5000/${profile.profilePic}`} sx={{ width: 100, height: 100 }} />
        <input type="file" onChange={handleFileChange} />
        <Button onClick={handleUpload} variant="contained" color="primary">
          Upload Profile Picture
        </Button>
      </div>
      {editMode ? (
        loading ? (
          <CircularProgress />
        ) : (
          <Button onClick={handleSave} variant="contained" color="primary" fullWidth>
            Save Changes
          </Button>
        )
      ) : (
        <Button onClick={() => setEditMode(true)} variant="contained" color="primary" fullWidth>
          Edit Profile
        </Button>
      )}
      {message && <Typography>{message}</Typography>}
    </Container>
  );
};

export default ProfilePage;
