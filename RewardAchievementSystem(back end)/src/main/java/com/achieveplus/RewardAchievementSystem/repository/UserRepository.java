package com.achieveplus.RewardAchievementSystem.repository;

import com.achieveplus.RewardAchievementSystem.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository interface for managing User entities in the database.
 * This interface extends JpaRepository, providing built-in CRUD operations.
 *
 * JpaRepository<User, Long>:
 * - User: The entity type that this repository manages.
 * - Long: The data type of the primary key (ID) of the User entity.
 *
 * The @Repository annotation marks this interface as a Spring Data Repository,
 * allowing Spring to handle dependency injection and automatic database operations.
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
}