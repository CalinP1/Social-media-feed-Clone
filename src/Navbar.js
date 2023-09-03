import React from 'react';
import { Link } from 'react-router-dom';
import PetsIcon from '@mui/icons-material/Pets';
import InfoIcon from '@mui/icons-material/Info';
import './Navbar.css';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

const Navbar = () => {
  return (
    <nav className='navbar navbar-background d-flex justify-content-around py-4 align-items-center'>
        <div >
        <Link to='/' className='btn'>
          <PetsIcon fontSize="large" className='logo' />
        </Link>
        </div>
        <div className='site-name'>
        <span className='fs-2 fw-bold text-light'><em>OurSpace</em></span>
        </div>
      <div className="dropdown">
        <button className="btn background-color-dropdown dropdown-toggle position-static px-2" type="button" id="dropstartMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
          <AccountBoxIcon className='dropdown-color' fontSize="large"/>
          <InfoIcon className='dropdown-color' fontSize="large"/>
        </button>
        <ul className="dropdown-menu dropdown-menu-end dropdown-background text-center " aria-labelledby="dropstartMenuButton">
          <li><Link to='profile' className='btn fw-bold text-dark px-2'>PROFILE</Link></li>
          <li><Link to='about' className='btn fw-bold text-dark '>ABOUT</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
