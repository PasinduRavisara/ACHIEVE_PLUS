package com.AchievePlus.RewardStore.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "rewards")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Reward {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String description;

    private int pointsCost;

    private String imageUrl;

    private boolean active = true;
}