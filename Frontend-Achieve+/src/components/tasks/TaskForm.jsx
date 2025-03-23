import React, { useState, useEffect } from 'react';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import { createTask } from '../../api/tasks';
import { getAllUsers } from '../../api/users';

const TaskForm = ({ onTaskCreated }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    points: '',
    assignedTo: ''
  });
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [employeesLoading, setEmployeesLoading] = useState(true);
  const [employeesError, setEmployeesError] = useState('');

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      setEmployeesLoading(true);
      setEmployeesError('');
      
      console.log('Fetching users for employee dropdown...');
      const response = await getAllUsers();
      console.log('Raw users response:', response);
      
      if (!Array.isArray(response)) {
        console.error('Response is not an array:', response);
        setEmployeesError('Invalid data format received');
        setEmployees([]);
        return;
      }
      
      console.log('Filtering for employees from users:', response);
      
      // Filter for employees and log each user's role for debugging
      response.forEach(currentUser => {
        console.log(`User ${currentUser.email} has role: ${currentUser.role}`);
      });
      
      const employeesList = response
        .filter(currentUser => {
          // Check for different role formats
          const isEmployee = 
            currentUser.role === 'ROLE_EMPLOYEE' || 
            currentUser.role === 'Employee' || 
            currentUser.role === 'EMPLOYEE';
          
          console.log(`User ${currentUser.email} isEmployee: ${isEmployee}`);
          return isEmployee;
        })
        .map(user => ({
          id: user.id,
          name: user.fullName || `${user.firstName || ''} ${user.lastName || ''}`.trim(),
          email: user.email
        }));
      
      console.log('Filtered employees:', employeesList);
      
      if (employeesList.length === 0) {
        console.warn('No employees found after filtering');
        setEmployeesError('No employees available');
      } else {
        console.log(`Found ${employeesList.length} employees`);
        setEmployeesError('');
      }
      
      setEmployees(employeesList);
    } catch (err) {
      console.error('Error in fetchEmployees:', err);
      setEmployeesError(err?.message || 'Failed to load employees');
      setEmployees([]);
    } finally {
      setEmployeesLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      const taskData = {
        ...formData,
        points: parseInt(formData.points, 10)
      };
      
      const newTask = await createTask(taskData);
      
      // Add a check before calling onTaskCreated
      if (typeof onTaskCreated === 'function') {
        onTaskCreated(newTask);
      }
      
      setSuccessMessage('Task created successfully!');
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        dueDate: '',
        points: '',
        assignedTo: ''
      });
    } catch (err) {
      setError('Failed to create task. Please try again.');
      console.error('Error creating task:', err);
    } finally {
      setLoading(false);
    }
  };

  if (employeesLoading && !employees.length) {
    return (
      <div className="text-center p-3">
        <Spinner animation="border" size="sm" />
        <span className="ms-2">Loading employees...</span>
      </div>
    );
  }

  return (
    <Form onSubmit={handleSubmit}>
      {error && <Alert variant="danger" className="mb-3">{error}</Alert>}
      {successMessage && <Alert variant="success" className="mb-3">{successMessage}</Alert>}
      {employeesError && <Alert variant="warning" className="mb-3">{employeesError}</Alert>}
      
      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter task title"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter task description"
          rows={3}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Due Date</Form.Label>
        <Form.Control
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Points</Form.Label>
        <Form.Control
          type="number"
          name="points"
          value={formData.points}
          onChange={handleChange}
          placeholder="Enter points value"
          min="0"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Assign To</Form.Label>
        {employeesLoading ? (
          <div className="d-flex align-items-center">
            <Spinner animation="border" size="sm" />
            <span className="ms-2">Loading employees...</span>
          </div>
        ) : (
          <>
            <Form.Select
              name="assignedTo"
              value={formData.assignedTo}
              onChange={handleChange}
              required
              isInvalid={!!employeesError && employees.length === 0}
            >
              <option value="">Select an employee</option>
              {employees.length > 0 ? (
                employees.map(employee => (
                  <option key={employee.id} value={employee.id}>
                    {employee.name} ({employee.email})
                  </option>
                ))
              ) : (
                <option value="" disabled>No employees available</option>
              )}
            </Form.Select>
            {employeesError && employees.length === 0 && (
              <Form.Control.Feedback type="invalid">
                {employeesError}
              </Form.Control.Feedback>
            )}
          </>
        )}
      </Form.Group>

      <div className="d-grid">
        <Button 
          variant="primary" 
          type="submit"
          disabled={loading || (employees.length === 0 && !employeesLoading)}
        >
          {loading ? (
            <>
              <Spinner animation="border" size="sm" className="me-2" />
              Creating Task...
            </>
          ) : (
            'Create Task'
          )}
        </Button>
      </div>
    </Form>
  );
};

