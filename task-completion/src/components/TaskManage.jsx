
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Button, Modal, Form, ListGroup, ProgressBar, Tab, Nav, Tabs } from 'react-bootstrap';
import { FaTrophy, FaTasks, FaCheck, FaClock, FaPlus, FaUserEdit, FaCalendarAlt, FaTag, FaUserCircle } from 'react-icons/fa';

// Admin Dashboard Component
export const AdminTaskManagement = () => {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [fetchedUsers, setFetchedUsers] = useState([]);
  const [taskCounts, setTaskCounts] = useState({ pending: 0, inProgress: 0, completed: 0 });

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentTask(null);
  };

  const handleShowModal = (task = null) => {
    setCurrentTask(task);
    setShowModal(true);
  };

  const handleTaskSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const taskData = {
      title: formData.get('title'),
      description: formData.get('description'),
      assignedTo: Number(formData.get('assignedTo')),
      dueDate: formData.get('dueDate'),
      status: currentTask ? currentTask.status : 'pending',
      priority: formData.get('priority'),
      pointsAwarded: Number(formData.get('pointsAwarded')) || 0,
    };

    try {
      if (currentTask) {
        const response = await fetch(`http://localhost:8080/api/tasks/${currentTask.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(taskData),
        });

        if (!response.ok) {
          throw new Error(`Failed to update task: ${response.statusText}`);
        }

        const updatedTask = await response.json();
        setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
      } else {
        const response = await fetch('http://localhost:8080/api/tasks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(taskData),
        });

        if (!response.ok) {
          throw new Error(`Failed to create task: ${response.statusText}`);
        }

        const newTask = await response.json();
        setTasks([...tasks, newTask]);
      }

      handleCloseModal();
      updateTaskCounts([...tasks, taskData]);
    } catch (error) {
      console.error('Error saving task:', error);
      alert('Failed to save task. Please try again.');
    }
  };

  const updateTaskCounts = (tasksList) => {
    const pending = tasksList.filter(task => task.status === 'pending').length;
    const inProgress = tasksList.filter(task => task.status === 'in_progress').length;
    const completed = tasksList.filter(task => task.status === 'completed').length;
    setTaskCounts({ pending, inProgress, completed });
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/users");
        if (!response.ok) throw new Error("Failed to fetch users");
        const data = await response.json();
        setFetchedUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/tasks');
        if (!response.ok) throw new Error('Failed to fetch tasks');
        const data = await response.json();
        setTasks(data);
        updateTaskCounts(data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <Container fluid className="py-4 px-4">
      <Row className="mb-4">
        <Col>
          <h4 className="fw-bold text-primary">Admin Dashboard</h4>
        </Col>
        <Col xs="auto">
          <Button variant="primary" onClick={() => handleShowModal()}>
            <FaPlus className="me-1" /> Create New Task
          </Button>
        </Col>
      </Row>
      
      <Row className="mb-4">
        <Col md={4}>
          <Card className="border-0 shadow-sm">
            <Card.Body className="d-flex align-items-center">
              <div className="rounded-circle bg-warning bg-opacity-25 p-3 me-3">
                <FaClock className="text-warning" />
              </div>
              <div>
                <div className="small text-muted">Pending</div>
                <h3 className="mb-0">{taskCounts.pending}</h3>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="border-0 shadow-sm">
            <Card.Body className="d-flex align-items-center">
              <div className="rounded-circle bg-primary bg-opacity-25 p-3 me-3">
                <FaTasks className="text-primary" />
              </div>
              <div>
                <div className="small text-muted">In Progress</div>
                <h3 className="mb-0">{taskCounts.inProgress}</h3>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="border-0 shadow-sm">
            <Card.Body className="d-flex align-items-center">
              <div className="rounded-circle bg-success bg-opacity-25 p-3 me-3">
                <FaCheck className="text-success" />
              </div>
              <div>
                <div className="small text-muted">Completed</div>
                <h3 className="mb-0">{taskCounts.completed}</h3>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Card className="border-0 shadow-sm">
        <Card.Body>
          <h5 className="mb-4">All Tasks</h5>
          
          <Tabs className="mb-4 border-bottom-0">
            <Tab eventKey="all" title="All">
              <TaskList 
                tasks={tasks} 
                fetchedUsers={fetchedUsers} 
                handleShowModal={handleShowModal} 
                isAdmin={true}
              />
            </Tab>
            <Tab eventKey="pending" title="Pending">
              <TaskList 
                tasks={tasks.filter(task => task.status === 'pending')} 
                fetchedUsers={fetchedUsers} 
                handleShowModal={handleShowModal} 
                isAdmin={true}
              />
            </Tab>
            <Tab eventKey="inProgress" title="In Progress">
              <TaskList 
                tasks={tasks.filter(task => task.status === 'in_progress')} 
                fetchedUsers={fetchedUsers} 
                handleShowModal={handleShowModal} 
                isAdmin={true}
              />
            </Tab>
            <Tab eventKey="completed" title="Completed">
              <TaskList 
                tasks={tasks.filter(task => task.status === 'completed')} 
                fetchedUsers={fetchedUsers} 
                handleShowModal={handleShowModal} 
                isAdmin={true}
              />
            </Tab>
          </Tabs>
        </Card.Body>
      </Card>

      {/* Task Modal */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton className="border-0">
          <Modal.Title>{currentTask ? 'Edit Task' : 'Create New Task'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleTaskSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Task Title</Form.Label>
              <Form.Control 
                type="text" 
                name="title" 
                required 
                defaultValue={currentTask?.title} 
                placeholder="Enter task title"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control 
                as="textarea" 
                name="description" 
                rows={3} 
                defaultValue={currentTask?.description}
                placeholder="Provide task details"
              />
            </Form.Group>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Assign To</Form.Label>
                  <Form.Select 
                    name="assignedTo" 
                    required
                    defaultValue={currentTask?.assignedTo?.id || ""}
                  >
                    <option value="">Select Employee</option>
                    {fetchedUsers.length > 0 ? (
                      fetchedUsers.map((user) => (
                        <option key={user.id} value={user.id}>
                          {user.name}
                        </option>
                      ))
                    ) : (
                      <option disabled>No employees available</option>
                    )}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Due Date</Form.Label>
                  <Form.Control 
                    type="date" 
                    name="dueDate" 
                    required 
                    defaultValue={currentTask?.dueDate}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Priority</Form.Label>
                  <Form.Select 
                    name="priority" 
                    defaultValue={currentTask?.priority || 'medium'}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Points to Award</Form.Label>
                  <Form.Control
                    type="number"
                    name="pointsAwarded"
                    min="0"
                    max="100"
                    defaultValue={currentTask?.pointsAwarded || 0}
                    placeholder="Enter points"
                  />
                  <Form.Text className="text-muted">
                    Points awarded upon task completion (0-100)
                  </Form.Text>
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer className="border-0">
            <Button variant="light" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              {currentTask ? 'Update Task' : 'Create Task'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
};

// Task List Component (reused by both dashboards)
const TaskList = ({ tasks, fetchedUsers, handleShowModal, isAdmin, handleTaskUpdate }) => {
  return (
    <div className="task-list">
      {tasks.length === 0 ? (
        <div className="text-center text-muted py-5">
          <p>No tasks available.</p>
        </div>
      ) : (
        tasks.map(task => (
          <Card key={task.id} className="mb-3 border-0 shadow-sm">
            <Card.Body>
              <Row>
                <Col md={8}>
                  <div className="d-flex align-items-start">
                    <div 
                      className={`status-indicator rounded-circle me-3 mt-1 ${
                        task.status === 'completed' ? 'bg-success' : 
                        task.status === 'in_progress' ? 'bg-primary' : 'bg-warning'
                      }`}
                      style={{ width: '10px', height: '10px' }}
                    ></div>
                    <div>
                      <h5 className="mb-1">{task.title}</h5>
                      <p className="text-muted mb-2">{task.description}</p>
                      <div className="d-flex flex-wrap gap-3">
                        <span className="d-flex align-items-center text-muted small">
                          <FaCalendarAlt className="me-1" />
                          {new Date(task.dueDate).toLocaleDateString()}
                        </span>
                        <span className="d-flex align-items-center text-muted small">
                          <FaTag className="me-1" />
                          {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                        </span>
                        <span className="d-flex align-items-center text-muted small">
                          <FaUserCircle className="me-1" />
                          {(() => {
                            const assignedUser = fetchedUsers.find(
                              (user) => Number(user.id) === Number(task.assignedTo?.id)
                            );
                            return assignedUser ? String(assignedUser.name) : "Unassigned";
                          })()}
                        </span>
                        {task.pointsAwarded > 0 && (
                          <span className="d-flex align-items-center text-muted small">
                            <FaTrophy className="me-1 text-warning" />
                            {task.pointsAwarded} Points
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Col>
                <Col md={4} className="d-flex align-items-center justify-content-end">
                  <div className="d-flex gap-2">
                    {isAdmin ? (
                      <Button 
                        variant="outline-primary" 
                        size="sm" 
                        onClick={() => handleShowModal(task)}
                      >
                        Edit
                      </Button>
                    ) : (
                      <>
                        {task.status === 'pending' && (
                          <Button 
                            variant="outline-primary" 
                            size="sm" 
                            onClick={() => handleTaskUpdate(task.id, 'in_progress')}
                          >
                            Mark as In Progress
                          </Button>
                        )}
                        {task.status !== 'completed' && (
                          <Button 
                            variant="outline-success" 
                            size="sm" 
                            onClick={() => handleTaskUpdate(task.id, 'completed')}
                          >
                            Mark as Completed
                          </Button>
                        )}
                      </>
                    )}
                    <Badge 
                      bg={
                        task.status === 'completed' ? 'success' : 
                        task.status === 'in_progress' ? 'primary' : 'warning'
                      }
                      className="d-flex align-items-center px-3"
                    >
                      {task.status === 'completed' ? 'Completed' : 
                      task.status === 'in_progress' ? 'In Progress' : 'Pending'}
                    </Badge>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        ))
      )}
    </div>
  );
};

// Employee Dashboard Component
export const EmployeeDashboard = ({ userId }) => {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showTaskDetail, setShowTaskDetail] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [taskCounts, setTaskCounts] = useState({ pending: 0, inProgress: 0, completed: 0 });

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        // Fetch all data in parallel
        const [userResponse, tasksResponse, allUsersResponse] = await Promise.all([
          fetch(`http://localhost:8080/api/users/${userId}`),
          fetch(`http://localhost:8080/api/tasks/user/${userId}`),
          fetch(`http://localhost:8080/api/users`)
        ]);

        if (!userResponse.ok) throw new Error('Failed to fetch user data');
        if (!tasksResponse.ok) throw new Error('Failed to fetch tasks');
        if (!allUsersResponse.ok) throw new Error('Failed to fetch users');

        const [userData, tasksData, allUsersData] = await Promise.all([
          userResponse.json(),
          tasksResponse.json(),
          allUsersResponse.json()
        ]);

        setUser(userData);
        setTasks(tasksData);
        setAllUsers(allUsersData);
        
        const pending = tasksData.filter(t => t.status === 'pending').length;
        const inProgress = tasksData.filter(t => t.status === 'in_progress').length;
        const completed = tasksData.filter(t => t.status === 'completed').length;
        setTaskCounts({ pending, inProgress, completed });
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [userId]);

  const handleCloseDetail = () => {
    setShowTaskDetail(false);
    setSelectedTask(null);
  };

  const handleTaskUpdate = async (taskId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:8080/api/tasks/${taskId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to update task status");
      }
  
      const updatedTask = await response.json();
  
      // Update task list in state
      const updatedTasks = tasks.map(task => (task.id === updatedTask.id ? updatedTask : task));
      setTasks(updatedTasks);
      
      // Update task counts
      const pending = updatedTasks.filter(t => t.status === 'pending').length;
      const inProgress = updatedTasks.filter(t => t.status === 'in_progress').length;
      const completed = updatedTasks.filter(t => t.status === 'completed').length;
      setTaskCounts({ pending, inProgress, completed });
  
      // Close the modal after update
      handleCloseDetail();
    } catch (error) {
      console.error("Error updating task:", error);
      alert("Error updating task. Please try again.");
    }
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </Container>
    );
  }

  if (!user) {
    return (
      <Container className="py-5">
        <div className="alert alert-danger" role="alert">
          Error loading user data. Please try again later.
        </div>
      </Container>
    );
  }

  // Get upcoming deadlines
  const upcomingDeadlines = [...tasks]
    .filter(t => t.status !== 'completed')
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    .slice(0, 3);

  return (
    <Container fluid className="py-4 px-4">
      <Row className="mb-4">
        <Col>
          <h4 className="fw-bold text-primary">
            Welcome, {user.name}!
          </h4>
        </Col>
        <Col xs="auto">
          <div className="d-flex align-items-center">
            <FaTrophy className="text-warning me-2" size={18} />
            <h5 className="mb-0">{user.points || 0} Points</h5>
          </div>
        </Col>
      </Row>
      
      <Row className="mb-4">
        <Col md={4}>
          <Card className="border-0 shadow-sm">
            <Card.Body className="d-flex align-items-center">
              <div className="rounded-circle bg-warning bg-opacity-25 p-3 me-3">
                <FaClock className="text-warning" />
              </div>
              <div>
                <div className="small text-muted">Pending</div>
                <h3 className="mb-0">{taskCounts.pending}</h3>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="border-0 shadow-sm">
            <Card.Body className="d-flex align-items-center">
              <div className="rounded-circle bg-primary bg-opacity-25 p-3 me-3">
                <FaTasks className="text-primary" />
              </div>
              <div>
                <div className="small text-muted">In Progress</div>
                <h3 className="mb-0">{taskCounts.inProgress}</h3>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="border-0 shadow-sm">
            <Card.Body className="d-flex align-items-center">
              <div className="rounded-circle bg-success bg-opacity-25 p-3 me-3">
                <FaCheck className="text-success" />
              </div>
              <div>
                <div className="small text-muted">Completed</div>
                <h3 className="mb-0">{taskCounts.completed}</h3>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Row>
        <Col md={8}>
          <Card className="border-0 shadow-sm mb-4">
            <Card.Body>
              <h5 className="mb-4">All Tasks</h5>
              
              <Tabs className="mb-4 border-bottom-0">
                <Tab eventKey="all" title="All">
                  <TaskList 
                    tasks={tasks} 
                    fetchedUsers={allUsers} 
                    handleTaskUpdate={handleTaskUpdate} 
                    isAdmin={false}
                  />
                </Tab>
                <Tab eventKey="pending" title="Pending">
                  <TaskList 
                    tasks={tasks.filter(task => task.status === 'pending')} 
                    fetchedUsers={allUsers} 
                    handleTaskUpdate={handleTaskUpdate} 
                    isAdmin={false}
                  />
                </Tab>
                <Tab eventKey="inProgress" title="In Progress">
                  <TaskList 
                    tasks={tasks.filter(task => task.status === 'in_progress')} 
                    fetchedUsers={allUsers} 
                    handleTaskUpdate={handleTaskUpdate} 
                    isAdmin={false}
                  />
                </Tab>
                <Tab eventKey="completed" title="Completed">
                  <TaskList 
                    tasks={tasks.filter(task => task.status === 'completed')} 
                    fetchedUsers={allUsers} 
                    handleTaskUpdate={handleTaskUpdate} 
                    isAdmin={false}
                  />
                </Tab>
              </Tabs>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4}>
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <h5 className="mb-4">Upcoming Deadlines</h5>
              
              {upcomingDeadlines.length === 0 ? (
                <div className="text-center text-muted py-4">
                  <p>No upcoming deadlines</p>
                </div>
              ) : (
                upcomingDeadlines.map(task => {
                  const dueDate = new Date(task.dueDate);
                  const today = new Date();
                  const daysLeft = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
                  const isUrgent = daysLeft <= 2;
                  
                  return (
                    <div key={task.id} className="mb-3 pb-3 border-bottom">
                      <h6 className="mb-1">{task.title}</h6>
                      <div className={`small ${isUrgent ? "text-danger" : "text-muted"}`}>
                        <FaClock className="me-1" />
                        {daysLeft <= 0 ? "Due today!" : `${daysLeft} day${daysLeft !== 1 ? 's' : ''} left`}
                      </div>
                    </div>
                  );
                })
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Task Detail Modal */}
      <Modal show={showTaskDetail} onHide={handleCloseDetail}>
        <Modal.Header closeButton className="border-0">
          <Modal.Title>Task Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedTask && (
            <>
              <h5>{selectedTask.title}</h5>
              <p>{selectedTask.description}</p>

              <div className="mb-3">
                <strong>Due Date:</strong> {new Date(selectedTask.dueDate).toLocaleDateString()}
              </div>

              <div className="mb-3">
                <strong>Priority:</strong>{' '}
                <Badge bg={
                  selectedTask.priority === 'high' ? 'danger' :
                  selectedTask.priority === 'medium' ? 'warning' : 'info'
                }>
                  {selectedTask.priority.charAt(0).toUpperCase() + selectedTask.priority.slice(1)}
                </Badge>
              </div>

              <div className="mb-3">
                <strong>Status:</strong>{' '}
                <Badge bg={
                  selectedTask.status === 'completed' ? 'success' :
                  selectedTask.status === 'in_progress' ? 'primary' : 'warning'
                }>
                  {selectedTask.status === 'completed' ? 'Completed' :
                    selectedTask.status === 'in_progress' ? 'In Progress' : 'Pending'}
                </Badge>
              </div>

              {selectedTask.status === 'completed' && (
                <div className="mb-3">
                  <strong>Points Earned:</strong>{' '}
                  <Badge bg="success">{selectedTask.pointsAwarded} points</Badge>
                </div>
              )}
            </>
          )}
        </Modal.Body>
        <Modal.Footer className="border-0">
          {selectedTask && selectedTask.status !== 'completed' && (
            <>
              {selectedTask.status === 'pending' && (
                <Button 
                  variant="outline-primary" 
                  onClick={() => handleTaskUpdate(selectedTask.id, 'in_progress')}
                >
                  Mark as In Progress
                </Button>
              )}
              {selectedTask.status !== 'completed' && (
                <Button 
                  variant="outline-success" 
                  onClick={() => handleTaskUpdate(selectedTask.id, 'completed')}
                >
                  <FaCheck className="me-1" /> Mark as Completed
                </Button>
              )}
            </>
          )}
          <Button variant="secondary" onClick={handleCloseDetail}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

