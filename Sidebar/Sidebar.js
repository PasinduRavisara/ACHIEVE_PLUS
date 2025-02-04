// import React, { useState } from 'react';
// import './Sidebar.css';

// function Sidebar() {
//   const [isProfileOpen, setIsProfileOpen] = useState(false);

//   const handleProfileClick = () => {
//     setIsProfileOpen(!isProfileOpen); // Toggle the profile details visibility
//   };

//   return (
//     <aside className="sidebar">
//       <div className="profile-container">
//         <img
//           src="https://www.example.com/profile-icon.png" // Replace with your profile icon URL
//           alt="Profile"
//           className="profile-icon"
//           onClick={handleProfileClick}
//         />
//         {isProfileOpen && (
//           <div className="profile-details">
//             <p><strong>Name:</strong> John Doe</p>
//             <p><strong>Email:</strong> john.doe@example.com</p>
//             <p><strong>Role:</strong> Developer</p>
//           </div>
//         )}
//       </div>
//       <ul>
//         <li><a href="/">Dashboard</a></li>
//         <li><a href="/tasks">Task Management</a></li>
//         <li><a href="/progress">Progress Analytics</a></li>
//         <li><a href="/reward-store">Rewards & Achievements</a></li>
//         <li><a href="/leaderboard">Leaderboard</a></li>
//         <li><a href="/wellness">Wellness Hub</a></li>
//         {/* <ul className="submenu">
//           <li><a href="/workload">Workload Monitoring</a></li>
//           <li><a href="/stress-check">Stress Check-Ins</a></li>
//           <li><a href="/insights">Wellness Insights</a></li>
//           <li><a href="/break-prompts">Break Prompts</a></li>
//           <li><a href="/mini-games">Mini-Games</a></li>
//         </ul> */}
//         <li><a href="/settings">Settings</a></li>
//       </ul>
//     </aside>
//   );
// }

// export default Sidebar;
import { useState } from "react"
import { Home, CheckSquare, BarChart2, Award, Users, Heart, Settings, ChevronDown, LogOut } from "lucide-react"
import "./Sidebar.css"

const menuItems = [
  { icon: Home, label: "Dashboard", link: "/" },
  { icon: CheckSquare, label: "Task Management", link: "/tasks" },
  { icon: BarChart2, label: "Progress Analytics", link: "/progress" },
  { icon: Award, label: "Rewards & Achievements", link: "/reward-store" },
  { icon: Users, label: "Leaderboard", link: "/leaderboard" },
  {
    icon: Heart,
    label: "Wellness Hub",
    link: "/wellness",
    subItems: [
      { label: "Workload Monitoring", link: "/workload" },
      { label: "Stress Check-Ins", link: "/stress-check" },
      { label: "Wellness Insights", link: "/insights" },
      { label: "Break Prompts", link: "/break-prompts" },
      { label: "Mini-Games", link: "/mini-games" },
    ],
  },
  { icon: Settings, label: "Settings", link: "/settings" },
]

function Sidebar() {
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [activeItem, setActiveItem] = useState("Dashboard")
  const [expandedItem, setExpandedItem] = useState(null) // Corrected line

  const handleProfileClick = () => {
    setIsProfileOpen(!isProfileOpen)
  }

  const handleItemClick = (label) => {
    setActiveItem(label);
    const item = menuItems.find((item) => item.label === label);
    if (item && item.subItems) {
      setExpandedItem(expandedItem === label ? null : label);
    } else {
      setExpandedItem(null);
    }
  };
  

  return (
    <aside className="sidebar">
      <div className="profile-container">
        <img
          src="https://via.placeholder.com/150"
          alt="Profile"
          className="profile-icon"
          onClick={handleProfileClick}
        />
        {isProfileOpen && (
          <div className="profile-details">
            <h3>John Doe</h3>
            <p>john.doe@example.com</p>
            <p>Developer</p>
            <button className="logout-button">
              <LogOut size={10} />
              <p>Logout</p>
            </button>
          </div>
        )}
      </div>
      <nav>
        <ul>
          {menuItems.map((item) => (
            <li key={item.label}>
              <a
                href={item.link}
                className={`menu-item ${activeItem === item.label ? "active" : ""}`}
                onClick={() => handleItemClick(item.label)}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
                {item.subItems && (
                  <ChevronDown size={16} className={`submenu-icon ${expandedItem === item.label ? "rotated" : ""}`} />
                )}
              </a>
              {item.subItems && expandedItem === item.label && (
                <ul className="submenu">
                  {item.subItems.map((subItem) => (
                    <li key={subItem.label}>
                      <a href={subItem.link}>{subItem.label}</a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar
