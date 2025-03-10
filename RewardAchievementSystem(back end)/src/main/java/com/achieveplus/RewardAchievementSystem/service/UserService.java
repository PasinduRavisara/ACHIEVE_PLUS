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

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<Task> getUserTasks(Long userId) {
        return userRepository.findById(userId)
                .map(User::getTasks)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}