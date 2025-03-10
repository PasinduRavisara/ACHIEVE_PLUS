package com.achieveplus.leaderboard.service;

import com.achieveplus.leaderboard.model.Player;
import com.achieveplus.leaderboard.repository.PlayerRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PlayerService {
    private final PlayerRepository playerRepository;

    public PlayerService(PlayerRepository playerRepository) {
        this.playerRepository = playerRepository;
    }

    public List<Player> getLeaderboard() {
        return playerRepository.findAllByOrderByPointsDesc();
    }

    public int getPlayerRank(Long playerId) {
        List<Player> sortedPlayers = playerRepository.findAllByOrderByPointsDesc();
        for (int i = 0; i < sortedPlayers.size(); i++) {
            if (sortedPlayers.get(i).getId().equals(playerId)) {
                return i + 1;
            }
        }
        return -1;
    }

    public Player updateScore(Long playerId, int points) {
        Optional<Player> optionalPlayer = playerRepository.findById(playerId);
        if (optionalPlayer.isPresent()) {
            Player player = optionalPlayer.get();
            player.setPoints(player.getPoints() + points);
            return playerRepository.save(player);
        } else {
            throw new RuntimeException("Player not found");
        }
    }
}