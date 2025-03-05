package com.SDGP.ProgressAnalyticsBE.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "tasks")
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private String status; // COMPLETED, IN_PROGRESS
    private int points;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "completed_at")
    private LocalDateTime completedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User assignedUser;

    // Constructor for creating mock data
    public Task() {}

    public Task(String title, String description, String status, int points,
                LocalDateTime createdAt, LocalDateTime completedAt, User assignedUser) {
        this.title = title;
        this.description = description;
        this.status = status;
        this.points = points;
        this.createdAt = createdAt;
        this.completedAt = completedAt;
        this.assignedUser = assignedUser;
    }
}