package com.sdgp.achieveplus.repository;


import com.sdgp.achieveplus.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByAssignedToId(Long userId);
    List<Task> findByStatus(String status);
}
