package com.achieveplus.RewardAchievementSystem.dto;

import lombok.Data;
import lombok.AllArgsConstructor;

@Data // Lombok's annotation to automatically generate getter, setters, toString, equals, and hashCode methods
@AllArgsConstructor // Lombok's annotation to generate a constructor with all arguments
public class CompletionRateDTO {
    private double completionRate; // Represents the completion rate of tasks as a percentage
}