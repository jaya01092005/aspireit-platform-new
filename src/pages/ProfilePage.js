import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfilePage = () => {
  const [profile, setProfile] = useState({ username: '', email: '', bio: '' });
  const [editMode, setEditMode] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:5000/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfile(response.data);
      } catch (error) {
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
    const token = localStorage.getItem('token');
    try {
      const response = await axios.put(
        'http://localhost:5000/profile',
        { email: profile.email, bio: profile.bio },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage(response.data.message);
      setEditMode(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage('Failed to update profile.');
    }
  };

  return (
    <div className="profile-page">
      <h1>Profile Page</h1>
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
