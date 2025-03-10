package com.achieveplus.RewardAchievementSystem.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.OneToMany;
import java.util.List;
import lombok.Data;

@Entity
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    private int totalPoints;

    @OneToMany(mappedBy = "user")
    private List<Task> tasks;

    @OneToMany(mappedBy = "user")
    private List<Reward> rewards;

    public void addPoints(int points) {
        if (points < 0) {
            throw new IllegalArgumentException("Points cannot be negative");
        }
        this.totalPoints += points;
    }

    public boolean hasEnoughPoints(int requiredPoints) {
        return this.totalPoints >= requiredPoints;
    }

    public boolean deductPoints(int points) {
        if (points < 0) {
            throw new IllegalArgumentException("Points cannot be negative");
        }
        if (this.totalPoints >= points) {
            this.totalPoints -= points;
            return true;
        }
        return false;
    }
}