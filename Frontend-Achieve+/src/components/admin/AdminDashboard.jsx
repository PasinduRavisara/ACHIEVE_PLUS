import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  Button,
  Badge,
  ProgressBar,
  Dropdown,
  Table,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
import { useAuth } from "../../context/AuthContext";
import Navbar from "../layout/Navbar";
import { getAllTasks } from "../../api/tasks";
import { getAllUsers } from "../../api/users";
import AdminReminders from './AdminReminders';
import { BsArrowUp, BsArrowDown, BsSpeedometer2, BsListCheck, BsPeople, 
  BsGraphUp, BsBarChartLine, BsShop, BsGear, BsCheckCircle, 
  BsArrowRepeat, BsPlusCircle, BsInfoCircle, BsClock } from "react-icons/bs";

const AdminDashboard = ({ onLogout }) => {
  const { currentUser } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [taskStats, setTaskStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    inProgressTasks: 0,
  });
  const [loading, setLoading] = useState(true);
  const [projectFilter, setProjectFilter] = useState("All Projects");

  const adminSidebarItems = [
        { title: "Dashboard", path: "/admin-dashboard", icon: "bi-speedometer2" },
        { title: "Tasks", path: "/admin-tasks", icon: "bi-list-check" },
        { title: "Employees", path: "/admin-employees", icon: "bi-people" },
        {
          title: "Progress Analysis",
          path: "/admin-progress",
          icon: "bi-graph-up",
        },
        {
          title: "Leaderboard",
          path: "/leaderboard",
          icon: "bi-bar-chart-line",
        },
        { title: "Reward Store", path: "/admin-reward-store", icon: "bi-shop" },
        { title: "Settings", path: "/admin-settings", icon: "bi-gear" },
      ];
    
  // Feature cards for the dashboard
  const featureCards = [
    {
      title: "Task Management",
      description: "Create, assign, and track tasks for your team members",
      icon: <BsListCheck size={24} />,
      color: "primary",
      path: "/admin-tasks",
    },
    {
      title: "Employee Management",
      description: "Manage employee profiles, roles, and permissions",
      icon: <BsPeople size={24} />,
      color: "success",
      path: "/admin-employees",
    },
    {
      title: "Progress Analysis",
      description: "View detailed analytics and reports on team performance",
      icon: <BsGraphUp size={24} />,
      color: "info",
      path: "/admin-progress",
    },
    {
      title: "Leaderboard",
      description: "View top performers and encourage healthy competition",
      icon: <BsBarChartLine size={24} />,
      color: "danger",
      path: "/admin-leaderboard",
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch all tasks
        const tasksData = await getAllTasks();
        setTasks(tasksData);

        // Fetch all users
        const usersData = await getAllUsers();
        setUsers(usersData);

        // Calculate task statistics
        const totalTasks = tasksData.length;
        const completedTasks = tasksData.filter(
          (task) => task.status === "COMPLETED" || task.status === "Completed"
        ).length;
        const pendingTasks = tasksData.filter(
          (task) => task.status === "PENDING" || task.status === "New"
        ).length;
        const inProgressTasks = tasksData.filter(
          (task) =>
            task.status === "IN_PROGRESS" || task.status === "In Progress"
        ).length;

        setTaskStats({
          totalTasks,
          completedTasks,
          pendingTasks,
          inProgressTasks,
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Group tasks by assignee to create "projects"
  const groupTasksByAssignee = () => {
    const projectMap = {};

    tasks.forEach((task) => {
      const assigneeId = task.assignedTo;
      if (!projectMap[assigneeId]) {
        const assignee = users.find((user) => user.id === assigneeId);
        const assigneeName = assignee
          ? assignee.fullName ||
            `${assignee.firstName || ""} ${assignee.lastName || ""}`.trim()
          : "Unassigned";

        projectMap[assigneeId] = {
          name: `${assigneeName}'s Tasks`,
          tasks: [],
          teamSize: 1,
          totalPoints: 0,
          completedPoints: 0,
        };
      }

      projectMap[assigneeId].tasks.push(task);
      projectMap[assigneeId].totalPoints += task.points || 0;
      if (task.status === "COMPLETED" || task.status === "Completed") {
        projectMap[assigneeId].completedPoints += task.points || 0;
      }
    });

    // Convert to array and calculate progress
    return Object.values(projectMap)
      .map((project) => {
        const progress =
          project.totalPoints > 0
            ? Math.round((project.completedPoints / project.totalPoints) * 100)
            : 0;

        // Calculate days left based on the latest due date
        const latestDueDate = project.tasks.reduce((latest, task) => {
          if (!task.dueDate) return latest;
          const dueDate = new Date(task.dueDate);
          return latest > dueDate ? latest : dueDate;
        }, new Date());

        const today = new Date();
        const daysLeft = Math.max(
          0,
          Math.ceil((latestDueDate - today) / (1000 * 60 * 60 * 24))
        );

        // Determine status based on progress
        let status, color;
        if (progress === 100) {
          status = "Completed";
          color = "success";
        } else if (progress >= 50) {
          status = "In Progress";
          color = "primary";
        } else if (progress > 0) {
          status = "In Progress";
          color = "info";
        } else {
          status = "Not Started";
          color = "warning";
        }

        return {
          ...project,
          progress,
          daysLeft,
          status,
          color,
        };
      })
      .filter((project) => {
        // Apply filter if needed
        if (projectFilter === "All Projects") return true;
        return project.status === projectFilter;
      })
      .sort((a, b) => b.progress - a.progress);
  };

  // Calculate completion rate and change from previous
  const getCompletionRate = () => {
    if (taskStats.totalTasks === 0) return { value: "0%", change: "0%" };

    const completionRate = Math.round(
      (taskStats.completedTasks / taskStats.totalTasks) * 100
    );
    // In a real app, you would compare with previous period data
    // For demo, we'll assume a random positive change
    const change = `+${Math.floor(Math.random() * 10)}%`;

    return { value: `${completionRate}%`, change };
  };

  // Company overview stats
  const companyOverview = [
    {
      title: "Total Tasks",
      value: taskStats.totalTasks,
      change: `+${taskStats.totalTasks}`,
      icon: <BsListCheck size={24} />,
      color: "info",
    },
    {
      title: "Team Members",
      value: users.filter(
        (user) => user.role === "ROLE_EMPLOYEE" || user.role === "Employee"
      ).length,
      change: "+0",
      icon: <BsPeople size={24} />,
      color: "success",
    },
    {
      title: "In Progress",
      value: taskStats.inProgressTasks,
      change: `+${taskStats.inProgressTasks}`,
      icon: <BsArrowRepeat size={24} />,
      color: "primary",
    },
    {
      title: "Completion Rate",
      value: getCompletionRate().value,
      change: getCompletionRate().change,
      icon: <BsCheckCircle size={24} />,
      color: "warning",
    },
  ];

  const projectStats = groupTasksByAssignee();

  // Custom loading spinner component
  const LoadingSpinner = () => (
    <div className="text-center p-5">
      <div className="spinner-grow text-primary" role="status" style={{ width: "3rem", height: "3rem" }}>
        <span className="visually-hidden">Loading...</span>
      </div>
      <p className="mt-3 text-primary">Loading dashboard data...</p>
    </div>
  );

  // Empty state component
  const EmptyState = ({ icon, message }) => (
    <div className="text-center p-5">
      {icon}
      <p className="mt-3 text-muted">{message}</p>
    </div>
  );

  // Custom avatar component
  const Avatar = ({ name, color }) => {
    const bgColors = {
      A: "primary", B: "success", C: "danger", D: "warning", 
      E: "info", F: "secondary", G: "primary", H: "success",
      I: "danger", J: "warning", K: "info", L: "secondary",
      M: "primary", N: "success", O: "danger", P: "warning",
      Q: "info", R: "secondary", S: "primary", T: "success",
      U: "danger", V: "warning", W: "info", X: "secondary",
      Y: "primary", Z: "success"
    };
    
    const letter = name.charAt(0).toUpperCase();
    const bgColor = color || bgColors[letter] || "primary";
    
    return (
      <div className={`avatar-circle bg-${bgColor} text-white d-flex align-items-center justify-content-center`} 
           style={{ width: "40px", height: "40px", borderRadius: "50%", fontSize: "18px", fontWeight: "bold" }}>
        {letter}
      </div>
    );
  };

  return (
    <DashboardLayout sidebarItems={adminSidebarItems}>
      <Navbar userType="admin" onLogout={onLogout} />
      
      {/* Header with gradient background */}
      <div className="mb-4 p-4 bg-gradient-primary-to-secondary text-blue rounded-lg shadow-sm">
        <h1 className="mb-2 display-5">Welcome, {currentUser?.fullName || "Admin"}</h1>
        <h5 className="fw-light opacity-60">
          Manage your team and boost productivity with AchievePlus
        </h5>
      </div>

      {/* Company Overview Stats with animations */}
      <Row className="mb-4 g-3">
        {companyOverview.map((stat, index) => (
          <Col md={6} lg={3} key={index}>
            <Card className="h-100 border-0 shadow-sm hover-lift" 
                  style={{ transition: "transform 0.2s", cursor: "pointer" }}
                  onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-5px)"}
                  onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}>
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <p className="text-muted mb-1 small text-uppercase fw-bold">{stat.title}</p>
                    <h3 className="mb-0 fw-bold">{stat.value}</h3>
                    <span
                      className={`badge bg-${stat.color}-subtle text-${stat.color} mt-2 px-2 py-1`}
                    >
                      {stat.change}{" "}
                      {stat.change.startsWith("+") ? <BsArrowUp /> : <BsArrowDown />}
                    </span>
                  </div>
                  <div className={`bg-${stat.color}-subtle p-3 rounded-circle`}>
                    {stat.icon}
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Feature Cards with hover effects */}
      <Row className="mb-4 g-3">
        {featureCards.map((feature, index) => (
          <Col md={6} lg={3} key={index}>
            <Link to={feature.path} className="text-decoration-none">
              <Card className="h-100 shadow-sm hover-card border-0" 
                    style={{ transition: "all 0.3s ease", overflow: "hidden" }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = "translateY(-8px)";
                      e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.1)";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "0 .125rem .25rem rgba(0,0,0,.075)";
                    }}>
                <div className={`bg-${feature.color} p-2 position-absolute top-0 start-0 end-0`} style={{ height: "8px" }}></div>
                <Card.Body className="d-flex flex-column align-items-center text-center p-4 pt-5">
                  <div
                    className={`rounded-circle bg-${feature.color}-subtle p-3 mb-3 d-flex align-items-center justify-content-center`}
                    style={{ width: "70px", height: "70px" }}
                  >
                    <span className={`text-${feature.color}`}>{feature.icon}</span>
                  </div>
                  <h5 className="card-title fw-bold">{feature.title}</h5>
                  <p className="card-text text-muted">{feature.description}</p>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>

      {/* Projects Overview with improved table */}
      <Row className="mb-4 g-3">
        <Col lg={8}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Header className="bg-white border-0 py-3">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0 fw-bold">Tasks by Employee</h5>
                <div>
                  <Dropdown align="end">
                    <Dropdown.Toggle
                      variant="outline-primary"
                      size="sm"
                      id="project-filter"
                      className="rounded-pill px-3"
                    >
                      {projectFilter}
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="shadow-sm border-0">
                      <Dropdown.Item
                        onClick={() => setProjectFilter("All Projects")}
                        active={projectFilter === "All Projects"}
                      >
                        All Projects
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => setProjectFilter("In Progress")}
                        active={projectFilter === "In Progress"}
                      >
                        In Progress
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => setProjectFilter("Not Started")}
                        active={projectFilter === "Not Started"}
                      >
                        Not Started
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => setProjectFilter("Completed")}
                        active={projectFilter === "Completed"}
                      >
                        Completed
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
            </Card.Header>
            <Card.Body className="p-0">
              {loading ? (
                <LoadingSpinner />
              ) : projectStats.length === 0 ? (
                <EmptyState 
                  icon={<BsInfoCircle className="fs-1 text-muted" />} 
                  message="No projects found for the selected filter." 
                />
              ) : (
                <Table hover responsive borderless className="align-middle mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th className="ps-4 py-3">Employee</th>
                      <th className="py-3">Progress</th>
                      <th className="py-3">Status</th>
                      <th className="py-3">Days Left</th>
                      <th className="py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projectStats.map((project, index) => (
                      <tr key={index} className="align-middle">
                        <td className="ps-4 py-3">
                          <div className="d-flex align-items-center">
                            <Avatar name={project.name} color={project.color} />
                            <div className="ms-3">
                              <h6 className="mb-0 fw-semibold">{project.name}</h6>
                              <small className="text-muted">
                                {project.tasks.length} {project.tasks.length === 1 ? "task" : "tasks"}
                              </small>
                            </div>
                          </div>
                        </td>
                        <td className="py-3">
                          <div className="d-flex align-items-center">
                            <div
                              className="progress flex-grow-1"
                              style={{ height: "8px", borderRadius: "10px" }}
                            >
                              <div
                                className={`progress-bar bg-${project.color}`}
                                role="progressbar"
                                style={{ 
                                  width: `${project.progress}%`,
                                  borderRadius: "10px" 
                                }}
                                aria-valuenow={project.progress}
                                aria-valuemin="0"
                                aria-valuemax="100"
                              ></div>
                            </div>
                            <span className="ms-2 fw-semibold">{project.progress}%</span>
                          </div>
                        </td>
                        <td className="py-3">
                          <Badge bg={`${project.color}-subtle`} text={project.color} 
                                 className="px-3 py-2 rounded-pill fw-normal">
                            {project.status}
                          </Badge>
                        </td>
                        <td className="py-3">
                          {project.daysLeft > 0 ? (
                            <span className={`text-${project.daysLeft < 3 ? 'warning' : 'muted'}`}>
                              {project.daysLeft} {project.daysLeft === 1 ? "day" : "days"} left
                            </span>
                          ) : (
                            <span className="text-danger fw-semibold">Overdue</span>
                          )}
                        </td>
                        <td className="py-3">
                          <Link
                            to={`/admin-tasks?assignee=${
                              project.name.split("'")[0]
                            }`}
                            className={`btn btn-sm btn-${project.color} rounded-pill px-3`}
                          >
                            View Tasks
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Card.Body>
          </Card>
        </Col>

        {/* Reminders section */}
        <Col lg={4}>
          <AdminReminders />
        </Col>
      </Row>

      {/* Task Stats with improved visuals */}
      <Row className="mb-4 g-3">
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white border-0 py-3">
              <h5 className="mb-0 fw-bold">Task Status Overview</h5>
            </Card.Header>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                  <h6 className="mb-2 text-muted">Total Progress</h6>
                  <div className="d-flex align-items-baseline">
                    <span className="display-6 fw-bold me-2">{taskStats.completedTasks}</span>
                    <span className="text-muted">
                      / {taskStats.totalTasks} tasks completed
                    </span>
                  </div>
                </div>
                <div>
                  <Button 
                    variant="primary" 
                    as={Link} 
                    to="/admin-tasks"
                    className="rounded-pill px-4 py-2 d-flex align-items-center"
                  >
                    <BsListCheck className="me-2" /> View All Tasks
                  </Button>
                </div>
              </div>

              <div className="mb-4">
                <div className="d-flex justify-content-between mb-2">
                  <div>
                    <Badge bg="primary-subtle" text="primary" className="px-3 py-2 rounded-pill">
                      <BsArrowRepeat className="me-1" /> In Progress: {taskStats.inProgressTasks}
                    </Badge>
                  </div>
                  <div className="fw-semibold">
                    {Math.round(
                      (taskStats.inProgressTasks / taskStats.totalTasks) * 100
                    ) || 0}%
                  </div>
                </div>
                <ProgressBar
                  variant="primary"
                  now={(taskStats.inProgressTasks / taskStats.totalTasks) * 100 || 0}
                  style={{ height: "10px", borderRadius: "10px" }}
                  animated
                />
              </div>

              <div className="mb-4">
                <div className="d-flex justify-content-between mb-2">
                  <div>
                    <Badge bg="success-subtle" text="success" className="px-3 py-2 rounded-pill">
                      <BsCheckCircle className="me-1" /> Completed: {taskStats.completedTasks}
                    </Badge>
                  </div>
                  <div className="fw-semibold">
                    {Math.round(
                      (taskStats.completedTasks / taskStats.totalTasks) * 100
                    ) || 0}%
                  </div>
                </div>
                <ProgressBar
                  variant="success"
                  now={(taskStats.completedTasks / taskStats.totalTasks) * 100 || 0}
                  style={{ height: "10px", borderRadius: "10px" }}
                />
              </div>

              <div>
                <div className="d-flex justify-content-between mb-2">
                  <div>
                    <Badge bg="warning-subtle" text="warning" className="px-3 py-2 rounded-pill">
                      <BsClock className="me-1" /> Pending: {taskStats.pendingTasks}
                    </Badge>
                  </div>
                  <div className="fw-semibold">
                    {Math.round(
                      (taskStats.pendingTasks / taskStats.totalTasks) * 100
                    ) || 0}%
                  </div>
                </div>
                <ProgressBar
                  variant="warning"
                  now={(taskStats.pendingTasks / taskStats.totalTasks) * 100 || 0}
                  style={{ height: "10px", borderRadius: "10px" }}
                />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </DashboardLayout>
  );
};

export default AdminDashboard;