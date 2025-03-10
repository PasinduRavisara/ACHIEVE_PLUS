package com.achieveplus.RewardAchievementSystem.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.OneToMany;
import java.util.List;
import lombok.Data;

@Entity
@Data // Lombok's annotation to automatically generate getter, setters, toString, equals, and hashCode methods
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Automatically generates the primary key (ID) for this entity
    private Long id;
    private String username;
    private int totalPoints; // Total points accumulated by the user

    @OneToMany(mappedBy = "user") // One-to-many relationship with Task entity (user can have multiple tasks)
    private List<Task> tasks;

    @OneToMany(mappedBy = "user") // One-to-many relationship with Reward entity (user can have multiple rewards)
    private List<Reward> rewards;

    public void addPoints(int points) {
        if (points < 0) {
            throw new IllegalArgumentException("Points cannot be negative");
        }
        this.totalPoints += points; // Adds the points to the totalPoints
    }

    public boolean hasEnoughPoints(int requiredPoints) {
        return this.totalPoints >= requiredPoints;
    }

    public boolean deductPoints(int points) {
        if (points < 0) {
            throw new IllegalArgumentException("Points cannot be negative");
        }
        if (this.totalPoints >= points) { // Check if the user has enough points to deduct
            this.totalPoints -= points;
            return true; // Successful deduction
        }
        return false; // Not enough points to deduct
    }
}