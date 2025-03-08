package com.AchievePlus.RewardStore.controller;

import com.AchievePlus.RewardStore.model.Reward;
import com.AchievePlus.RewardStore.service.RewardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rewards")
@RequiredArgsConstructor
public class RewardController {

    private final RewardService rewardService;

    @GetMapping
    public List<Reward> getAllRewards() {
        return rewardService.getAllRewards();
    }

    @GetMapping("/active")
    public List<Reward> getActiveRewards() {
        return rewardService.getActiveRewards();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Reward> getRewardById(@PathVariable Long id) {
        return rewardService.getRewardById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Reward createReward(@RequestBody Reward reward) {
        return rewardService.createReward(reward);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Reward> updateReward(@PathVariable Long id, @RequestBody Reward reward) {
        return rewardService.getRewardById(id)
                .map(existingReward -> {
                    reward.setId(id);
                    return ResponseEntity.ok(rewardService.updateReward(reward));
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReward(@PathVariable Long id) {
        if (rewardService.getRewardById(id).isPresent()) {
            rewardService.deleteReward(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/{id}/deactivate")
    public ResponseEntity<String> deactivateReward(@PathVariable Long id) {
        boolean success = rewardService.deactivateReward(id);
        if (success) {
            return ResponseEntity.ok("Reward deactivated successfully");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}