export default TaskForm;















































//TEST
// import React, { useState, useEffect } from 'react';
// import { Form, Button, Alert, Spinner } from 'react-bootstrap';
// import { createTask } from '../../api/tasks';
// import { getEmployees } from '../../api/users';

// const TaskForm = ({ onTaskCreated }) => {
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     dueDate: '',
//     points: '',
//     assignedTo: ''
//   });
//   const [employees, setEmployees] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [employeesLoading, setEmployeesLoading] = useState(true);
//   const [employeesError, setEmployeesError] = useState('');

//   useEffect(() => {
//     fetchEmployees();
//   }, []);

//   const fetchEmployees = async () => {
//     try {
//       setEmployeesLoading(true);
//       setEmployeesError('');
      
//       console.log('Fetching employees...');
//       const employeesList = await getEmployees();
//       console.log('Employees list:', employeesList);
      
//       if (employeesList.length === 0) {
//         console.warn('No employees found');
//         setEmployeesError('No employees available');
//       } else {
//         console.log(`Found ${employeesList.length} employees`);
//         setEmployeesError('');
//       }
      
//       setEmployees(employeesList);
//     } catch (err) {
//       console.error('Error in fetchEmployees:', err);
//       setEmployeesError(err.message || 'Failed to load employees');
//       setEmployees([]);
//     } finally {
//       setEmployeesLoading(false);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     try {
//       const taskData = {
//         ...formData,
//         points: parseInt(formData.points, 10)
//       };
      
//       const newTask = await createTask(taskData);
//       onTaskCreated(newTask);
      
//       // Reset form
//       setFormData({
//         title: '',
//         description: '',
//         dueDate: '',
//         points: '',
//         assignedTo: ''
//       });
//     } catch (err) {
//       setError('Failed to create task. Please try again.');
//       console.error('Error creating task:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (employeesLoading) {
//     return (
//       <div className="text-center p-3">
//         <Spinner animation="border" size="sm" />
//         <span className="ms-2">Loading employees...</span>
//       </div>
//     );
//   }

//   return (
//     <Form onSubmit={handleSubmit}>
//       {error && <Alert variant="danger" className="mb-3">{error}</Alert>}
//       {employeesError && <Alert variant="warning" className="mb-3">{employeesError}</Alert>}
      
//       <Form.Group className="mb-3">
//         <Form.Label>Title</Form.Label>
//         <Form.Control
//           type="text"
//           name="title"
//           value={formData.title}
//           onChange={handleChange}
//           placeholder="Enter task title"
//           required
//         />
//       </Form.Group>

//       <Form.Group className="mb-3">
//         <Form.Label>Description</Form.Label>
//         <Form.Control
//           as="textarea"
//           name="description"
//           value={formData.description}
//           onChange={handleChange}
//           placeholder="Enter task description"
//           rows={3}
//           required
//         />
//       </Form.Group>

//       <Form.Group className="mb-3">
//         <Form.Label>Due Date</Form.Label>
//         <Form.Control
//           type="date"
//           name="dueDate"
//           value={formData.dueDate}
//           onChange={handleChange}
//           required
//         />
//       </Form.Group>

