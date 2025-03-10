package com.achieveplus.RewardAchievementSystem.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data // Lombok's annotation to automatically generate getters, setters, toString, equals, and hashCode methods
public class TaskDTO {
    private Long id;
    private String name;
    private boolean completed;
    private LocalDateTime completedAt;
}