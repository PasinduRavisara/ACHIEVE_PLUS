
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
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [expandedItem, setExpandedItem] = useState(null); // Corrected line

  const handleProfileClick = () => {
    setIsProfileOpen(!isProfileOpen);
  };

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
      {/* App Name */}
      <header className="app-name">
        <h4>ACHIEVE+</h4>
        {/* <img src="./img/achieve+.png" alt="logo" className="logo-icon" /> */}
      </header>

      {/* Profile Section */}
      <div className="profile-container">
        <img
          src="./img/profile4.png"
          alt="Profile"
          className="profile-icon"
          onClick={handleProfileClick}
        />
        <h6>Profile</h6>
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
       
      {/* Navigation */}
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
  );
}

export default Sidebar;
