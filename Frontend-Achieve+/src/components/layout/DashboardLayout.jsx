import React from 'react';
import { Container } from 'react-bootstrap';
import Sidebar from './Sidebar';
import './DashboardLayout.css';
import './Dashboard.css';

const DashboardLayout = ({ sidebarItems, children }) => {
  return (
    <div className="dashboard-container">
      <Sidebar items={sidebarItems} />
      <main className="dashboard-content">
        <Container fluid className="p-4">
          {children}
        </Container>
      </main>
    </div>
  );
};

export default DashboardLayout; 