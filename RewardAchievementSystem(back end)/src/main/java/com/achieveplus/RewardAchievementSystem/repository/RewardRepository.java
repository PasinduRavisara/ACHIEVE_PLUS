package com.achieveplus.RewardAchievementSystem.repository;

import com.achieveplus.RewardAchievementSystem.entity.Reward;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository interface for managing Reward entities in the database.
 * This interface extends JpaRepository, providing built-in CRUD operations.
 *
 * JpaRepository<Reward, Long>:
 * - Reward: The entity type this repository manages.
 * - Long: The data type of the primary key (ID) of the Reward entity.
 *
 * By annotating this interface with @Repository, Spring detects it as
 * a component responsible for data access.
 */
@Repository
public interface RewardRepository extends JpaRepository<Reward, Long> {
}