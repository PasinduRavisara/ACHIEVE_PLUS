package com.achieveplus.RewardAchievementSystem.mapper;

import com.achieveplus.RewardAchievementSystem.dto.RewardDTO;
import com.achieveplus.RewardAchievementSystem.entity.Reward;

/**
 * Utility class for mapping Reward entity objects to RewardDTO objects.
 * This helps in separating entity logic from DTO logic, improving maintainability.
 */
public class RewardMapper {
    /**
     * Converts a Reward entity into a RewardDTO.
     * This method delegates the mapping logic to the RewardDTO class.
     *
     * @param reward The Reward entity to be converted.
     * @return A RewardDTO representation of the given Reward entity.
     */
    public static RewardDTO toDTO(Reward reward) {
        return RewardDTO.fromEntity(reward);
    }
}