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

    @Autowired
    public RewardService(RewardRepository rewardRepository, UserRepository userRepository) {
        this.rewardRepository = rewardRepository;
        this.userRepository = userRepository;
    }

    public RewardDTO claimReward(Long rewardId, User user) {
        Reward reward = rewardRepository.findById(rewardId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Reward not found with id: " + rewardId));

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
            reward.setClaimed(true);
            user.addPoints(reward.getPointsValue());

            reward = rewardRepository.save(reward);
            userRepository.save(user);

            return RewardMapper.toDTO(reward);
        } catch (Exception e) {
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