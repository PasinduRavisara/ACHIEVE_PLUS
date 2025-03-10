package com.achieveplus.RewardAchievementSystem.service;

import com.achieveplus.RewardAchievementSystem.entity.Reward;
import com.achieveplus.RewardAchievementSystem.entity.Task;
import com.achieveplus.RewardAchievementSystem.entity.User;
import com.achieveplus.RewardAchievementSystem.repository.RewardRepository;
import com.achieveplus.RewardAchievementSystem.repository.TaskRepository;
import com.achieveplus.RewardAchievementSystem.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.ArrayList;

@Service
@Transactional
public class TaskRewardService {
    private final TaskRepository taskRepository;
    private final RewardRepository rewardRepository;
    private final UserRepository userRepository;

    @Autowired
    public TaskRewardService(
            TaskRepository taskRepository,
            RewardRepository rewardRepository,
            UserRepository userRepository) {
        this.taskRepository = taskRepository;
        this.rewardRepository = rewardRepository;
        this.userRepository = userRepository;
    }

    public Task createTaskWithReward(String taskName, String rewardName, User user) {
        // Create and save task
        Task task = new Task();
        task.setName(taskName);
        task.setCompleted(false);
        task.setUser(user);

        // Create and save reward
        Reward reward = new Reward();
        reward.setName(rewardName);
        reward.setClaimed(false);
        reward.setUser(user);
        reward.setTask(task);

        // Save task first (to get ID)
        task = taskRepository.save(task);

        // Set task's reward and save
        reward = rewardRepository.save(reward);
        task.setReward(reward);

        return taskRepository.save(task);
    }

    // Initialize a user with a set of tasks and corresponding rewards
    public List<Task> initializeUserTasks(User user, int numberOfTasks) {
        List<Task> tasks = new ArrayList<>();

        for (int i = 1; i <= numberOfTasks; i++) {
            Task task = createTaskWithReward(
                    "Task " + i,
                    "Reward " + i,
                    user
            );
            tasks.add(task);
        }

        return tasks;
    }
}