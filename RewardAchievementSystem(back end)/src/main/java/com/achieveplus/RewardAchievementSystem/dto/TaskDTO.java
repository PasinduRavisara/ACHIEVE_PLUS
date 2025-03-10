package com.achieveplus.RewardAchievementSystem.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class TaskDTO {
    private Long id;
    private String name;
    private boolean completed;
    private LocalDateTime completedAt;
}