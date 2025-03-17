package com.AchievePlus.RewardStore.controller;

import com.AchievePlus.RewardStore.model.UserReward;
import com.AchievePlus.RewardStore.service.RewardClaimService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

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
    public ResponseEntity<?> claimReward(@PathVariable Long userId, @PathVariable Long rewardId) {
        try {
            boolean claimed = rewardClaimService.claimReward(userId, rewardId);
            if (claimed) {
                return ResponseEntity.ok().body(Map.of(
                        "success", true,
                        "message", "Reward claimed successfully"
                ));
            } else {
                return ResponseEntity.badRequest().body(Map.of(
                        "success", false,
                        "message", "Failed to claim reward. Check points balance or reward availability."
                ));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                    "success", false,
                    "message", "Error processing claim: " + e.getMessage()
            ));
        }
    }
}