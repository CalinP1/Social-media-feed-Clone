import React from 'react';
import { Link } from 'react-router-dom';
import PetsIcon from '@mui/icons-material/Pets';
import InfoIcon from '@mui/icons-material/Info';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import './Navbar.css';
const Navbar = () => {
  return (
    <nav className='navbar navbar-background d-flex justify-content-around py-4 align-items-center'>
        <div >
        <Link to='/' className='btn'>
          <PetsIcon fontSize="large" className='logo' />
        </Link>
        </div>
        <div className='site-name'>
        <span to='/' className='fs-2 fw-bold text-light'><em>OurSpace</em></span>
        </div>
      <div className="dropdown">
        <button className="btn background-color-dropdown dropdown-toggle position-static px-2" type="button" id="dropstartMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
          <FavoriteIcon className='dropdown-color' fontSize="medium"/>
          <InfoIcon className='dropdown-color' fontSize="medium"/>
          <LockOpenIcon className='dropdown-color' fontSize="medium"/>
        </button>
        <ul className="dropdown-menu dropdown-menu-end dropdown-background text-center" aria-labelledby="dropstartMenuButton">
          <li><Link to='/about' className='btn fw-bold text-light'>ABOUT</Link></li>
          <li><Link to='/favorites' className='btn fw-bold text-light'>FAVORITES</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
