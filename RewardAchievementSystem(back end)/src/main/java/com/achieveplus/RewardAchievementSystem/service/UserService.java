package com.achieveplus.RewardAchievementSystem.service;

import com.achieveplus.RewardAchievementSystem.entity.Task;
import com.achieveplus.RewardAchievementSystem.entity.User;
import com.achieveplus.RewardAchievementSystem.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;

    // Constructor for dependency injection of the UserRepository
    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Retrieves a list of tasks assigned to a user by their user ID.
     *
     * @param userId The ID of the user whose tasks are being fetched.
     * @return A list of tasks associated with the given user ID.
     * @throws RuntimeException if the user is not found.
     */
    public List<Task> getUserTasks(Long userId) {
        // Fetch the user by ID and get the associated tasks, or throw an exception if the user is not found
        return userRepository.findById(userId)
                .map(User::getTasks)// Map the user object to their tasks list
                .orElseThrow(() -> new RuntimeException("User not found")); // Throw an exception if user is not found
    }
}