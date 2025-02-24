package com.sdgp.achieveplus.controller;

import com.sdgp.achieveplus.model.Task;
import com.sdgp.achieveplus.service.TaskService;
import com.sdgp.achieveplus.dto.TaskDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "http://localhost:5174") // Adjust according to your Vite frontend URL
public class TaskController {
    @Autowired
    private TaskService taskService;

    @GetMapping
    public List<Task> getAllTasks() {
        return taskService.getAllTasks();
    }

    @GetMapping("/user/{userId}")
    public List<Task> getTasksByUser(@PathVariable Long userId) {
        return taskService.getTasksByUserId(userId);
    }

    @PostMapping
    public Task createTask(@RequestBody TaskDTO taskDTO) {
        return taskService.createTask(taskDTO);
    }

    @PutMapping("/{id}")
    public Task updateTask(@PathVariable Long id, @RequestBody TaskDTO taskDTO) {
        return taskService.updateTask(id, taskDTO);
    }

//    @PatchMapping("/{id}/status")
//    public Task updateTaskStatus(@PathVariable Long id, @RequestBody String status) {
//        return taskService.updateTaskStatus(id, status);
//    }
// ✅ Fix: Properly extract "status" field from JSON
@PatchMapping("/{id}/status")
public Task updateTaskStatus(@PathVariable Long id, @RequestBody Map<String, String> requestBody) {
    String newStatus = requestBody.get("status");  // Extract status from JSON
    return taskService.updateTaskStatus(id, newStatus);
}


}