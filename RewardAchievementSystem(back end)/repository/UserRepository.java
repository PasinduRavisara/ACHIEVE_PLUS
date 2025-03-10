package com.achieveplus.RewardAchievementSystem.repository;

import com.achieveplus.RewardAchievementSystem.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
}