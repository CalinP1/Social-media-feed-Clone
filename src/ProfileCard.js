import React, { useState, useEffect } from 'react';
import './ProfileCard.css';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';

const ProfileCard = ({ name, picture, catImageUrl }) => {
  function loadComments() {
    const storedComments = JSON.parse(localStorage.getItem('comments')) || {};
    return storedComments[name] || [];
  }

  const [isCommenting, setIsCommenting] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState(loadComments());
  const [isFavorite, setIsFavorite] = useState(false); // Adăugați această linie

  const handleCommentClick = () => {
    setIsCommenting(!isCommenting);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleCommentSubmit = () => {
    setComment('');
    setIsCommenting(false);
    saveComment(name, comment);
  };

  const saveComment = (profileName, newComment) => {
    const commentsData = JSON.parse(localStorage.getItem('comments')) || {};
    if (!commentsData[profileName]) {
      commentsData[profileName] = [];
    }
    commentsData[profileName].push(newComment);
    localStorage.setItem('comments', JSON.stringify(commentsData));
    setComments(commentsData[profileName]);
  };

  const handleDeleteComment = (index) => {
    const updatedComments = comments.filter((_, i) => i !== index);
    saveUpdatedComments(updatedComments);
    setComments(updatedComments);
  };

  const saveUpdatedComments = (updatedComments) => {
    const commentsData = JSON.parse(localStorage.getItem('comments')) || {};
    commentsData[name] = updatedComments;
    localStorage.setItem('comments', JSON.stringify(commentsData));
    setComments(updatedComments);
  };
  
  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
    saveFavoriteStatus(!isFavorite);
  };

  const saveFavoriteStatus = (status) => {
    const favoriteStatus = JSON.parse(localStorage.getItem('favoriteStatus')) || {};
    favoriteStatus[name] = status;
    localStorage.setItem('favoriteStatus', JSON.stringify(favoriteStatus));
  };

  useEffect(() => {
    const favoriteStatus = JSON.parse(localStorage.getItem('favoriteStatus')) || {};
    setIsFavorite(favoriteStatus[name] || false);
  }, []);

  return (
    <div className="profile-card">
      <div className="profile-card-post">
        <img src={picture} alt={name} className="profile-image" />
        <p className="profile-name py-1">{name}</p>
        <img src={catImageUrl} alt="Cat" className="cat-image img-fluid py-4" />
      </div>
      
      <div className="like-share-comment-section d-flex justify-content-around py-5">
        <FavoriteIcon
          fontSize='large'
          className={`favorite-icon ${isFavorite ? 'active' : ''}`}
          onClick={handleFavoriteClick}
        />
        <button className="comment-button" onClick={handleCommentClick}>
          {isCommenting ? 'Cancel' : 'Comment'}
        </button>
      </div>
      {isCommenting && (
        <div className="comment-section">
          <textarea
            placeholder="Leave a comment..."
            value={comment}
            onChange={handleCommentChange}
            className="comment-input"
          />
          <button className="submit-comment-button" onClick={handleCommentSubmit}>
            Submit
          </button>
        </div>
      )}
      {comments.length > 0 && (
        <div className="comments-container">
          <h3>Comments:</h3>
          <ul className="comments-list">
            {comments.map((comment, index) => (
              <li key={index} className="comment-item">
                {comment}
                <button
                  className="delete-comment-button"
                  onClick={() => handleDeleteComment(index)}
                >
                  <CancelPresentationIcon />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
