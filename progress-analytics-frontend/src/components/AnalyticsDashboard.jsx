"use client";

import { useState, useEffect, useCallback } from "react";
import { Container, Card, Row, Col, Form, Spinner, Alert, Image } from "react-bootstrap";
import TasksChart from "./TasksChart";
import pointsImage from "../assets/points_image.jpg"; // Import your image

const AnalyticsDashboard = () => {
  const [metrics, setMetrics] = useState({
    totalTasksCompletedMonth: 0,
    totalTasksCompletedOverall: 0,
    tasksInProgress: 0,
    completionRate: 0,
    pointsEarnedMonth: 0,
    pointsEarnedTotal: 0,
  });
  const [dateRange, setDateRange] = useState("month");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMetrics = useCallback(async (range: string) => {
    setLoading(true);
    setError(null);

  try {
    const res = await fetch(
      `http://localhost:8080/api/analytics/metrics?dateRange=${range}`
    );
    if (!res.ok) throw new Error("Failed to fetch analytics metrics.");

    const data = await res.json();
    setMetrics(data);
  } catch (err: any) {
    setError(err.message || "Something went wrong.");
  } finally {
    setLoading(false);
  }
}, []);

  useEffect(() => {
    fetchMetrics(dateRange);
  }, [dateRange, fetchMetrics]);

  const handleDateRangeChange = (e) => setDateRange(e.target.value);

  if (loading) return <Spinner animation="border" className="d-block mx-auto mt-4" />;
  if (error) return <Alert variant="danger">Error: {error}</Alert>;

  return (
    <Container>
      <Form.Group className="mb-3">
        <Form.Label>Select Date Range:</Form.Label>
        <Form.Select value={dateRange} onChange={handleDateRangeChange}>
          <option value="month">This Month</option>
          <option value="quarter">This Quarter</option>
          <option value="year">This Year</option>
        </Form.Select>
      </Form.Group>

      <Row className="mb-4 g-4">
        <Col md={4}>
          <Card className="h-100 d-flex flex-column">
            <Card.Body>
              <Card.Title>✅ Tasks Completed</Card.Title>
              <Card.Text>
                This {dateRange}: <strong>{metrics.totalTasksCompletedMonth}</strong>
                <br />
                Overall: <strong>{metrics.totalTasksCompletedOverall}</strong>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="h-100 d-flex flex-column">
            <Card.Body>
              <Card.Title>📌 Tasks in Progress</Card.Title>
              <Card.Text>
                {metrics.tasksInProgress > 0 ? `${metrics.tasksInProgress} ongoing` : "No active tasks"}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="h-100 d-flex flex-column">
            <Card.Body>
              <Card.Title>📊 Completion Rate</Card.Title>
              <Card.Text>
                {metrics.completionRate > 0 ? `${metrics.completionRate.toFixed(2)}%` : "No tasks completed yet"}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4 g-4">
        <Col md={6}>
          <Card className="h-100 d-flex flex-column">
            <Card.Body>
              <Card.Title>📈 Tasks Completed vs. In Progress</Card.Title>
              <TasksChart dateRange={dateRange} />
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="h-100 d-flex flex-column">
            <Card.Body>
              <Card.Title>🏆 Points Earned</Card.Title>
              <Card.Text>
                This {dateRange}: <strong>{metrics.pointsEarnedMonth}</strong>
                <br />
                Total: <strong>{metrics.pointsEarnedTotal}</strong>
              </Card.Text>
            </Card.Body>
            <Card.Footer className="text-center">
              <Image
                src={pointsImage}
                alt="Rewards"
                fluid
                className="rounded"
                style={{ maxHeight: "150px" }}
              />
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AnalyticsDashboard;
