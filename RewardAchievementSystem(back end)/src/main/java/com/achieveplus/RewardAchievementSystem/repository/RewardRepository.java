package com.achieveplus.RewardAchievementSystem.repository;

import com.achieveplus.RewardAchievementSystem.entity.Reward;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RewardRepository extends JpaRepository<Reward, Long> {
}