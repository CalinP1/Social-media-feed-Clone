import React from 'react';
import './ProfileCard.css';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddCommentIcon from '@mui/icons-material/AddComment';
import IosShareIcon from '@mui/icons-material/IosShare';

const ProfileCard = ({ name, picture, catImageUrl }) => {
  return (
    <div className="profile-card">
     <div className='profile-card-post'>
      <img src={picture} alt={name} className="profile-image" />
      <p className="profile-name py-1">{name}</p>
      <img src={catImageUrl} alt="Cat" className="cat-image img-fluid py-4" />
    </div>
    <div className='like-share-comment-section d-flex justify-content-around py-4'>
        <FavoriteIcon fontSize="large"/>
        <AddCommentIcon fontSize="large"/>
        <IosShareIcon fontSize="large"/>
    </div>
    </div>  
  );
};

export default ProfileCard;
