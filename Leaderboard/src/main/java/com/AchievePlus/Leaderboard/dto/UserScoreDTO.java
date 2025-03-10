package com.AchievePlus.Leaderboard.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserScoreDTO {
    private Long id;
    private String name;
    private Integer points;
    private String profileImageUrl;
    private Boolean isCrowned;
    private Integer rank;
}