//       <Form.Group className="mb-3">
//         <Form.Label>Points</Form.Label>
//         <Form.Control
//           type="number"
//           name="points"
//           value={formData.points}
//           onChange={handleChange}
//           placeholder="Enter points value"
//           min="0"
//           required
//         />
//       </Form.Group>

//       <Form.Group className="mb-3">
//         <Form.Label>Assign To</Form.Label>
//         <Form.Select
//           name="assignedTo"
//           value={formData.assignedTo}
//           onChange={handleChange}
//           required
//         >
//           <option value="">Select an employee</option>
//           {employees.length > 0 ? (
//             employees.map(employee => (
//               <option key={employee.id} value={employee.id}>
//                 {employee.name} ({employee.email})
//               </option>
//             ))
//           ) : (
//             <option value="" disabled>No employees available</option>
//           )}
//         </Form.Select>
//         {employeesError && (
//           <Form.Text className="text-danger">
//             {employeesError}
//           </Form.Text>
//         )}
//       </Form.Group>

//       <div className="d-grid">
//         <Button 
//           variant="primary" 
//           type="submit"
//           disabled={loading}
//         >
//           {loading ? (
//             <>
//               <Spinner animation="border" size="sm" className="me-2" />
//               Creating Task...
//             </>
//           ) : (
//             'Create Task'
//           )}
//         </Button>
//       </div>
//     </Form>
//   );
// };

// export default TaskForm;


















































// import React, { useState, useEffect } from 'react';
// import { Form, Button, Alert, Spinner, InputGroup, FormControl, ListGroup } from 'react-bootstrap';
// import { createTask } from '../../api/tasks';
// import { getAllUsers } from '../../api/users';

// const TaskForm = ({ onTaskCreated }) => {
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     dueDate: '',
//     points: '',
//     assignedTo: ''
//   });
//   const [employees, setEmployees] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [employeesLoading, setEmployeesLoading] = useState(true);
//   const [employeesError, setEmployeesError] = useState('');
  
//   // For searchable dropdown
//   const [searchTerm, setSearchTerm] = useState('');
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [selectedEmployee, setSelectedEmployee] = useState(null);

//   useEffect(() => {
//     fetchEmployees();
//   }, []);

//   const fetchEmployees = async () => {
//     try {
//       setEmployeesLoading(true);
//       setEmployeesError('');
      
//       console.log('Fetching users for employee dropdown...');
//       const response = await getAllUsers();
//       console.log('Raw users response:', response);
      
//       if (!Array.isArray(response)) {
//         console.error('Response is not an array:', response);
//         setEmployeesError('Invalid data format received');
//         setEmployees([]);
//         return;
//       }
      
//       console.log('Filtering for employees from users:', response);
      
//       // Filter for employees and log each user's role for debugging
//       response.forEach(user => {
//         console.log(`User ${user.email} has role: ${user.role}`);
//       });
      
//       const employeesList = response
//         .filter(user => {
//           // Check for different role formats
//           const isEmployee = 
//             user.role === 'ROLE_EMPLOYEE' || 
//             user.role === 'Employee' || 
//             user.role === 'EMPLOYEE';
          
//           console.log(`User ${user.email} isEmployee: ${isEmployee}`);
//           return isEmployee;
//         })
//         .map(user => ({
//           id: user.id,
//           name: user.fullName || `${user.firstName || ''} ${user.lastName || ''}`.trim(),
//           email: user.email
//         }));
      
//       console.log('Filtered employees:', employeesList);
      
//       if (employeesList.length === 0) {
//         console.warn('No employees found after filtering');
//         setEmployeesError('No employees available');
//       } else {
//         console.log(`Found ${employeesList.length} employees`);
//         setEmployeesError('');
//       }
      
//       setEmployees(employeesList);
//     } catch (err) {
//       console.error('Error in fetchEmployees:', err);
//       setEmployeesError(err.message || 'Failed to load employees');
//       setEmployees([]);
//     } finally {
//       setEmployeesLoading(false);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     try {
//       const taskData = {
//         ...formData,
//         points: parseInt(formData.points, 10)
//       };
      
