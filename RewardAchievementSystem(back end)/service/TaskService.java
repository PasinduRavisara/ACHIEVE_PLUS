package com.achieveplus.RewardAchievementSystem.service;

import com.achieveplus.RewardAchievementSystem.dto.CompletionRateDTO;
import com.achieveplus.RewardAchievementSystem.dto.TaskDTO;
import com.achieveplus.RewardAchievementSystem.entity.Task;
import com.achieveplus.RewardAchievementSystem.entity.User;
import com.achieveplus.RewardAchievementSystem.mapper.TaskMapper;
import com.achieveplus.RewardAchievementSystem.repository.TaskRepository;
import com.achieveplus.RewardAchievementSystem.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional
public class TaskService {
    private final TaskRepository taskRepository;
    private final UserRepository userRepository;
    private final UserService userService;

    @Autowired
    public TaskService(TaskRepository taskRepository, UserService userService, UserRepository userRepository) {
        this.taskRepository = taskRepository;
        this.userService = userService;
        this.userRepository = userRepository;
    }

    public double calculateCompletionRate(User user) {
        List<Task> tasks = userService.getUserTasks(user.getId());
        if (tasks.isEmpty()) {
            return 0.0;
        }

        long completedTasks = tasks.stream()
                .filter(Task::isCompleted)
                .count();

        // Calculate percentage and round to nearest integer for UI display
        return Math.round((double) completedTasks / tasks.size() * 100);
    }

    public TaskDTO completeTask(Long taskId, User user) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Task not found with id: " + taskId));

        if (!task.getUser().getId().equals(user.getId())) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN, "User is not authorized to complete this task");
        }

        if (task.isCompleted()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Task is already completed");
        }

        try {
            task.setCompleted(true);
            task.setCompletedAt(LocalDateTime.now());
            task = taskRepository.save(task);

            // Save user to ensure persistence
            userRepository.save(user);

            return TaskMapper.toDTO(task);
        } catch (Exception e) {
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR, "Failed to complete task", e);
        }
    }

    // Get completion status specifically for UI display
    public CompletionRateDTO getCompletionRateDTO(User user) {
        double rate = calculateCompletionRate(user);
        return new CompletionRateDTO(rate);
    }
}