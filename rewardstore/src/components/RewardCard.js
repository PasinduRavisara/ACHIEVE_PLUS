//RewardCard
import React from "react";
import { Card, Button } from "react-bootstrap";

const RewardCard = ({ reward, userPoints, onClaim }) => {
  const canClaim = userPoints >= reward.pointsCost;

  return (
    <Card className="mb-3" style={{ width: "18rem" }}>
      <Card.Img
        variant="top"
        src={`/images/${reward.name.toLowerCase().replace(" ", "-")}.png`}
        style={{ height: "200px", objectFit: "cover" }}
      />
      <Card.Body>
        <Card.Title>{reward.name}</Card.Title>
        <Card.Text>
          {reward.description}
          <br />
          <strong>Points Required: {reward.pointsCost}</strong>
        </Card.Text>
        <Button
          variant={canClaim ? "primary" : "secondary"}
          disabled={!canClaim}
          onClick={() => onClaim(reward.id)}
        >
          {canClaim ? "Claim" : "Insufficient Points"}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default RewardCard;