//       const newTask = await createTask(taskData);
//       onTaskCreated(newTask);
      
//       // Reset form
//       setFormData({
//         title: '',
//         description: '',
//         dueDate: '',
//         points: '',
//         assignedTo: ''
//       });
//       setSelectedEmployee(null);
//       setSearchTerm('');
//     } catch (err) {
//       setError('Failed to create task. Please try again.');
//       console.error('Error creating task:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Filter employees based on search term
//   const filteredEmployees = employees.filter(employee => 
//     employee.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
//     employee.email.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // Handle employee selection
//   const handleSelectEmployee = (employee) => {
//     setSelectedEmployee(employee);
//     setFormData(prev => ({
//       ...prev,
//       assignedTo: employee.id
//     }));
//     setSearchTerm(employee.name);
//     setShowDropdown(false);
//   };

//   // Handle search input change
//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//     setShowDropdown(true);
    
//     // If the search field is cleared, also clear the selected employee
//     if (e.target.value === '') {
//       setSelectedEmployee(null);
//       setFormData(prev => ({
//         ...prev,
//         assignedTo: ''
//       }));
//     }
//   };

//   if (employeesLoading) {
//     return (
//       <div className="text-center p-3">
//         <Spinner animation="border" size="sm" />
//         <span className="ms-2">Loading employees...</span>
//       </div>
//     );
//   }

//   return (
//     <Form onSubmit={handleSubmit}>
//       {error && <Alert variant="danger" className="mb-3">{error}</Alert>}
//       {employeesError && <Alert variant="warning" className="mb-3">{employeesError}</Alert>}
      
//       <Form.Group className="mb-3">
//         <Form.Label>Title</Form.Label>
//         <Form.Control
//           type="text"
//           name="title"
//           value={formData.title}
//           onChange={handleChange}
//           placeholder="Enter task title"
//           required
//         />
//       </Form.Group>

//       <Form.Group className="mb-3">
//         <Form.Label>Description</Form.Label>
//         <Form.Control
//           as="textarea"
//           name="description"
//           value={formData.description}
//           onChange={handleChange}
//           placeholder="Enter task description"
//           rows={3}
//           required
//         />
//       </Form.Group>

//       <Form.Group className="mb-3">
//         <Form.Label>Due Date</Form.Label>
//         <Form.Control
//           type="date"
//           name="dueDate"
//           value={formData.dueDate}
//           onChange={handleChange}
//           required
//         />
//       </Form.Group>

//       <Form.Group className="mb-3">
//         <Form.Label>Points</Form.Label>
//         <Form.Control
//           type="number"
//           name="points"
//           value={formData.points}
//           onChange={handleChange}
//           placeholder="Enter points value"
//           min="0"
//           required
//         />
//       </Form.Group>

//       <Form.Group className="mb-3">
//         <Form.Label>Assign To</Form.Label>
//         <div className="position-relative">
//           <InputGroup>
//             <FormControl
//               placeholder="Search for an employee..."
//               value={searchTerm}
//               onChange={handleSearchChange}
//               onFocus={() => setShowDropdown(true)}
//               onBlur={() => {
//                 // Delay hiding dropdown to allow for selection
//                 setTimeout(() => setShowDropdown(false), 200);
//               }}
//               required
//               isInvalid={!formData.assignedTo && searchTerm}
//             />
//           </InputGroup>
          
//           {showDropdown && searchTerm && filteredEmployees.length > 0 && (
//             <ListGroup 
//               className="position-absolute w-100 shadow-sm" 
//               style={{ zIndex: 1000, maxHeight: '200px', overflowY: 'auto' }}
//             >
//               {filteredEmployees.map(employee => (
//                 <ListGroup.Item 
//                   key={employee.id}
//                   action
//                   onClick={() => handleSelectEmployee(employee)}
//                   className="d-flex justify-content-between align-items-center"
//                 >
//                   <div>
//                     <strong>{employee.name}</strong>
//                     <div className="text-muted small">{employee.email}</div>
//                   </div>
//                 </ListGroup.Item>
//               ))}
//             </ListGroup>
//           )}
          
