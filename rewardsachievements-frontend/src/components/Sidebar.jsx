import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Sidebar.css';

// Icons import
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import BarChartIcon from '@mui/icons-material/BarChart';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import SettingsIcon from '@mui/icons-material/Settings';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo-container">
        <div className="logo">A+</div>
      </div>
      
      <div className="menu-items">
        <div className="menu-item active">
          <Link to="/">
            <HomeIcon />
          </Link>
        </div>
        <div className="menu-item">
          <Link to="/menu">
            <MenuIcon />
          </Link>
        </div>
        <div className="menu-item">
          <Link to="/stats">
            <BarChartIcon />
          </Link>
        </div>
        <div className="menu-item">
          <Link to="/achievements">
            <EmojiEventsIcon />
          </Link>
        </div>
        <div className="menu-item">
          <Link to="/rewards">
            <AccountBalanceWalletIcon />
          </Link>
        </div>
        <div className="menu-item">
          <Link to="/settings">
            <SettingsIcon />
          </Link>
        </div>
        <div className="menu-item">
          <Link to="/camera">
            <CameraAltIcon />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;