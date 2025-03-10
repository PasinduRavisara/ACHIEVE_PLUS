// TaskController.java
package com.achieveplus.RewardAchievementSystem.controller;

import com.achieveplus.RewardAchievementSystem.dto.CompletionRateDTO;
import com.achieveplus.RewardAchievementSystem.dto.TaskDTO;
import com.achieveplus.RewardAchievementSystem.service.TaskService;
import com.achieveplus.RewardAchievementSystem.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/tasks") // Base URL path for this controller
@Tag(name = "Task Management", description = "APIs for managing user tasks") // Swagger metadata

public class TaskController {
    private final TaskService taskService;

    @Autowired
    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    // Endpoint to get the task completion rate for the authenticated user
    @GetMapping("/completion-rate") // Maps to GET /api/tasks/completion-rate
    @Operation(summary = "Get user's task completion rate",
            description = "Calculates the percentage of completed tasks for the authenticated user")
    @ApiResponse(responseCode = "200", description = "Successfully retrieved completion rate")
    public ResponseEntity<CompletionRateDTO> getCompletionRate(@AuthenticationPrincipal User user) {
        double rate = taskService.calculateCompletionRate(user);
        return ResponseEntity.ok(new CompletionRateDTO(rate));
    }

    // Endpoint to mark a specific task as complete
    @PostMapping("/{taskId}/complete") // Maps to POST /api/tasks/{taskId}/complete
    @Operation(summary = "Mark task as complete",
            description = "Marks the specified task as completed for the authenticated user")
    @ApiResponse(responseCode = "200", description = "Task successfully completed")
    @ApiResponse(responseCode = "404", description = "Task not found")
    public ResponseEntity<TaskDTO> completeTask(
            @PathVariable Long taskId,
            @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(taskService.completeTask(taskId, user)); // Mark task as complete and return the task DTO
    }
}