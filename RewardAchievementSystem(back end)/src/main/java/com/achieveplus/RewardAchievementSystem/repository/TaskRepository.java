package com.achieveplus.RewardAchievementSystem.repository;

import com.achieveplus.RewardAchievementSystem.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository interface for managing Task entities in the database.
 * This interface extends JpaRepository, which provides built-in CRUD operations.
 *
 * JpaRepository<Task, Long>:
 * - Task: The entity type managed by this repository.
 * - Long: The data type of the primary key (ID) of the Task entity.
 *
 * The @Repository annotation indicates that this interface is a Spring
 * repository component, allowing Spring to handle dependency injection
 * and database operations automatically.
 */
@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
}