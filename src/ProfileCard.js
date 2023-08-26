import React from 'react';
import './ProfileCard.css';

const ProfileCard = ({ name, picture, catImageUrl }) => {
  return (
    <div className="profile-card">
      <img src={picture} alt={name} className="profile-image" />
      <p className="profile-name">{name}</p>
      <img src={catImageUrl} alt="Cat" className="cat-image" />
    </div>
  );
};

export default ProfileCard;
