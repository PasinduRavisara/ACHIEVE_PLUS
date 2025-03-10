package com.achieveplus.RewardAchievementSystem.service;

import com.achieveplus.RewardAchievementSystem.dto.RewardDTO;
import com.achieveplus.RewardAchievementSystem.entity.Reward;
import com.achieveplus.RewardAchievementSystem.entity.User;
import com.achieveplus.RewardAchievementSystem.mapper.RewardMapper;
import com.achieveplus.RewardAchievementSystem.repository.RewardRepository;
import com.achieveplus.RewardAchievementSystem.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class RewardService {
    private final RewardRepository rewardRepository;
    private final UserRepository userRepository;

    // Constructor to initialize RewardRepository and UserRepository
    @Autowired
    public RewardService(RewardRepository rewardRepository, UserRepository userRepository) {
        this.rewardRepository = rewardRepository;
        this.userRepository = userRepository;
    }
    /**
     * Allows a user to claim a reward based on its ID.
     * The reward is only claimable if it has not been claimed yet
     * and the associated task is completed.
     *
     * @param rewardId The ID of the reward to be claimed.
     * @param user The user claiming the reward.
     * @return The RewardDTO representing the claimed reward.
     */
    public RewardDTO claimReward(Long rewardId, User user) {
        // Fetch the reward by its ID, throwing an exception if not found.
        Reward reward = rewardRepository.findById(rewardId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Reward not found with id: " + rewardId));

        // Check if the reward has already been claimed.
        if (reward.isClaimed()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Reward has already been claimed");
        }

        // Check if the associated task is completed
        if (reward.getTask() != null && !reward.getTask().isCompleted()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Cannot claim reward for incomplete task");
        }

        try {
            // Mark the reward as claimed and add points to the user's account.
            reward.setClaimed(true);
            user.addPoints(reward.getPointsValue());

            // Save the updated reward and user to the database.
            reward = rewardRepository.save(reward);
            userRepository.save(user);

            // Return the DTO of the claimed reward.
            return RewardMapper.toDTO(reward);
        } catch (Exception e) {
            // Handle any errors that occur during the reward claiming process.
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR, "Failed to process reward claim", e);
        }
    }

    // Get all rewards for a user
    public List<RewardDTO> getUserRewards(User user) {
        List<Reward> rewards = user.getRewards();
        return rewards.stream()
                .map(RewardMapper::toDTO)
                .collect(Collectors.toList());
    }
}