package com.AchievePlus.Leaderboard.config;

import com.AchievePlus.Leaderboard.model.User;
import com.AchievePlus.Leaderboard.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;

    @Autowired
    public DataInitializer(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public void run(String... args) {
        // Only add sample data if the database is empty
        if (userRepository.count() == 0) {
            // Add initial users as shown in your frontend
            userRepository.save(new User("Androo", 80, "https://example.com/androo.jpg"));
            userRepository.save(new User("Ann", 75, "https://example.com/ann.jpg"));
            userRepository.save(new User("Smith", 60, "https://example.com/smith.jpg"));
            userRepository.save(new User("John", 43, "https://example.com/john.jpg"));
            userRepository.save(new User("Natasha", 40, "https://example.com/natasha.jpg"));
            userRepository.save(new User("Taniya", 35, "https://example.com/taniya.jpg"));

            // Add more sample users
            userRepository.save(new User("Michael", 30, "https://example.com/michael.jpg"));
            userRepository.save(new User("Sarah", 28, "https://example.com/sarah.jpg"));
            userRepository.save(new User("David", 25, "https://example.com/david.jpg"));
            userRepository.save(new User("Emily", 22, "https://example.com/emily.jpg"));
        }
    }
}