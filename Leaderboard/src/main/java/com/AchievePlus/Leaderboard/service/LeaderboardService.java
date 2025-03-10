package com.AchievePlus.Leaderboard.service;

import com.AchievePlus.Leaderboard.dto.UserScoreDTO;
import com.AchievePlus.Leaderboard.model.User;
import com.AchievePlus.Leaderboard.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class LeaderboardService {

    private final UserRepository userRepository;

    @Autowired
    public LeaderboardService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional(readOnly = true)
    public List<UserScoreDTO> getLeaderboard() {
        List<User> users = userRepository.findAllOrderByPointsDesc();
        List<UserScoreDTO> leaderboard = new ArrayList<>();

        // Determine the top user for crown assignment
        boolean hasCrownedUser = false;
        if (!users.isEmpty()) {
            User topUser = users.get(0);
            if (topUser.getPoints() > 0) {
                topUser.setIsCrowned(true);
                hasCrownedUser = true;
            }
        }

        // Convert to DTOs with rank
        for (int i = 0; i < users.size(); i++) {
            User user = users.get(i);

            // Only crown the top user
            if (i > 0 || !hasCrownedUser) {
                user.setIsCrowned(false);
            }

            UserScoreDTO dto = new UserScoreDTO(
                    user.getId(),
                    user.getName(),
                    user.getPoints(),
                    user.getProfileImageUrl(),
                    user.getIsCrowned(),
                    i + 1 // Rank is 1-based
            );
            leaderboard.add(dto);
        }

        return leaderboard;
    }

    @Transactional
    public UserScoreDTO updateUserPoints(Long userId, Integer newPoints) {
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            user.setPoints(newPoints);
            user = userRepository.save(user);

            // Recalculate leaderboard after update
            List<UserScoreDTO> updatedLeaderboard = getLeaderboard();

            // Find and return the updated user with new rank
            for (UserScoreDTO dto : updatedLeaderboard) {
                if (dto.getId().equals(userId)) {
                    return dto;
                }
            }
        }
        return null;
    }

    @Transactional
    public UserScoreDTO addUser(String name, Integer points, String profileImageUrl) {
        User newUser = new User(name, points, profileImageUrl);
        newUser = userRepository.save(newUser);

        // Recalculate leaderboard to get the rank
        List<UserScoreDTO> leaderboard = getLeaderboard();

        // Find and return the new user with rank
        for (UserScoreDTO dto : leaderboard) {
            if (dto.getId().equals(newUser.getId())) {
                return dto;
            }
        }
        return null;
    }

    @Transactional
    public boolean deleteUser(Long userId) {
        if (userRepository.existsById(userId)) {
            userRepository.deleteById(userId);
            return true;
        }
        return false;
    }
}