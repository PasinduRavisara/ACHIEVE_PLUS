package com.achieveplus.RewardAchievementSystem.dto;

import com.achieveplus.RewardAchievementSystem.entity.Reward;
import lombok.Data;

@Data // Lombok annotation to automatically generate getters, setters, toString, equals, and hashCode methods
public class RewardDTO {
    private Long id;
    private String name;
    private boolean claimed;
    private int pointsValue;

    // Static method to convert from Reward entity to RewardDTO
    public static RewardDTO fromEntity(Reward reward) {
        RewardDTO dto = new RewardDTO(); // Create a new RewardDTO object
        dto.setId(reward.getId());
        dto.setName(reward.getName());
        dto.setClaimed(reward.isClaimed());
        dto.setPointsValue(reward.getPointsValue()); // Return the populated RewardDTO
        return dto; // Return the populated RewardDTO
    }
}