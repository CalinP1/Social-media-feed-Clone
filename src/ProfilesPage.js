import React, { useState, useEffect } from 'react';
import ProfileCard from './ProfileCard';
import './ProfilesPage.css';

const ProfilesPage = () => {
  const [page, setPage] = useState(1);
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [catImageUrls, setCatImageUrls] = useState([]);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    fetchProfiles();
    loadCatImagesFromStorage();
  }, [page]);

  const fetchProfiles = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://randomuser.me/api/?page=${page}&results=${page === 1 ? 8 : 2}`);
      const data = await response.json();

      setProfiles((prevProfiles) => [...prevProfiles, ...data.results]);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching profiles:', error);
      setLoading(false);
    }
  };

  const fetchCatImage = async () => {
    try {
      const response = await fetch('https://api.thecatapi.com/v1/images/search?limit=10');
      const data = await response.json();
      const newCatImageUrls = data.map((item) => item.url);
      setCatImageUrls(newCatImageUrls);

      localStorage.setItem('catImageUrls', JSON.stringify(newCatImageUrls));
    } catch (error) {
      console.error('Error fetching cat images:', error);
    }
  };

  const loadCatImagesFromStorage = () => {
    const storedCatImageUrls = localStorage.getItem('catImageUrls');
    if (storedCatImageUrls) {
      setCatImageUrls(JSON.parse(storedCatImageUrls));
    } else {
      fetchCatImage();
    }
  };

  const saveProfileData = (index, name, picture, catImageUrl) => {
    const postData = JSON.parse(localStorage.getItem('postData')) || [];
    postData[index] = { name, picture, catImageUrl };
    localStorage.setItem('postData', JSON.stringify(postData));
  };

  const loadProfileData = (index) => {
    const postData = JSON.parse(localStorage.getItem('postData'));
    return postData ? postData[index] : null;
  };

  const handleScroll = () => {
    const isBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 200;
    if (isBottom && !loading && !loadingMore) {
      fetchMoreProfiles();
    }
  };

  const fetchMoreProfiles = () => {
    setLoadingMore(true);
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (loadingMore) {
      fetchProfiles();
      setLoadingMore(false);
    }
  }, [loadingMore]);

  useEffect(() => {
    return () => {
      localStorage.setItem('profiles', JSON.stringify(profiles));
    };
  }, [profiles]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3">
          {/* Empty left col */}
        </div>
        <div className="col-md-6">
          <div className="profiles-page d-flex flex-wrap justify-content-center py-4">
            {profiles.map((profile, index) => {
              const savedData = loadProfileData(index);
              const name = savedData ? savedData.name : `${profile.name.first} ${profile.name.last}`;
              const picture = savedData ? savedData.picture : profile.picture.large;
              const catImageUrl = savedData
                ? savedData.catImageUrl
                : catImageUrls[index % catImageUrls.length];

              if (!savedData) {
                saveProfileData(index, name, picture, catImageUrl);
              }

              return (
                <ProfileCard className="profile-card"
                  key={index}
                  name={name}
                  picture={picture}
                  catImageUrl={catImageUrl}
                />
              );
            })}
          </div>
        </div>
        <div className="col-md-3">
          {/* Empty right col */}
        </div>
      </div>
    </div>
  );
};

export default ProfilesPage;
