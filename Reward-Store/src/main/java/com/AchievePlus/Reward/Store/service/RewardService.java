package com.AchievePlus.Reward.Store.service;

import com.AchievePlus.Reward.Store.model.Reward;
import com.AchievePlus.Reward.Store.model.User;
import com.AchievePlus.Reward.Store.repository.RewardRepository;
import com.AchievePlus.Reward.Store.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class RewardService {
    @Autowired
    private RewardRepository rewardRepository;

    @Autowired
    private UserRepository userRepository;

    public List<Reward> getAllRewards() {
        return rewardRepository.findAll();
    }

    public Reward addReward(Reward reward) {
        return rewardRepository.save(reward);
    }

    @Transactional
    public boolean claimReward(String username, Long rewardId) {
        // Find user and reward
        User user = userRepository.findByUsername(username);
        Optional<Reward> rewardOptional = rewardRepository.findById(rewardId);

        // Validate claim
        if (user == null || !rewardOptional.isPresent()) {
            return false;
        }

        Reward reward = rewardOptional.get();

        // Check if user has enough points
        if (user.getTotalPoints() >= reward.getPointsCost()) {
            // Deduct points
            user.setTotalPoints(user.getTotalPoints() - reward.getPointsCost());
            userRepository.save(user);
            return true;
        }

        return false;
    }
}