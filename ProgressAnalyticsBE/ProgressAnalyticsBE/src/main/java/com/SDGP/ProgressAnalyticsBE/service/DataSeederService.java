package com.SDGP.ProgressAnalyticsBE.service;

import com.SDGP.ProgressAnalyticsBE.entity.Task;
import com.SDGP.ProgressAnalyticsBE.entity.User;
import com.SDGP.ProgressAnalyticsBE.repository.TaskRepository;
import com.SDGP.ProgressAnalyticsBE.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Arrays;
import java.util.List;
import java.util.Random;

@Component
public class DataSeederService implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TaskRepository taskRepository;

    private final Random random = new Random();

    @Override
    public void run(String... args) {
        // Clear existing data
        taskRepository.deleteAll();
        userRepository.deleteAll();

        // Create users
        List<User> users = createUsers();
        userRepository.saveAll(users);

        // Create tasks for each user
        for (User user : users) {
            createTasksForUser(user);
        }
    }

    private List<User> createUsers() {
        return Arrays.asList(
                new User("John Smith", "john.smith@company.com", "Engineering"),
                new User("Emily Johnson", "emily.johnson@company.com", "Marketing"),
                new User("Michael Brown", "michael.brown@company.com", "Finance"),
                new User("Jessica Davis", "jessica.davis@company.com", "Human Resources"),
                new User("David Wilson", "david.wilson@company.com", "Product")
        );
    }

    private void createTasksForUser(User user) {
        LocalDateTime now = LocalDateTime.now();

        // Create tasks with different patterns based on department
        int completedTasksCount;
        int inProgressTasksCount;
        int basePoints;

        switch (user.getDepartment()) {
            case "Engineering":
                completedTasksCount = 15 + random.nextInt(10);
                inProgressTasksCount = 5 + random.nextInt(5);
                basePoints = 10;
                break;
            case "Marketing":
                completedTasksCount = 20 + random.nextInt(15);
                inProgressTasksCount = 3 + random.nextInt(5);
                basePoints = 8;
                break;
            case "Finance":
                completedTasksCount = 10 + random.nextInt(8);
                inProgressTasksCount = 2 + random.nextInt(3);
                basePoints = 12;
                break;
            default:
                completedTasksCount = 12 + random.nextInt(10);
                inProgressTasksCount = 4 + random.nextInt(4);
                basePoints = 9;
                break;
        }

        // Create completed tasks
        for (int i = 0; i < completedTasksCount; i++) {
            // Generate completion dates that span across the last year
            int daysAgo = random.nextInt(365);
            LocalDateTime completedAt = now.minusDays(daysAgo);
            LocalDateTime createdAt = completedAt.minusDays(random.nextInt(14) + 1);

            int points = basePoints + random.nextInt(10);

            Task task = new Task(
                    "Task " + (i + 1) + " for " + user.getName(),
                    "Description for task " + (i + 1),
                    "COMPLETED",
                    points,
                    createdAt,
                    completedAt,
                    user
            );

            taskRepository.save(task);
        }

        // Create in-progress tasks
        for (int i = 0; i < inProgressTasksCount; i++) {
            int daysAgo = random.nextInt(30);
            LocalDateTime createdAt = now.minusDays(daysAgo);

            int points = basePoints + random.nextInt(10);

            Task task = new Task(
                    "In Progress Task " + (i + 1) + " for " + user.getName(),
                    "Description for in-progress task " + (i + 1),
                    "IN_PROGRESS",
                    points,
                    createdAt,
                    null,
                    user
            );

            taskRepository.save(task);
        }
    }
}