// Main App Component
const TaskManagementApp = () => {
  const [viewMode, setViewMode] = useState('employee');
  const [userId, setUserId] = useState(1); // Default to user ID 1

  return (
    <div className="task-management-app bg-light min-vh-100">
      <nav className="navbar navbar-expand navbar-light bg-white shadow-sm">
        <div className="container-fluid px-4">
          <a className="navbar-brand d-flex align-items-center" href="#">
            <span className="text-primary fw-bold">Achieve+</span>
          </a>
          
          <div className="d-flex align-items-center ms-auto">
            <div className="btn-group me-3">
              <Button 
                variant={viewMode === 'admin' ? 'primary' : 'light'} 
                className="me-2"
                onClick={() => setViewMode('admin')}
              >
                Admin View
              </Button>
              <Button 
                variant={viewMode === 'employee' ? 'primary' : 'light'}
                onClick={() => setViewMode('employee')}
              >
                Employee View
              </Button>
            </div>
            
            <div className="d-flex align-items-center">
              <div className="me-3 text-end">
                <div className="small fw-bold">Admin User</div>
                <div className="small text-muted">Admin</div>
              </div>
              <Button variant="light" className="border">
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>
      
      {viewMode === 'admin' ? (
        <AdminTaskManagement />
      ) : (
        <EmployeeDashboard userId={userId} />
      )}
    </div>
  );
};

export default TaskManagementApp;
















