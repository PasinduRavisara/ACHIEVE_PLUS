package com.AchievePlus.RewardStore.controller;

import com.AchievePlus.RewardStore.model.UserReward;
import com.AchievePlus.RewardStore.service.RewardClaimService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/claims")
@RequiredArgsConstructor
public class RewardClaimController {

    private final RewardClaimService rewardClaimService;

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getUserRewards(@PathVariable Long userId) {
        try {
            List<UserReward> userRewards = rewardClaimService.getUserRewards(userId);
            return ResponseEntity.ok(userRewards);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error fetching user rewards: " + e.getMessage());
        }
    }

    @PostMapping("/user/{userId}/reward/{rewardId}")
    public ResponseEntity<?> claimReward(@PathVariable Long userId, @PathVariable Long rewardId) {
        try {
            boolean claimed = rewardClaimService.claimReward(userId, rewardId);
            if (claimed) {
                return ResponseEntity.ok("Reward claimed successfully");
            } else {
                return ResponseEntity.badRequest().body("Failed to claim reward. Check points balance or reward availability.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error claiming reward: " + e.getMessage());
        }
    }
}