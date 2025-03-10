package com.achieveplus.RewardAchievementSystem.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.JoinColumn;
import lombok.Data;

@Entity
@Data // Lombok's annotation to generate getters, setters, toString, equals, and hashCode
public class Reward {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-generate ID with an incrementing value
    private Long id;
    private String name;
    private boolean claimed = false; // Default to false
    private int pointsValue = 20; // Default points value associated with the reward

    @ManyToOne // Many rewards can belong to one user
    private User user;

    @OneToOne // Each reward is linked to one task
    @JoinColumn(name = "task_id")
    private Task task; // The task that the reward is linked to
}