//           {showDropdown && searchTerm && filteredEmployees.length === 0 && (
//             <ListGroup className="position-absolute w-100 shadow-sm" style={{ zIndex: 1000 }}>
//               <ListGroup.Item className="text-muted">
//                 No employees found matching "{searchTerm}"
//               </ListGroup.Item>
//             </ListGroup>
//           )}
//         </div>
        
//         {selectedEmployee && (
//           <div className="mt-2 p-2 bg-light rounded">
//             <small>
//               Selected: <strong>{selectedEmployee.name}</strong> ({selectedEmployee.email})
//             </small>
//           </div>
//         )}
//       </Form.Group>

//       <div className="d-grid">
//         <Button 
//           variant="primary" 
//           type="submit"
//           disabled={loading || !formData.assignedTo}
//         >
//           {loading ? (
//             <>
//               <Spinner animation="border" size="sm" className="me-2" />
//               Creating Task...
//             </>
//           ) : (
//             'Create Task'
//           )}
//         </Button>
//       </div>
//     </Form>
//   );
// };

// export default TaskForm;


//Manually added employee name  task form
// import React, { useState, useEffect } from 'react';
// import { Form, Button, Alert, Spinner, InputGroup, FormControl, ListGroup } from 'react-bootstrap';
// import { createTask } from '../../api/tasks';
// import { getAllUsers } from '../../api/users';

// const TaskForm = ({ onTaskCreated }) => {
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     dueDate: '',
//     points: '',
//     assignedTo: ''
//   });
//   const [employees, setEmployees] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [employeesLoading, setEmployeesLoading] = useState(true);
//   const [employeesError, setEmployeesError] = useState('');
  
//   // For searchable dropdown
//   const [searchTerm, setSearchTerm] = useState('');
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [selectedEmployee, setSelectedEmployee] = useState(null);

//   useEffect(() => {
//     fetchEmployees();
//   }, []);

//   const fetchEmployees = async () => {
//     try {
//       setEmployeesLoading(true);
//       setEmployeesError('');
      
//       console.log('Fetching users for employee dropdown...');
//       const response = await getAllUsers();
//       console.log('Raw users response:', response);
      
//       if (!Array.isArray(response)) {
//         console.error('Response is not an array:', response);
//         setEmployeesError('Invalid data format received');
//         setEmployees([]);
//         return;
//       }
      
//       // Inspect the first user to understand the data structure
//       if (response.length > 0) {
//         console.log('Sample user data structure:', JSON.stringify(response[0], null, 2));
//       }
      
//       // More flexible filtering logic - accept any user that might be an employee
//       const employeesList = response
//         .filter(user => {
//           // Check for common role formats with more permissive logic
//           const role = String(user.role || '').toLowerCase();
//           const isEmployee = 
//             role.includes('employee') || 
//             role === 'user' || // Sometimes regular users are employees
//             // If role is not specified, check if other employee-specific fields exist
//             (!role && (user.department || user.position || user.employeeId));
            
//           console.log(`User ${user.email || user.username || 'unknown'} isEmployee: ${isEmployee} (role: ${user.role || 'none'})`);
//           return isEmployee;
//         })
//         .map(user => {
//           // More robust name construction logic
//           let name = '';
          
//           // Try different name field combinations
//           if (user.fullName) {
//             name = user.fullName;
//           } else if (user.firstName || user.lastName) {
//             name = `${user.firstName || ''} ${user.lastName || ''}`.trim();
//           } else if (user.name) {
//             name = user.name;
//           } else if (user.displayName) {
//             name = user.displayName;
//           } else if (user.username) {
//             name = user.username;
//           } else if (user.email) {
//             // Use email prefix as fallback
//             name = user.email.split('@')[0];
//           } else {
//             name = `User ${user.id || 'unknown'}`;
//           }
          
