package com.achieveplus.RewardAchievementSystem.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.CascadeType;
import java.time.LocalDateTime;
import lombok.Data;

@Entity
@Data
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private boolean completed = false; // Default to false
    private LocalDateTime completedAt;

    @ManyToOne
    private User user;

    @OneToOne(mappedBy = "task", cascade = CascadeType.ALL)
    private Reward reward;
}