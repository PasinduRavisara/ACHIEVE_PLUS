package com.achieveplus.RewardAchievementSystem.mapper;

import com.achieveplus.RewardAchievementSystem.dto.TaskDTO;
import com.achieveplus.RewardAchievementSystem.entity.Task;

public class TaskMapper {
    /**
     * Converts a Task entity object to a TaskDTO (Data Transfer Object).
     *
     * @param task The Task entity object to be converted.
     * @return A TaskDTO containing the information from the provided Task entity.
     */
    public static TaskDTO toDTO(Task task) {
        TaskDTO dto = new TaskDTO();
        dto.setId(task.getId());
        dto.setName(task.getName());
        dto.setCompleted(task.isCompleted());
        dto.setCompletedAt(task.getCompletedAt());
        return dto;
    }
}