//           return {
//             id: user.id || user._id, // Handle different ID fields
//             name: name,
//             email: user.email || 'No email available',
//             // Include original data for debugging
//             originalData: user
//           };
//         });
      
//       console.log('Processed employees:', employeesList);
      
//       if (employeesList.length === 0) {
//         console.warn('No employees found after filtering');
//         setEmployeesError('No employees available - check user role configuration');
//       } else {
//         console.log(`Found ${employeesList.length} employees`);
//         setEmployeesError('');
//       }
      
//       setEmployees(employeesList);
//     } catch (err) {
//       console.error('Error in fetchEmployees:', err);
//       setEmployeesError(err.message || 'Failed to load employees');
//       setEmployees([]);
//     } finally {
//       setEmployeesLoading(false);
//     }
//   };

//   // Option to manually add an employee if needed
//   const handleAddEmployee = () => {
//     // Show a simple form to add employee
//     const email = prompt("Enter employee email:");
//     if (!email) return;
    
//     const name = prompt("Enter employee name:");
//     if (!name) return;
    
//     const id = prompt("Enter employee ID:");
//     if (!id) return;
    
//     const newEmployee = { id, name, email };
//     setEmployees(prev => [...prev, newEmployee]);
    
//     // Auto-select the newly added employee
//     handleSelectEmployee(newEmployee);
    
//     console.log('Manually added employee:', newEmployee);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     try {
//       const taskData = {
//         ...formData,
//         points: parseInt(formData.points, 10)
//       };
      
//       console.log('Submitting task with data:', taskData);
//       const newTask = await createTask(taskData);
//       console.log('Task created successfully:', newTask);
      
//       onTaskCreated(newTask);
      
//       // Reset form
//       setFormData({
//         title: '',
//         description: '',
//         dueDate: '',
//         points: '',
//         assignedTo: ''
//       });
//       setSelectedEmployee(null);
//       setSearchTerm('');
//     } catch (err) {
//       setError('Failed to create task. Please try again.');
//       console.error('Error creating task:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Filter employees based on search term
//   const filteredEmployees = employees.filter(employee => 
//     employee.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
//     employee.email.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // Handle employee selection
//   const handleSelectEmployee = (employee) => {
//     setSelectedEmployee(employee);
//     setFormData(prev => ({
//       ...prev,
//       assignedTo: employee.id
//     }));
//     setSearchTerm(employee.name);
//     setShowDropdown(false);
//   };

//   // Handle search input change
//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//     setShowDropdown(true);
    
//     // If the search field is cleared, also clear the selected employee
//     if (e.target.value === '') {
//       setSelectedEmployee(null);
//       setFormData(prev => ({
//         ...prev,
//         assignedTo: ''
//       }));
//     }
//   };

//   if (employeesLoading) {
//     return (
//       <div className="text-center p-3">
//         <Spinner animation="border" size="sm" />
//         <span className="ms-2">Loading employees...</span>
//       </div>
//     );
//   }

//   return (
//     <Form onSubmit={handleSubmit}>
//       {error && <Alert variant="danger" className="mb-3">{error}</Alert>}
//       {employeesError && (
//         <Alert variant="warning" className="mb-3">
//           {employeesError}
//           <div className="mt-2">
//             <Button 
//               variant="outline-secondary" 
//               size="sm" 
//               onClick={fetchEmployees}
//             >
//               Retry
//             </Button>
//             {' '}
//             <Button 
//               variant="outline-primary" 
//               size="sm" 
//               onClick={handleAddEmployee}
//             >
//               Add Employee Manually
//             </Button>
//           </div>
//         </Alert>
//       )}
      
//       <Form.Group className="mb-3">
//         <Form.Label>Title</Form.Label>
//         <Form.Control
//           type="text"
//           name="title"
//           value={formData.title}
//           onChange={handleChange}
//           placeholder="Enter task title"
//           required
//         />
//       </Form.Group>

