package com.AchievePlus.Reward.Store.repository;

import com.AchievePlus.Reward.Store.model.Reward;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RewardRepository extends JpaRepository<Reward, Long> {
}