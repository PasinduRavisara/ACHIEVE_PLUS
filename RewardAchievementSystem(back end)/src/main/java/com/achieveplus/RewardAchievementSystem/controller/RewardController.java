package com.achieveplus.RewardAchievementSystem.controller;

import com.achieveplus.RewardAchievementSystem.dto.RewardDTO;
import com.achieveplus.RewardAchievementSystem.service.RewardService;
import com.achieveplus.RewardAchievementSystem.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController // Marks the class as a REST controller for handling HTTP requests
@RequestMapping("/api/rewards") // Defines the base URL path for this controller
public class RewardController {
    @Autowired // Automatically injects the RewardService
    private RewardService rewardService;

    // Method to claim a reward by the user
    @PostMapping("/claim/{rewardId}")
    public ResponseEntity<RewardDTO> claimReward(
            @PathVariable Long rewardId,
            @AuthenticationPrincipal User user) {
        // Call the service to claim the reward and return it in the response
        return ResponseEntity.ok(rewardService.claimReward(rewardId, user));
    }

    // Method to get the list of rewards for the authenticated user
    @GetMapping("/points")
    public ResponseEntity<Integer> getUserPoints(@AuthenticationPrincipal User user) {
        // Call the service to fetch the user's rewards and return them in the response
        return ResponseEntity.ok(user.getTotalPoints());
    }

    @GetMapping("/list")
    public ResponseEntity<List<RewardDTO>> getUserRewards(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(rewardService.getUserRewards(user));
    }
}