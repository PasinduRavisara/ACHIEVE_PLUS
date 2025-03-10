package com.AchievePlus.Leaderboard.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private Integer points = 0;

    @Column
    private String profileImageUrl;

    @Column
    private Boolean isCrowned = false;

    // Constructor for easy creation
    public User(String name, Integer points, String profileImageUrl) {
        this.name = name;
        this.points = points;
        this.profileImageUrl = profileImageUrl;
    }
}