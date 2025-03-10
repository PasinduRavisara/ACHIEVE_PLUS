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
@Data
public class Reward {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private boolean claimed = false; // Default to false
    private int pointsValue = 20;

    @ManyToOne
    private User user;

    @OneToOne
    @JoinColumn(name = "task_id")
    private Task task;
}
