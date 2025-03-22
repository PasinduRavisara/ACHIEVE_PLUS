import React from 'react';
import { Navbar as BsNavbar, Container, Nav, Dropdown, Button } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { currentUser, logout, isAdmin } = useAuth();

  return (
    <BsNavbar 
      bg="light" 
      expand="lg" 
      className="border-bottom shadow-sm py-2 mt-0 pt-0 navbar-light"
      style={{ 
        marginTop: 0, 
        paddingTop: '0.5rem',
        backdropFilter: 'blur(10px)',
        position: 'relative',
        zIndex: 1000 
      }}
    >
      <Container fluid className="px-4 py-0">
        <BsNavbar.Brand href="#" className="d-flex align-items-center">
          <span className="fw-bold h4 mb-0 logo-text">
            <span className="gradient-text">Achieve+</span>
          </span>
        </BsNavbar.Brand>
        
        <Nav className="ms-auto d-flex align-items-center">
          <Dropdown align="end">
            <Dropdown.Toggle 
              variant="light" 
              id="dropdown-basic" 
              className="d-flex align-items-center border-0 rounded-pill py-2 px-3"
              style={{
                backgroundColor: 'transparent',
                boxShadow: 'none',
                transition: 'all 0.2s ease'
              }}
            >
              <div 
                className="bg-primary rounded-circle text-white d-flex align-items-center justify-content-center me-2" 
                style={{ 
                  width: '38px', 
                  height: '38px',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                  background: 'linear-gradient(135deg, #4776E6 0%, #8E54E9 100%)'
                }}
              >
                <i className="bi bi-person-fill"></i>
              </div>
              <span className="d-none d-md-inline">
                <span className="fw-semibold">{currentUser?.fullName}</span>
                <small className="d-block text-muted">{isAdmin ? 'Admin' : 'Employee'}</small>
              </span>
            </Dropdown.Toggle>
            
            <Dropdown.Menu 
              className="border-0 rounded-4 mt-2 p-2 shadow-lg"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.98)', 
                backdropFilter: 'blur(10px)',
                minWidth: '220px',
                position: 'absolute', 
                right: 0,
                zIndex: 1050, 
                display: 'block' 
              }}
              popperConfig={{
                modifiers: [
                  {
                    name: 'offset',
                    options: {
                      offset: [0, 10], 
                    },
                  },
                ],
              }}
            >
              <div className="px-3 py-2 mb-2">
                <p className="mb-0 fw-medium text-dark">{currentUser?.fullName}</p>
                <p className="mb-0 text-muted small">{currentUser?.email}</p>
              </div>
              <Dropdown.Item href="/profile" className="rounded-3 py-2 px-3 mb-1 transition-all">
                <i className="bi bi-person me-2 text-primary"></i>
                <span className="fw-medium">Profile</span>
              </Dropdown.Item>
              <Dropdown.Item href="/settings" className="rounded-3 py-2 px-3 mb-1 transition-all">
                <i className="bi bi-gear me-2 text-primary"></i>
                <span className="fw-medium">Settings</span>
              </Dropdown.Item>
              <Dropdown.Divider className="my-2 opacity-25" />
              <Dropdown.Item onClick={logout} className="rounded-3 py-2 px-3 text-danger transition-all">
                <i className="bi bi-box-arrow-right me-2"></i>
                <span className="fw-medium">Logout</span>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Container>

      <style jsx>{`
        .gradient-text {
          background: linear-gradient(90deg, #4776E6 0%, #8E54E9 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .transition-all {
          transition: all 0.2s ease;
        }

        .transition-all:hover {
          background-color: rgba(71, 118, 230, 0.1);
          transform: translateX(2px);
        }

        .dropdown-item:active {
          background-color: rgba(71, 118, 230, 0.2);
        }

        .logo-text {
          letter-spacing: -0.5px;
        }
      `}</style>
    </BsNavbar>
  );
};

export default Navbar;