//       <Form.Group className="mb-3">
//         <Form.Label>Description</Form.Label>
//         <Form.Control
//           as="textarea"
//           name="description"
//           value={formData.description}
//           onChange={handleChange}
//           placeholder="Enter task description"
//           rows={3}
//           required
//         />
//       </Form.Group>

//       <Form.Group className="mb-3">
//         <Form.Label>Due Date</Form.Label>
//         <Form.Control
//           type="date"
//           name="dueDate"
//           value={formData.dueDate}
//           onChange={handleChange}
//           required
//         />
//       </Form.Group>

//       <Form.Group className="mb-3">
//         <Form.Label>Points</Form.Label>
//         <Form.Control
//           type="number"
//           name="points"
//           value={formData.points}
//           onChange={handleChange}
//           placeholder="Enter points value"
//           min="0"
//           required
//         />
//       </Form.Group>

//       <Form.Group className="mb-3">
//         <Form.Label>Assign To</Form.Label>
//         <div className="position-relative">
//           <InputGroup>
//             <FormControl
//               placeholder="Search for an employee..."
//               value={searchTerm}
//               onChange={handleSearchChange}
//               onFocus={() => setShowDropdown(true)}
//               onBlur={() => {
//                 // Delay hiding dropdown to allow for selection
//                 setTimeout(() => setShowDropdown(false), 200);
//               }}
//               required
//               isInvalid={!formData.assignedTo && searchTerm}
//             />
//             <Button 
//               variant="outline-secondary"
//               onClick={handleAddEmployee}
//               title="Add employee manually"
//             >
//               +
//             </Button>
//           </InputGroup>
          
//           {showDropdown && searchTerm && filteredEmployees.length > 0 && (
//             <ListGroup 
//               className="position-absolute w-100 shadow-sm" 
//               style={{ zIndex: 1000, maxHeight: '200px', overflowY: 'auto' }}
//             >
//               {filteredEmployees.map(employee => (
//                 <ListGroup.Item 
//                   key={employee.id}
//                   action
//                   onClick={() => handleSelectEmployee(employee)}
//                   className="d-flex justify-content-between align-items-center"
//                 >
//                   <div>
//                     <strong>{employee.name}</strong>
//                     <div className="text-muted small">{employee.email}</div>
//                   </div>
//                 </ListGroup.Item>
//               ))}
//             </ListGroup>
//           )}
          
//           {showDropdown && searchTerm && filteredEmployees.length === 0 && (
//             <ListGroup className="position-absolute w-100 shadow-sm" style={{ zIndex: 1000 }}>
//               <ListGroup.Item className="text-muted">
//                 No employees found matching "{searchTerm}"
//               </ListGroup.Item>
//             </ListGroup>
//           )}
//         </div>
        
//         {selectedEmployee && (
//           <div className="mt-2 p-2 bg-light rounded">
//             <small>
//               Selected: <strong>{selectedEmployee.name}</strong> ({selectedEmployee.email})
//             </small>
//           </div>
//         )}
//       </Form.Group>

//       <div className="d-grid">
//         <Button 
//           variant="primary" 
//           type="submit"
//           disabled={loading || !formData.assignedTo}
//         >
//           {loading ? (
//             <>
//               <Spinner animation="border" size="sm" className="me-2" />
//               Creating Task...
//             </>
//           ) : (
//             'Create Task'
//           )}
//         </Button>
//       </div>
      
//       {/* Debug section - can be removed in production */}
//       {process.env.NODE_ENV !== 'production' && employees.length > 0 && (
//         <div className="mt-4 p-3 border rounded bg-light">
//           <h6>Debug: Available Employees ({employees.length})</h6>
//           <small className="text-muted">This section is only visible during development</small>
//           <div style={{maxHeight: '150px', overflowY: 'auto', fontSize: '0.8rem'}}>
//             <ul className="mb-0">
//               {employees.map(emp => (
//                 <li key={emp.id}>{emp.name} ({emp.email}) - ID: {emp.id}</li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       )}
//     </Form>
//   );
// };

// export default TaskForm;