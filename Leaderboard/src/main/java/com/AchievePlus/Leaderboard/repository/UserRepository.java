package com.AchievePlus.Leaderboard.repository;

import com.AchievePlus.Leaderboard.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository  // Marks this interface as a Spring Data JPA repository
public interface UserRepository extends JpaRepository<User, Long> {

    /**
     * Retrieves all users sorted in descending order based on their points.
     * This helps in ranking users for a leaderboard system.
     *
     * @return List of users ordered by points (highest first).
     */
    @Query("SELECT u FROM User u ORDER BY u.points DESC")
    List<User> findAllOrderByPointsDesc();

    /**
     * Retrieves the top N users with the highest points.
     * Uses a native SQL query to fetch a limited number of top-ranking users.
     *
     * @param limit The number of users to retrieve.
     * @return List of top N users sorted by points.
     */
    @Query(value = "SELECT * FROM users ORDER BY points DESC LIMIT ?1", nativeQuery = true)
    List<User> findTopNByPoints(int limit);
}
