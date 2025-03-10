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
@Data // Lombok's annotation to generate getters, setters, toString, equals, and hashCode
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-generate ID with an incrementing value
    private Long id;
    private String name;
    private boolean completed = false; // Default to false, meaning task is not completed initially
    private LocalDateTime completedAt; // Timestamp when the task is completed

    @ManyToOne // Many tasks can belong to one user
    private User user;

    @OneToOne(mappedBy = "task", cascade = CascadeType.ALL) // One-to-one relationship with Reward entity
    private Reward reward;
}