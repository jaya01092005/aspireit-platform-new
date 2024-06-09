import React, { useState } from 'react';

const ProfilePage = () => {
  const [profilePic, setProfilePic] = useState(null);

  const handleFileChange = (e) => {
    setProfilePic(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('profilePic', profilePic);
    // Add axios request to upload the file to the server
    // await axios.post('/api/upload', formData);
  };

  return (
    <div className="profile-page">
      <h1>User Profile</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Profile Picture</button>
    </div>
  );
};

export default ProfilePage;
