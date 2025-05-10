package com.AchievePlus.RewardStore.repository;

import com.AchievePlus.RewardStore.model.User;
import com.AchievePlus.RewardStore.model.UserReward;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRewardRepository extends JpaRepository<UserReward, Long> {
    List<UserReward> findByUserId(Long userId);
}