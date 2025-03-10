package com.achieveplus.RewardAchievementSystem.controller;

import com.achieveplus.RewardAchievementSystem.dto.CompletionRateDTO;
import com.achieveplus.RewardAchievementSystem.dto.RewardDTO;
import com.achieveplus.RewardAchievementSystem.entity.User;
import com.achieveplus.RewardAchievementSystem.service.RewardService;
import com.achieveplus.RewardAchievementSystem.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController // Marks the class as a REST controller for handling HTTP requests
@RequestMapping("/api/dashboard") // Defines the base URL path for this controller
public class DashboardController {
    @Autowired // Automatically injects the RewardService
    private RewardService rewardService;

    @Autowired // Automatically injects the TaskService
    private TaskService taskService;

    // Method to fetch dashboard data for a logged-in user
    @GetMapping
    public ResponseEntity<Map<String, Object>> getDashboardData(@AuthenticationPrincipal User user) {
        // Create a map to hold the dashboard data
        Map<String, Object> dashboardData = new HashMap<>();

        // Fetch and add the user's total points to the dashboard data
        dashboardData.put("points", user.getTotalPoints());

        // Fetch and add the user's task completion rate to the dashboard data
        CompletionRateDTO completionRate = taskService.getCompletionRateDTO(user);
        dashboardData.put("completionRate", completionRate.getCompletionRate());

        // Fetch and add the user's rewards to the dashboard data
        List<RewardDTO> rewards = rewardService.getUserRewards(user);
        dashboardData.put("rewards", rewards);

        // Return the dashboard data as a JSON response
        return ResponseEntity.ok(dashboardData);
    }
}