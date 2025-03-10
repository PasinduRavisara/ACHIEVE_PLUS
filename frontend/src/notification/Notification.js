import React, { useEffect, useState } from 'react';
import './NotificationScreen.css'; // Make sure to include the CSS file
import Reminder from './Reminder';
import { toast } from 'react-toastify';

const NotificationScreen = () => {
	const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const storedData = localStorage.getItem("notifications");

    if (storedData) {
      try {
        setNotifications(JSON.parse(storedData));
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    }
  }, []);

  const clearNoti = () => {
    window.localStorage.removeItem("read")
    window.localStorage.removeItem("notifications")
    toast.info("Notifications cleared sucessfully !")

    setTimeout(() => {
      window.location.reload()
    }, 5 * 1000);
  }


  const markAllAsRead = () => {
    window.localStorage.setItem("read", "true")
    toast.info("Notifications read sucessfully !")
    setTimeout(() => {
      window.location.reload()
    }, 5 * 1000);
  };

  return (
    <div className="app-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo-container">
          <div className="logo">A+</div>
        </div>
        
        <nav className="sidebar-nav">
          <a href="#" className="nav-item">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
          </a>
          
          <a href="#" className="nav-item">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="8" y1="6" x2="21" y2="6"></line>
              <line x1="8" y1="12" x2="21" y2="12"></line>
              <line x1="8" y1="18" x2="21" y2="18"></line>
              <line x1="3" y1="6" x2="3.01" y2="6"></line>
              <line x1="3" y1="12" x2="3.01" y2="12"></line>
              <line x1="3" y1="18" x2="3.01" y2="18"></line>
            </svg>
          </a>
          
          <a href="#" className="nav-item">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 20V10"></path>
              <path d="M18 20V4"></path>
              <path d="M6 20v-4"></path>
            </svg>
          </a>
          
          <a href="#" className="nav-item">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
          </a>
          
          <a href="#" className="nav-item active">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
          </a>
          
          <a href="#" className="nav-item">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
          </a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <header className="header">
          <h1>Notifications</h1>
          <div className="header-actions">
            <button className="icon-button">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
            
            <button className="icon-button notification-button">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
            </button>
            
            <div className="profile-image">
              <div className="avatar"></div>
            </div>
          </div>
        </header>

        {/* Notification Controls */}
        <div className="notification-controls">
          <button
            onClick={markAllAsRead}
            className="mark-all-button"
          >
            Mark all as read
          </button>

		  <button
            onClick={clearNoti}
            className="mark-all-button"
          >
            Clear Notification
          </button>
        </div>

        {/* Notification List */}
        <div className="notification-list">
          {notifications.map(notification => (
            <div 
              className={`notification-card ${!window.localStorage.getItem("read") ? 'unread' : ''}`}
            >
              <div className="notification-content">
                <h3 className="notification-title">{notification.title}</h3>
                <p className="notification-description">{notification.message}</p>
                <p className="notification-time">{notification.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationScreen;