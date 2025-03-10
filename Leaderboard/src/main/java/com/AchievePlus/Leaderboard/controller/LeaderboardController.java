package com.AchievePlus.Leaderboard.controller;

import com.AchievePlus.Leaderboard.dto.UserScoreDTO;
import com.AchievePlus.Leaderboard.service.LeaderboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/leaderboard")
@CrossOrigin(origins = "*") // For development - restrict in production
public class LeaderboardController {

    private final LeaderboardService leaderboardService;

    @Autowired
    public LeaderboardController(LeaderboardService leaderboardService) {
        this.leaderboardService = leaderboardService;
    }

    @GetMapping
    public ResponseEntity<List<UserScoreDTO>> getLeaderboard() {
        return ResponseEntity.ok(leaderboardService.getLeaderboard());
    }

    @PostMapping("/users")
    public ResponseEntity<UserScoreDTO> addUser(@RequestBody Map<String, Object> userInfo) {
        String name = (String) userInfo.get("name");
        Integer points = Integer.valueOf(userInfo.get("points").toString());
        String profileImageUrl = (String) userInfo.get("profileImageUrl");

        UserScoreDTO newUser = leaderboardService.addUser(name, points, profileImageUrl);
        return new ResponseEntity<>(newUser, HttpStatus.CREATED);
    }

    @PutMapping("/users/{userId}/points")
    public ResponseEntity<UserScoreDTO> updatePoints(
            @PathVariable Long userId,
            @RequestBody Map<String, Integer> pointsUpdate) {

        Integer newPoints = pointsUpdate.get("points");
        UserScoreDTO updated = leaderboardService.updateUserPoints(userId, newPoints);

        if (updated != null) {
            return ResponseEntity.ok(updated);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/users/{userId}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long userId) {
        boolean deleted = leaderboardService.deleteUser(userId);

        if (deleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}