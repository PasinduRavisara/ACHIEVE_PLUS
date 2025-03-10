import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getMetrics, getChartData, getAllUsers } from '../services/ApiService';
import MetricsSummary from './MetricsSummary';
import TaskChart from './TaskChart';

function UserAnalytics() {
  const { userId } = useParams();
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
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [metricsData, chartData, usersData] = await Promise.all([
          getMetrics(dateRange, userId),
          getChartData(dateRange, userId),
          getAllUsers()
        ]);
        
        setMetrics(metricsData);
        setChartData(chartData);
        
        // Find the current user from the users list
        const currentUser = usersData.find(user => user.id === parseInt(userId));
        setUser(currentUser);
        
        setLoading(false);
      // eslint-disable-next-line no-unused-vars
      } catch (error) {
        setError('Failed to load data. Please try again later.');
        setLoading(false);
      }
    };

    fetchData();
  }, [userId, dateRange]);

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

  if (!user) {
    return (
      <div className="alert alert-warning" role="alert">
        User not found. <Link to="/">Return to Dashboard</Link>
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <Link to="/" className="btn btn-outline-primary mb-2">
            &larr; Back to Dashboard
          </Link>
          <h1>{user.name}'s Analytics</h1>
          <p className="text-muted">
            {user.email} | {user.department} Department
          </p>
        </div>
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

      <div className="row">
        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Performance Summary</h5>
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Completion Rate
                  <span className="badge bg-primary rounded-pill">{metrics.completionRate}%</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Tasks Completed (This Period)
                  <span className="badge bg-primary rounded-pill">{metrics.totalTasksCompletedMonth}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Total Tasks Completed
                  <span className="badge bg-primary rounded-pill">{metrics.totalTasksCompletedOverall}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Current Tasks In Progress
                  <span className="badge bg-warning text-dark rounded-pill">{metrics.tasksInProgress}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Points Earned (This Period)
                  <span className="badge bg-success rounded-pill">{metrics.pointsEarnedMonth}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Total Points Earned
                  <span className="badge bg-success rounded-pill">{metrics.pointsEarnedTotal}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Productivity Insights</h5>
              <div className="mb-3">
                <label className="form-label">Task Completion Rate</label>
                <div className="progress">
                  <div 
                    className="progress-bar" 
                    role="progressbar" 
                    style={{ width: `${metrics.completionRate}%` }} 
                    aria-valuenow={metrics.completionRate} 
                    aria-valuemin="0" 
                    aria-valuemax="100"
                  >
                    {metrics.completionRate}%
                  </div>
                </div>
              </div>
              
              <div className="mb-3">
                <label className="form-label">Points Earned Ratio</label>
                <div className="progress">
                  <div 
                    className="progress-bar bg-success" 
                    role="progressbar" 
                    style={{ 
                      width: metrics.pointsEarnedTotal > 0 
                        ? `${(metrics.pointsEarnedMonth / metrics.pointsEarnedTotal) * 100}%`
                        : '0%'
                    }} 
                    aria-valuenow={
                      metrics.pointsEarnedTotal > 0 
                        ? (metrics.pointsEarnedMonth / metrics.pointsEarnedTotal) * 100
                        : 0
                    } 
                    aria-valuemin="0" 
                    aria-valuemax="100"
                  >
                    {metrics.pointsEarnedTotal > 0 
                      ? `${Math.round((metrics.pointsEarnedMonth / metrics.pointsEarnedTotal) * 100)}%`
                      : '0%'
                    }
                  </div>
                </div>
                <small className="text-muted">
                  Period points as percentage of total points earned
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserAnalytics;