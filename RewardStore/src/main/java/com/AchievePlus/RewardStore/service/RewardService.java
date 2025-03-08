package com.AchievePlus.RewardStore.service;

import com.AchievePlus.RewardStore.model.Reward;
import com.AchievePlus.RewardStore.repository.RewardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RewardService {

    private final RewardRepository rewardRepository;

    public List<Reward> getAllRewards() {
        return rewardRepository.findAll();
    }

    public List<Reward> getActiveRewards() {
        return rewardRepository.findByActiveTrue();
    }

    public Optional<Reward> getRewardById(Long id) {
        return rewardRepository.findById(id);
    }

    @Transactional
    public Reward createReward(Reward reward) {
        return rewardRepository.save(reward);
    }

    @Transactional
    public Reward updateReward(Reward reward) {
        return rewardRepository.save(reward);
    }

    @Transactional
    public void deleteReward(Long id) {
        rewardRepository.deleteById(id);
    }

    @Transactional
    public boolean deactivateReward(Long id) {
        Optional<Reward> optionalReward = rewardRepository.findById(id);
        if (optionalReward.isPresent()) {
            Reward reward = optionalReward.get();
            reward.setActive(false);
            rewardRepository.save(reward);
            return true;
        }
        return false;
    }
}