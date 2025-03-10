package com.achieveplus.RewardAchievementSystem.mapper;

import com.achieveplus.RewardAchievementSystem.dto.RewardDTO;
import com.achieveplus.RewardAchievementSystem.entity.Reward;

public class RewardMapper {
    public static RewardDTO toDTO(Reward reward) {
        return RewardDTO.fromEntity(reward);
    }
}