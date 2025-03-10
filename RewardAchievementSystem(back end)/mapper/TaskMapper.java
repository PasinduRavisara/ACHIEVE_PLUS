package com.achieveplus.RewardAchievementSystem.mapper;

import com.achieveplus.RewardAchievementSystem.dto.TaskDTO;
import com.achieveplus.RewardAchievementSystem.entity.Task;

public class TaskMapper {
    public static TaskDTO toDTO(Task task) {
        TaskDTO dto = new TaskDTO();
        dto.setId(task.getId());
        dto.setName(task.getName());
        dto.setCompleted(task.isCompleted());
        dto.setCompletedAt(task.getCompletedAt());
        return dto;
    }
}