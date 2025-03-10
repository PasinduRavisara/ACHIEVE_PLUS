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

@RestController
@RequestMapping("/api/rewards")
public class RewardController {
    @Autowired
    private RewardService rewardService;

    @PostMapping("/claim/{rewardId}")
    public ResponseEntity<RewardDTO> claimReward(
            @PathVariable Long rewardId,
            @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(rewardService.claimReward(rewardId, user));
    }

    @GetMapping("/points")
    public ResponseEntity<Integer> getUserPoints(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(user.getTotalPoints());
    }

    @GetMapping("/list")
    public ResponseEntity<List<RewardDTO>> getUserRewards(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(rewardService.getUserRewards(user));
    }
}