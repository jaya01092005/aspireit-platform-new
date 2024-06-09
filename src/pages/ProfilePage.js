import React, { useState, useEffect } from 'react';
import api from '../api/axios';

const ProfilePage = () => {
  const [profile, setProfile] = useState({ username: '', email: '', bio: '' });
  const [editMode, setEditMode] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

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

  const handleSave = async () => {
    try {
      const response = await api.put('/profile', { email: profile.email, bio: profile.bio });
      setMessage(response.data.message);
      setEditMode(false);
      setError('');
    } catch (error) {
      setError('Failed to update profile');
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="profile-page">
      <h1>Profile Page</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <label>Username:</label>
        <span>{profile.username}</span>
      </div>
      <div>
        <label>Email:</label>
        {editMode ? (
          <input type="email" name="email" value={profile.email} onChange={handleChange} />
        ) : (
          <span>{profile.email}</span>
        )}
      </div>
      <div>
        <label>Bio:</label>
        {editMode ? (
          <input type="text" name="bio" value={profile.bio} onChange={handleChange} />
        ) : (
          <span>{profile.bio}</span>
        )}
      </div>
      {editMode ? (
        <button onClick={handleSave}>Save Changes</button>
      ) : (
        <button onClick={() => setEditMode(true)}>Edit Profile</button>
      )}
      {message && <p>{message}</p>}
    </div>
  );
};

export default ProfilePage;
