import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMetrics, getChartData, getAllUsers } from '../services/ApiService';
import MetricsSummary from './MetricsSummary';
import TaskChart from './TaskChart';

function Dashboard() {
  const [dateRange, setDateRange] = useState('month');
  const [metrics, setMetrics] = useState({
    totalTasksCompletedMonth: 0,
    totalTasksCompletedOverall: 0,
    tasksInProgress: 0,
    completionRate: 0,
    pointsEarnedMonth: 0,
    pointsEarnedTotal: 0
  });
  const [chartData, setChartData] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [metricsData, chartData, usersData] = await Promise.all([
          getMetrics(dateRange),
          getChartData(dateRange),
          getAllUsers()
        ]);
        
        setMetrics(metricsData);
        setChartData(chartData);
        setUsers(usersData);
        setLoading(false);
      // eslint-disable-next-line no-unused-vars
      } catch (error) {
        setError('Failed to load data. Please try again later.');
        setLoading(false);
      }
    };

    fetchData();
  }, [dateRange]);

  const handleDateRangeChange = (e) => {
    setDateRange(e.target.value);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Team Progress Analytics</h1>
        <div>
          <select 
            className="form-select" 
            value={dateRange} 
            onChange={handleDateRangeChange}
          >
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
        </div>
      </div>

      <MetricsSummary metrics={metrics} />

      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Task Completion Trends</h5>
          <TaskChart chartData={chartData} />
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Team Members</h5>
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Department</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.department}</td>
                    <td>
                      <Link 
                        to={`/user/${user.id}`} 
                        className="btn btn-sm btn-primary"
                      >
                        View Performance
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;