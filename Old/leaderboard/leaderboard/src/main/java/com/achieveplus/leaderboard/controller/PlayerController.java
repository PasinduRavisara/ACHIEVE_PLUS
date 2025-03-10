package com.achieveplus.leaderboard.controller;

import com.achieveplus.leaderboard.model.Player;
import com.achieveplus.leaderboard.service.PlayerService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/leaderboard")
@CrossOrigin(origins = "http://localhost:3000")
public class PlayerController {
    private final PlayerService playerService;

    public PlayerController(PlayerService playerService) {
        this.playerService = playerService;
    }

    @GetMapping
    public List<Player> getLeaderboard() {
        return playerService.getLeaderboard();
    }

    @GetMapping("/{playerId}")
    public int getPlayerRank(@PathVariable Long playerId) {
        return playerService.getPlayerRank(playerId);
    }

    @PostMapping("/update")
    public Player updateScore(@RequestBody Map<String, Object> payload) {
        Long playerId = Long.valueOf(payload.get("playerId").toString());
        int points = Integer.parseInt(payload.get("points").toString());
        return playerService.updateScore(playerId, points);
    }
}
