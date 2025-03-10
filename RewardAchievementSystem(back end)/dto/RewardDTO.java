package com.achieveplus.RewardAchievementSystem.dto;

import com.achieveplus.RewardAchievementSystem.entity.Reward;
import lombok.Data;

@Data
public class RewardDTO {
    private Long id;
    private String name;
    private boolean claimed;
    private int pointsValue;

    // You can add a static method to convert from Reward to RewardDTO
    public static RewardDTO fromEntity(Reward reward) {
        RewardDTO dto = new RewardDTO();
        dto.setId(reward.getId());
        dto.setName(reward.getName());
        dto.setClaimed(reward.isClaimed());
        dto.setPointsValue(reward.getPointsValue());
        return dto;
    }
}