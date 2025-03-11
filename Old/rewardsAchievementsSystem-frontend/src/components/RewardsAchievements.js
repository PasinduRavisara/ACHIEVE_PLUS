import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "./RewardsAchievements.css";

import * as apiService from "../services/apiService";

const RewardsAchievements = () => {
  const [points, setPoints] = useState(0);
  const [completionRate, setCompletionRate] = useState(0);
  const [rewards, setRewards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        // In a real application with the backend connected:
        // const data = await apiService.getDashboardData();
        // setPoints(data.points);
        // setCompletionRate(data.completionRate);
        // setRewards(data.rewards);

        // For demonstration, using sample data:
        setPoints(55);
        setCompletionRate(40);
        setRewards([
          { id: 1, name: "REWARD 01", claimed: false, pointsValue: 20 },
          { id: 2, name: "REWARD 02", claimed: false, pointsValue: 20 },
          { id: 3, name: "REWARD 03", claimed: false, pointsValue: 20 },
        ]);

        setLoading(false);
      } catch (err) {
        setError("Failed to fetch dashboard data. Please try again later.");
        setLoading(false);
        console.error("Error fetching dashboard data:", err);
      }
    };

    fetchDashboardData();
  }, []);

  const handleClaimReward = async (rewardId) => {
    try {
      // In a real application with the backend connected:
      // const claimedReward = await apiService.claimReward(rewardId);

      // For demonstration:
      const updatedRewards = rewards.map((reward) =>
        reward.id === rewardId ? { ...reward, claimed: true } : reward
      );

      setRewards(updatedRewards);

      // Update points
      const claimedReward = rewards.find((r) => r.id === rewardId);
      if (claimedReward && !claimedReward.claimed) {
        setPoints(points + claimedReward.pointsValue);
      }

      // Update completion rate
      const newCompletionRate = calculateCompletionRate(updatedRewards);
      setCompletionRate(newCompletionRate);
    } catch (err) {
      console.error("Error claiming reward:", err);
      alert("Failed to claim reward. Please try again.");
    }
  };

  const calculateCompletionRate = (rewardsList) => {
    if (!rewardsList || rewardsList.length === 0) return 0;
    const claimedCount = rewardsList.filter((r) => r.claimed).length;
    return Math.round((claimedCount / rewardsList.length) * 100);
  };

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-5 text-danger">{error}</div>;
  }

  return (
    <Container className="rewards-container">
      <h2 className="section-title">REWARDS & ACHIEVEMENTS</h2>

      <Row>
        <Col md={6}>
          <Card className="rewards-card">
            <Card.Body>
              <h3 className="card-title">REWARDS</h3>

              <div className="points-box">
                <div className="points-value">{points}</div>
                <div className="points-label">Points</div>
              </div>

              <div className="rewards-list">
                {rewards.map((reward) => (
                  <div key={reward.id} className="reward-item">
                    <div className="reward-name">{reward.name}</div>
                    <Button
                      className={`claim-btn ${reward.claimed ? "claimed" : ""}`}
                      onClick={() => handleClaimReward(reward.id)}
                      disabled={reward.claimed}
                    >
                      {reward.claimed ? "Claimed" : "Claim"}
                    </Button>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="achievements-card">
            <Card.Body>
              <h3 className="card-title">ACHIEVEMENT</h3>

              <div className="completion-box">
                <div className="completion-value">{completionRate}%</div>
              </div>

              <div className="completion-label">Of Your Task Completion</div>

              <div className="period-label">
                <Button className="period-btn">Last 30 Days</Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default RewardsAchievements;
