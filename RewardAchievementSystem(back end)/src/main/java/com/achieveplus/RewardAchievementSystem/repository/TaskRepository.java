package com.achieveplus.RewardAchievementSystem.repository;

import com.achieveplus.RewardAchievementSystem.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
}