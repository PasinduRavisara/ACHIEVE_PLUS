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

    @Autowired
    public UserInitializationService(
            UserRepository userRepository,
            TaskRewardService taskRewardService) {
        this.userRepository = userRepository;
        this.taskRewardService = taskRewardService;
    }

    public User initializeNewUser(String username, int initialTaskCount) {
        // Create new user with 0 points
        User user = new User();
        user.setUsername(username);
        user.setTotalPoints(0);
        user = userRepository.save(user);

        // Initialize tasks and rewards
        taskRewardService.initializeUserTasks(user, initialTaskCount);

        return userRepository.save(user);
    }
}