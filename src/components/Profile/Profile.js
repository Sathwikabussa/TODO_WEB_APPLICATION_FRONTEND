import React, { useState, useEffect } from 'react';
import { getProfile, updateProfile, deleteProfile } from '../../services/profileService';
import { logout } from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import { RxCross2 } from "react-icons/rx";
import './Profile.css';

const Profile = ({ onClose }) => {
  const [profile, setProfile] = useState({ name: '', email: '' });
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const data = await getProfile();
      setProfile(data);
    };
    fetchProfile();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updateData = { ...profile };
    if (password) updateData.password = password;
    try {
      await updateProfile(updateData);
      alert('Profile updated successfully');
      onClose(); // Close the profile form after update
    } catch (error) {
      alert('Error updating profile');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete your account?')) {
      await deleteProfile();
      logout();
      navigate('/signup');
    }
  };

  return (
    <div className="profile">
      <div className="profile-header">
        <h2>User Profile</h2>
        <RxCross2 className="close-btn" onClick={onClose}/>
      </div>

      <form onSubmit={handleUpdate}>
        <input
          type="text"
          value={profile.name}
          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
          placeholder="Name"
          required
        />
        <input
          type="email"
          value={profile.email}
          onChange={(e) => setProfile({ ...profile, email: e.target.value })}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="New Password"
        />
        <button type="submit">Update Profile</button>
      </form>
      <button onClick={handleDelete} className="delete-btn">Delete Account</button>
    </div>
  );
};

export default Profile;
