package com.AchievePlus.Reward.Store.controller;

import com.AchievePlus.Reward.Store.model.Reward;

import com.AchievePlus.Reward.Store.service.RewardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rewards")
public class RewardController {
    @Autowired
    private RewardService rewardService;

    @GetMapping
    public List<Reward> getAllRewards() {
        return rewardService.getAllRewards();
    }

    @PostMapping
    public Reward addReward(@RequestBody Reward reward) {
        return rewardService.addReward(reward);
    }

    @PostMapping("/claim")
    public ResponseEntity<Boolean> claimReward(
            @RequestParam String username,
            @RequestParam Long rewardId
    ) {
        boolean claimed = rewardService.claimReward(username, rewardId);
        return ResponseEntity.ok(claimed);
    }
}