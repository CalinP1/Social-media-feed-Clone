import React, { useState, useEffect } from 'react';
import './Profile.css';

export const Profile = () => {
  const [profile, setProfile] = useState({});
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [imageLink, setImageLink] = useState('');
  const [showForm, setShowForm] = useState(true);
  const [emailError, setEmailError] = useState('');

  useEffect(() => {
    const storedProfile = JSON.parse(localStorage.getItem('profile')) || {};
    setProfile(storedProfile);
    setFirstName(storedProfile.firstName || '');
    setLastName(storedProfile.lastName || '');
    setEmail(storedProfile.email || '');
    setImageLink(storedProfile.imageLink || '');
    setShowForm(!storedProfile.firstName); 
  }, []);

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleCreateProfile = () => {
    if (!firstName || !lastName || !imageLink) {
      setEmailError('Toate câmpurile trebuie completate.');
      return;
    }
  
    if (!validateEmail(email)) {
      setEmailError('Email invalid.');
      return;
    }
  
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
    <div className="container my-5 px-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          {showForm && (
            <div className="profile-form">
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="form-control mb-3 border border-dark"
              />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="form-control mb-3 border border-dark"
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError('');
                }}
                className={`form-control mb-3 border border-dark ${emailError ? 'is-invalid' : ''}`}
              />
              {emailError && (
                <div className="invalid-feedback">{emailError}</div>
              )}
              <input
                type="text"
                placeholder="Image Link"
                value={imageLink}
                onChange={(e) => setImageLink(e.target.value)}
                className="form-control mb-3 border border-dark"
              />
              <button className="btn btn-primary d-block mx-auto" onClick={handleCreateProfile}>
                Create Profile
              </button>
            </div>
          )}
          {!showForm && (
            <div className="profile-card justify-content-center m-5">
              <img src={imageLink} alt="Profile Avatar" className="profile-avatar" />
              <h2>{firstName} {lastName}</h2>
              <p>Email: {email}</p>
              <button className="btn btn-danger" onClick={handleResetProfile}>
                Reset Profile
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
