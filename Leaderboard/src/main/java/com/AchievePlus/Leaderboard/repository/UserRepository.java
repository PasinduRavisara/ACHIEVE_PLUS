package com.AchievePlus.Leaderboard.repository;

import com.AchievePlus.Leaderboard.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // Find all users ordered by points in descending order
    @Query("SELECT u FROM User u ORDER BY u.points DESC")
    List<User> findAllOrderByPointsDesc();

    // Optional: Find top N users by points
    @Query(value = "SELECT * FROM users ORDER BY points DESC LIMIT ?1", nativeQuery = true)
    List<User> findTopNByPoints(int limit);
}