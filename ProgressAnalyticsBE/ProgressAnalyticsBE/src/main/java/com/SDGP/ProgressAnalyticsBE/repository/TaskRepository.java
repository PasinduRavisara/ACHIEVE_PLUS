package com.SDGP.ProgressAnalyticsBE.repository;

import com.SDGP.ProgressAnalyticsBE.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.time.LocalDateTime;
import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {

    @Query("SELECT COUNT(t) FROM Task t WHERE t.status = 'COMPLETED' AND t.completedAt BETWEEN :startDate AND :endDate")
    int countCompletedTasksInPeriod(@Param("startDate") LocalDateTime startDate, @Param("endDate") LocalDateTime endDate);

    @Query("SELECT COUNT(t) FROM Task t WHERE t.status = 'COMPLETED'")
    int countTotalCompletedTasks();

    @Query("SELECT COUNT(t) FROM Task t WHERE t.status = 'IN_PROGRESS'")
    int countTasksInProgress();

    @Query("SELECT SUM(t.points) FROM Task t WHERE t.status = 'COMPLETED' AND t.completedAt BETWEEN :startDate AND :endDate")
    Integer getPointsEarnedInPeriod(@Param("startDate") LocalDateTime startDate, @Param("endDate") LocalDateTime endDate);

    @Query("SELECT SUM(t.points) FROM Task t WHERE t.status = 'COMPLETED'")
    Integer getTotalPointsEarned();

    // Modified queries to use MySQL's DATE_FORMAT instead of DATE_TRUNC
    @Query(value = "SELECT COUNT(*) FROM tasks t WHERE t.status = 'COMPLETED' AND t.completed_at BETWEEN :startDate AND :endDate GROUP BY " +
            "CASE :interval " +
            "WHEN 'week' THEN WEEK(t.completed_at) " +
            "WHEN 'month' THEN MONTH(t.completed_at) " +
            "WHEN 'quarter' THEN QUARTER(t.completed_at) END", nativeQuery = true)
    List<Integer> getCompletedTasksByInterval(@Param("startDate") LocalDateTime startDate,
                                              @Param("endDate") LocalDateTime endDate,
                                              @Param("interval") String interval);

    @Query(value = "SELECT COUNT(*) FROM tasks t WHERE t.status = 'IN_PROGRESS' AND t.created_at BETWEEN :startDate AND :endDate GROUP BY " +
            "CASE :interval " +
            "WHEN 'week' THEN WEEK(t.created_at) " +
            "WHEN 'month' THEN MONTH(t.created_at) " +
            "WHEN 'quarter' THEN QUARTER(t.created_at) END", nativeQuery = true)
    List<Integer> getInProgressTasksByInterval(@Param("startDate") LocalDateTime startDate,
                                               @Param("endDate") LocalDateTime endDate,
                                               @Param("interval") String interval);
}

