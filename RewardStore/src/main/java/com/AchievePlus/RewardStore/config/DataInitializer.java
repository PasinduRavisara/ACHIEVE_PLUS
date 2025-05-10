package com.AchievePlus.RewardStore.config;

import com.AchievePlus.RewardStore.model.Reward;
import com.AchievePlus.RewardStore.model.User;
import com.AchievePlus.RewardStore.repository.RewardRepository;
import com.AchievePlus.RewardStore.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final RewardRepository rewardRepository;

    @Override
    public void run(String... args) {
        // Create sample user
        User user = new User();
        user.setUsername("demouser");
        user.setEmail("demo@example.com");
        user.setPoints(12345);
        userRepository.save(user);

        // Create sample rewards
        Reward reward1 = new Reward();
        reward1.setName("Reward 1");
        reward1.setDescription("Smartphone");
        reward1.setPointsCost(10000);
        reward1.setImageUrl("/images/smartphone.jpg");
        rewardRepository.save(reward1);

        Reward reward2 = new Reward();
        reward2.setName("Reward 2");
        reward2.setDescription("Movie Ticket");
        reward2.setPointsCost(1000);
        reward2.setImageUrl("/images/ticket.jpg");
        rewardRepository.save(reward2);

        Reward reward3 = new Reward();
        reward3.setName("Reward 3");
        reward3.setDescription("Cash Reward");
        reward3.setPointsCost(200);
        reward3.setImageUrl("/images/cash.jpg");
        rewardRepository.save(reward3);

        System.out.println("Sample data initialized");
    }
}