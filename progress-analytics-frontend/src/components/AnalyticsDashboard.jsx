"use client"

import { useState, useEffect } from "react"
import { Card, Row, Col, Form } from "react-bootstrap"
import TasksChart from "./TasksChart"

const AnalyticsDashboard = () => {
  const [metrics, setMetrics] = useState({
    totalTasksCompletedMonth: 0,
    totalTasksCompletedOverall: 0,
    tasksInProgress: 0,
    completionRate: 0,
    pointsEarnedMonth: 0,
    pointsEarnedTotal: 0,
  })
  const [dateRange, setDateRange] = useState("month")

  useEffect(() => {
    fetchMetrics(dateRange)
  }, [dateRange])

  // In AnalyticsDashboard.jsx
const fetchMetrics = async (range) => {
    const response = await fetch(`http://localhost:8080/api/analytics/metrics?dateRange=${range}`);
    const data = await response.json();
    setMetrics(data);
  };

  const handleDateRangeChange = (e) => {
    setDateRange(e.target.value)
  }

  return (
    <div>
      <Form.Group className="mb-3">
        <Form.Label>Select Date Range:</Form.Label>
        <Form.Select value={dateRange} onChange={handleDateRangeChange}>
          <option value="month">This Month</option>
          <option value="quarter">This Quarter</option>
          <option value="year">This Year</option>
        </Form.Select>
      </Form.Group>
      <Row className="mb-4">
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Tasks Completed</Card.Title>
              <Card.Text>
                This {dateRange}: {metrics.totalTasksCompletedMonth}
                <br />
                Overall: {metrics.totalTasksCompletedOverall}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Tasks in Progress</Card.Title>
              <Card.Text>{metrics.tasksInProgress}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Completion Rate</Card.Title>
              <Card.Text>{metrics.completionRate.toFixed(2)}%</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Points Earned</Card.Title>
              <Card.Text>
                This {dateRange}: {metrics.pointsEarnedMonth}
                <br />
                Total: {metrics.pointsEarnedTotal}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Tasks Completed vs. In Progress</Card.Title>
              <TasksChart dateRange={dateRange} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default AnalyticsDashboard

