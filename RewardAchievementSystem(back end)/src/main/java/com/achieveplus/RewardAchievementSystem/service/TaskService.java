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

    // Constructor for dependency injection of TaskRepository, UserService, and UserRepository
    @Autowired
    public TaskService(TaskRepository taskRepository, UserService userService, UserRepository userRepository) {
        this.taskRepository = taskRepository;
        this.userService = userService;
        this.userRepository = userRepository;
    }

    /**
     * Calculates the completion rate of tasks for a given user.
     *
     * @param user The user whose task completion rate is being calculated.
     * @return The completion rate as a percentage (0.0 to 100.0).
     */
    public double calculateCompletionRate(User user) {
        // Fetch all tasks assigned to the user
        List<Task> tasks = userService.getUserTasks(user.getId());
        if (tasks.isEmpty()) {
            return 0.0; // If the user has no tasks, return a 0% completion rate
        }

        // Count the number of completed tasks
        long completedTasks = tasks.stream()
                .filter(Task::isCompleted)
                .count();

        // Calculate percentage and round to nearest integer for UI display
        return Math.round((double) completedTasks / tasks.size() * 100);
    }

    /**
     * Completes a task for a given user.
     *
     * @param taskId The ID of the task to be completed.
     * @param user The user attempting to complete the task.
     * @return A TaskDTO representing the completed task.
     */
    public TaskDTO completeTask(Long taskId, User user) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Task not found with id: " + taskId));

        // Check if the user is authorized to complete the task
        if (!task.getUser().getId().equals(user.getId())) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN, "User is not authorized to complete this task");
        }

        // Check if the task is already completed
        if (task.isCompleted()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Task is already completed");
        }

        try {
            task.setCompleted(true);
            task.setCompletedAt(LocalDateTime.now());
            task = taskRepository.save(task);

            // Ensure the user entity is saved to persist changes (if any)
            userRepository.save(user);

            // Return the task as a DTO
            return TaskMapper.toDTO(task);
        } catch (Exception e) {
            // Handle any errors that occur during the task completion process
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR, "Failed to complete task", e);
        }
    }

    // Get completion status specifically for UI display
    public CompletionRateDTO getCompletionRateDTO(User user) {
        double rate = calculateCompletionRate(user);
        return new CompletionRateDTO(rate); // Return the completion rate wrapped in a DTO
    }
}