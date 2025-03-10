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

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {
    @Autowired
    private RewardService rewardService;

    @Autowired
    private TaskService taskService;

    @GetMapping
    public ResponseEntity<Map<String, Object>> getDashboardData(@AuthenticationPrincipal User user) {
        Map<String, Object> dashboardData = new HashMap<>();

        // Get user points
        dashboardData.put("points", user.getTotalPoints());

        // Get completion rate
        CompletionRateDTO completionRate = taskService.getCompletionRateDTO(user);
        dashboardData.put("completionRate", completionRate.getCompletionRate());

        // Get rewards
        List<RewardDTO> rewards = rewardService.getUserRewards(user);
        dashboardData.put("rewards", rewards);

        return ResponseEntity.ok(dashboardData);
    }
}