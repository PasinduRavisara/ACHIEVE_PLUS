package com.AchievePlus.RewardStore.service;

import com.AchievePlus.RewardStore.model.Reward;
import com.AchievePlus.RewardStore.model.User;
import com.AchievePlus.RewardStore.model.UserReward;
import com.AchievePlus.RewardStore.repository.RewardRepository;
import com.AchievePlus.RewardStore.repository.UserRepository;
import com.AchievePlus.RewardStore.repository.UserRewardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RewardClaimService {

    private final UserRepository userRepository;
    private final RewardRepository rewardRepository;
    private final UserRewardRepository userRewardRepository;

    public List<UserReward> getUserRewards(Long userId) {
        return userRewardRepository.findByUserId(userId);
    }

    @Transactional
    public boolean claimReward(Long userId, Long rewardId) {
        Optional<User> optionalUser = userRepository.findById(userId);
        Optional<Reward> optionalReward = rewardRepository.findById(rewardId);

        if (optionalUser.isPresent() && optionalReward.isPresent()) {
            User user = optionalUser.get();
            Reward reward = optionalReward.get();

            // Check if user has enough points and reward is active
            if (user.getPoints() >= reward.getPointsCost() && reward.isActive()) {
                // Deduct points
                user.setPoints(user.getPoints() - reward.getPointsCost());

                // Create user reward record
                UserReward userReward = new UserReward(user, reward);
                user.getClaimedRewards().add(userReward);

                // Save everything
                userRepository.save(user);
                return true;
            }
        }
        return false;
    }
}