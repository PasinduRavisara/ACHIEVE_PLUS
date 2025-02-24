package com.sdgp.achieveplus.service;

import com.sdgp.achieveplus.model.Task;
import com.sdgp.achieveplus.model.User;
import com.sdgp.achieveplus.repository.TaskRepository;
import com.sdgp.achieveplus.repository.UserRepository;
import com.sdgp.achieveplus.dto.TaskDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;

//@Service
//public class TaskService {
//    @Autowired
//    private TaskRepository taskRepository;
//
//    @Autowired
//    private UserRepository userRepository;
//
//    public List<Task> getAllTasks() {
//        return taskRepository.findAll();
//    }
//
//    public List<Task> getTasksByUserId(Long userId) {
//        return taskRepository.findByAssignedToId(userId);
//    }
//
//    @Transactional
//    public Task createTask(TaskDTO taskDTO) {
//        Task task = new Task();
//        updateTaskFromDTO(task, taskDTO);
//        return taskRepository.save(task);
//    }
//
//    @Transactional
//    public Task updateTask(Long id, TaskDTO taskDTO) {
//        Task task = taskRepository.findById(id)
//                .orElseThrow(() -> new RuntimeException("Task not found"));
//        updateTaskFromDTO(task, taskDTO);
//        return taskRepository.save(task);
//    }
//
//    @Transactional
//    public Task updateTaskStatus(Long taskId, String newStatus) {
//        Task task = taskRepository.findById(taskId)
//                .orElseThrow(() -> new RuntimeException("Task not found"));
//
//        task.setStatus(newStatus);
//
//        if ("completed".equals(newStatus)) {
//            int pointsAwarded = calculatePoints(task);
//            task.setPointsAwarded(pointsAwarded);
//
//            // Update user points
//            User user = task.getAssignedTo();
//            user.setPoints(user.getPoints() + pointsAwarded);
//            userRepository.save(user);
//        }
//
//        return taskRepository.save(task);
//    }
//
//    private void updateTaskFromDTO(Task task, TaskDTO dto) {
//        task.setTitle(dto.getTitle());
//        task.setDescription(dto.getDescription());
//        task.setDueDate(dto.getDueDate());
//        task.setStatus(dto.getStatus());
//        task.setPriority(dto.getPriority());
//        task.setPointsAwarded(dto.getPointsAwarded());
//
//        if (dto.getAssignedTo() != null) {
//            User user = userRepository.findById(dto.getAssignedTo())
//                    .orElseThrow(() -> new RuntimeException("User not found"));
//            task.setAssignedTo(user);
//        }
//    }
//
//    private int calculatePoints(Task task) {
//        LocalDate now = LocalDate.now();
//        LocalDate dueDate = task.getDueDate();
//
//        if (now.isBefore(dueDate) || now.isEqual(dueDate)) {
//            long daysEarly = ChronoUnit.DAYS.between(now, dueDate);
//            return 10 + (int)(daysEarly * 2); // Base points + early completion bonus
//        }
//        return 5; // Base points for completion
//    }
//}

@Service
public class TaskService {
    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private UserRepository userRepository;

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public List<Task> getTasksByUserId(Long userId) {
        return taskRepository.findByAssignedToId(userId);
    }

    @Transactional
    public Task createTask(TaskDTO taskDTO) {
        Task task = new Task();
        updateTaskFromDTO(task, taskDTO);
        return taskRepository.save(task);
    }

    @Transactional
    public Task updateTask(Long id, TaskDTO taskDTO) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));
        updateTaskFromDTO(task, taskDTO);
        return taskRepository.save(task);
    }

    @Transactional
    public Task updateTaskStatus(Long taskId, String newStatus) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        if (!isValidStatus(newStatus)) {
            throw new IllegalArgumentException("Invalid task status: " + newStatus);
        }

        task.setStatus(newStatus);

        if ("completed".equals(newStatus)) {
            int pointsAwarded = calculatePoints(task);
            task.setPointsAwarded(pointsAwarded);

            // Update user points only if task has an assigned user
            Optional.ofNullable(task.getAssignedTo()).ifPresent(user -> {
                user.setPoints(user.getPoints() + pointsAwarded);
                userRepository.save(user);
            });
        }

        return taskRepository.save(task);
    }

    private void updateTaskFromDTO(Task task, TaskDTO dto) {
        task.setTitle(dto.getTitle());
        task.setDescription(dto.getDescription());
        task.setDueDate(dto.getDueDate());
        task.setStatus(dto.getStatus());
        task.setPriority(dto.getPriority());
        task.setPointsAwarded(dto.getPointsAwarded());

        if (dto.getAssignedTo() != null) {
            User user = userRepository.findById(dto.getAssignedTo())
                    .orElseThrow(() -> new RuntimeException("User not found"));
            task.setAssignedTo(user);
        }
    }

    private int calculatePoints(Task task) {
        LocalDate now = LocalDate.now();
        LocalDate dueDate = task.getDueDate();

        if (now.isBefore(dueDate) || now.isEqual(dueDate)) {
            long daysEarly = ChronoUnit.DAYS.between(now, dueDate);
            return 10 + (int) (daysEarly * 2); // Base points + early completion bonus
        }
        return 5; // Base points for late completion
    }

    private boolean isValidStatus(String status) {
        return "pending".equals(status) || "in_progress".equals(status) || "completed".equals(status);
    }
}