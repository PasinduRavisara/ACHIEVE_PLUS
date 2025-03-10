package com.achieveplus.RewardAchievementSystem.service;

import com.achieveplus.RewardAchievementSystem.entity.User;
import com.achieveplus.RewardAchievementSystem.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class UserInitializationService {
    private final UserRepository userRepository;
    private final TaskRewardService taskRewardService;

    // Constructor for dependency injection of UserRepository and TaskRewardService
    @Autowired
    public UserInitializationService(
            UserRepository userRepository,
            TaskRewardService taskRewardService) {
        this.userRepository = userRepository;
        this.taskRewardService = taskRewardService;
    }

    /**
     * Initializes a new user with the specified username and a set of tasks and rewards.
     *
     * @param username The username of the new user.
     * @param initialTaskCount The number of tasks to assign to the new user.
     * @return The created User object after being saved in the repository.
     */
    public User initializeNewUser(String username, int initialTaskCount) {
        // Create a new user object and set the initial values
        User user = new User();
        user.setUsername(username);
        user.setTotalPoints(0);
        user = userRepository.save(user);

        // Initialize tasks and rewards
        taskRewardService.initializeUserTasks(user, initialTaskCount);

        return userRepository.save(user);
    }
}