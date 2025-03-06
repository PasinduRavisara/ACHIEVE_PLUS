import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import RewardCard from "../components/RewardCard";
import { RewardService } from "../services/rewardService";

const RewardStorePage = () => {
  const [userPoints, setUserPoints] = useState(12345);
  const [rewards, setRewards] = useState([]);

  useEffect(() => {
    const fetchRewards = async () => {
      const fetchedRewards = await RewardService.getAllRewards();
      setRewards(fetchedRewards);
    };
    fetchRewards();
  }, []);

  const handleRewardClaim = async (rewardId) => {
    const claimed = await RewardService.claimReward("testuser", rewardId);
    if (claimed) {
      // Update user points
      const reward = rewards.find((r) => r.id === rewardId);
      setUserPoints((prev) => prev - reward.pointsCost);
    }
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <Container fluid className="ml-5 p-4" style={{ marginLeft: "80px" }}>
        <h1 className="mb-4">REWARD STORE</h1>

        <Card className="mb-4" style={{ maxWidth: "400px" }}>
          <Card.Body className="text-center">
            <Card.Title>Points Earned</Card.Title>
            <h2>{userPoints} points</h2>
          </Card.Body>
        </Card>

        <Row>
          {rewards.map((reward) => (
            <Col key={reward.id} md={4}>
              <RewardCard
                reward={reward}
                userPoints={userPoints}
                onClaim={handleRewardClaim}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default RewardStorePage;
