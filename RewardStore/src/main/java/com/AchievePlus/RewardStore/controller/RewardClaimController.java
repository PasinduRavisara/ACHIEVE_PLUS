package com.AchievePlus.RewardStore.controller;

import com.AchievePlus.RewardStore.model.UserReward;
import com.AchievePlus.RewardStore.service.RewardClaimService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/claims")
@RequiredArgsConstructor
public class RewardClaimController {

    private final RewardClaimService rewardClaimService;

    @GetMapping("/user/{userId}")
    public List<UserReward> getUserRewards(@PathVariable Long userId) {
        return rewardClaimService.getUserRewards(userId);
    }

    @PostMapping("/user/{userId}/reward/{rewardId}")
    public ResponseEntity<String> claimReward(@PathVariable Long userId, @PathVariable Long rewardId) {
        boolean claimed = rewardClaimService.claimReward(userId, rewardId);
        if (claimed) {
            return ResponseEntity.ok("Reward claimed successfully");
        } else {
            return ResponseEntity.badRequest().body("Failed to claim reward. Check points balance or reward availability.");
        }
    }
}