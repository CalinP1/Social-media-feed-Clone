import React, { useState, useEffect } from 'react';
import './Profile.css';

export const Profile = () => {
  const [profile, setProfile] = useState({});
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [imageLink, setImageLink] = useState('');
  const [showForm, setShowForm] = useState(true);

  useEffect(() => {
    const storedProfile = JSON.parse(localStorage.getItem('profile')) || {};
    setProfile(storedProfile);
    setFirstName(storedProfile.firstName || '');
    setLastName(storedProfile.lastName || '');
    setEmail(storedProfile.email || '');
    setImageLink(storedProfile.imageLink || '');
    setShowForm(!storedProfile.firstName); 
  }, []);

  const handleCreateProfile = () => {
    const newProfile = {
      firstName,
      lastName,
      email,
      imageLink,
    };

    localStorage.setItem('profile', JSON.stringify(newProfile));
    setProfile(newProfile);
    setShowForm(false);
  };

  const handleResetProfile = () => {
    localStorage.removeItem('profile');
    setProfile({});
    setFirstName('');
    setLastName('');
    setEmail('');
    setImageLink('');
    setShowForm(true);
  };

  return (
    <div className="profile-container">
      {showForm && (
        <div className="profile-form">
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Image Link"
            value={imageLink}
            onChange={(e) => setImageLink(e.target.value)}
          />
          <button className="create-profile-button" onClick={handleCreateProfile}>
            Create Profile
          </button>
        </div>
      )}
      {!showForm && (
        <div className="profile-card">
          <img src={imageLink} alt="Profile Avatar" className="profile-avatar" />
          <h2>{firstName} {lastName}</h2>
          <p>Email: {email}</p>
          <button className="reset-profile-button" onClick={handleResetProfile}>
            Reset Profile
          </button>
        </div>
      )}
    </div>
  );
};
