package com.SDGP.ProgressAnalyticsBE.service;

import com.SDGP.ProgressAnalyticsBE.model.ChartData;
import com.SDGP.ProgressAnalyticsBE.model.TaskMetrics;
import com.SDGP.ProgressAnalyticsBE.model.UserDto;
import com.SDGP.ProgressAnalyticsBE.entity.User;
import com.SDGP.ProgressAnalyticsBE.repository.TaskRepository;
import com.SDGP.ProgressAnalyticsBE.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AnalyticsService {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private UserRepository userRepository;

    // Original method for overall metrics
    public TaskMetrics getMetrics(String dateRange) {
        LocalDateTime endDate = LocalDateTime.now();
        LocalDateTime startDate = calculateStartDate(dateRange, endDate);

        TaskMetrics metrics = new TaskMetrics();

        // Get data from repository
        int completedInPeriod = taskRepository.countCompletedTasksInPeriod(startDate, endDate);
        int totalCompleted = taskRepository.countTotalCompletedTasks();
        int inProgress = taskRepository.countTasksInProgress();

        Integer pointsInPeriod = taskRepository.getPointsEarnedInPeriod(startDate, endDate);
        Integer totalPoints = taskRepository.getTotalPointsEarned();

        // Calculate completion rate
        double completionRate = (totalCompleted + inProgress > 0)
                ? ((double) completedInPeriod / (completedInPeriod + inProgress)) * 100
                : 0.0;

        // Set the metrics
        metrics.setTotalTasksCompletedMonth(completedInPeriod);
        metrics.setTotalTasksCompletedOverall(totalCompleted);
        metrics.setTasksInProgress(inProgress);
        metrics.setCompletionRate(Math.round(completionRate * 100.0) / 100.0); // Round to 2 decimal places
        metrics.setPointsEarnedMonth(pointsInPeriod != null ? pointsInPeriod : 0);
        metrics.setPointsEarnedTotal(totalPoints != null ? totalPoints : 0);

        return metrics;
    }

    // User-specific metrics
    public TaskMetrics getMetricsByUser(String dateRange, Long userId) {
        LocalDateTime endDate = LocalDateTime.now();
        LocalDateTime startDate = calculateStartDate(dateRange, endDate);

        TaskMetrics metrics = new TaskMetrics();

        // Get data from repository
        int completedInPeriod = taskRepository.countCompletedTasksInPeriodByUser(userId, startDate, endDate);
        int totalCompleted = taskRepository.countTotalCompletedTasksByUser(userId);
        int inProgress = taskRepository.countTasksInProgressByUser(userId);

        Integer pointsInPeriod = taskRepository.getPointsEarnedInPeriodByUser(userId, startDate, endDate);
        Integer totalPoints = taskRepository.getTotalPointsEarnedByUser(userId);

        // Calculate completion rate
        double completionRate = (totalCompleted + inProgress > 0)
                ? ((double) completedInPeriod / (completedInPeriod + inProgress)) * 100
                : 0.0;

        // Set the metrics
        metrics.setTotalTasksCompletedMonth(completedInPeriod);
        metrics.setTotalTasksCompletedOverall(totalCompleted);
        metrics.setTasksInProgress(inProgress);
        metrics.setCompletionRate(Math.round(completionRate * 100.0) / 100.0); // Round to 2 decimal places
        metrics.setPointsEarnedMonth(pointsInPeriod != null ? pointsInPeriod : 0);
        metrics.setPointsEarnedTotal(totalPoints != null ? totalPoints : 0);

        return metrics;
    }

    // Original chart data method
    public ChartData getChartData(String dateRange) {
        LocalDateTime endDate = LocalDateTime.now();
        LocalDateTime startDate = calculateStartDate(dateRange, endDate);

        ChartData chartData = new ChartData();
        String interval;
        List<String> labels;

        // Set up interval and labels based on date range
        switch (dateRange) {
            case "month":
                interval = "week";
                labels = Arrays.asList("Week 1", "Week 2", "Week 3", "Week 4");
                break;
            case "quarter":
                interval = "month";
                labels = Arrays.asList("Month 1", "Month 2", "Month 3");
                break;
            case "year":
                interval = "quarter";
                labels = Arrays.asList("Q1", "Q2", "Q3", "Q4");
                break;
            default:
                throw new IllegalArgumentException("Invalid date range: " + dateRange);
        }

        // Get data from repository
        List<Integer> completedData = taskRepository.getCompletedTasksByInterval(startDate, endDate, interval);
        List<Integer> inProgressData = taskRepository.getInProgressTasksByInterval(startDate, endDate, interval);

        // Pad the lists if they're shorter than expected
        padList(completedData, labels.size());
        padList(inProgressData, labels.size());

        chartData.setLabels(labels);
        chartData.setDatasets(createDatasets(completedData, inProgressData));

        return chartData;
    }

    // User-specific chart data method
    public ChartData getChartDataByUser(String dateRange, Long userId) {
        LocalDateTime endDate = LocalDateTime.now();
        LocalDateTime startDate = calculateStartDate(dateRange, endDate);

        ChartData chartData = new ChartData();
        String interval;
        List<String> labels;

        // Set up interval and labels based on date range
        switch (dateRange) {
            case "month":
                interval = "week";
                labels = Arrays.asList("Week 1", "Week 2", "Week 3", "Week 4");
                break;
            case "quarter":
                interval = "month";
                labels = Arrays.asList("Month 1", "Month 2", "Month 3");
                break;
            case "year":
                interval = "quarter";
                labels = Arrays.asList("Q1", "Q2", "Q3", "Q4");
                break;
            default:
                throw new IllegalArgumentException("Invalid date range: " + dateRange);
        }

        // Get data from repository for specific user
        List<Integer> completedData = taskRepository.getCompletedTasksByIntervalAndUser(userId, startDate, endDate, interval);
        List<Integer> inProgressData = taskRepository.getInProgressTasksByIntervalAndUser(userId, startDate, endDate, interval);

        // Pad the lists if they're shorter than expected
        padList(completedData, labels.size());
        padList(inProgressData, labels.size());

        chartData.setLabels(labels);
        chartData.setDatasets(createDatasets(completedData, inProgressData));

        return chartData;
    }

    // Get all users for dropdown selection
    public List<UserDto> getAllUsers() {
        return userRepository.findAll().stream()
                .map(user -> new UserDto(user.getId(), user.getName(), user.getEmail(), user.getDepartment()))
                .collect(Collectors.toList());
    }

    private LocalDateTime calculateStartDate(String dateRange, LocalDateTime endDate) {
        return switch (dateRange) {
            case "month" -> endDate.withDayOfMonth(1).withHour(0).withMinute(0).withSecond(0);
            case "quarter" -> endDate.withDayOfMonth(1).minusMonths(2).withHour(0).withMinute(0).withSecond(0);
            case "year" -> endDate.withDayOfMonth(1).withMonth(1).withHour(0).withMinute(0).withSecond(0);
            default -> throw new IllegalArgumentException("Invalid date range: " + dateRange);
        };
    }

    private void padList(List<Integer> list, int expectedSize) {
        while (list.size() < expectedSize) {
            list.add(0);
        }
    }

    private List<ChartData.Dataset> createDatasets(List<Integer> completedData, List<Integer> inProgressData) {
        List<ChartData.Dataset> datasets = new ArrayList<>();

        ChartData.Dataset completed = new ChartData.Dataset();
        completed.setLabel("Tasks Completed");
        completed.setData(completedData);
        completed.setBorderColor("rgb(75, 192, 192)");
        completed.setBackgroundColor("rgba(75, 192, 192, 0.5)");

        ChartData.Dataset inProgress = new ChartData.Dataset();
        inProgress.setLabel("Tasks in Progress");
        inProgress.setData(inProgressData);
        inProgress.setBorderColor("rgb(255, 99, 132)");
        inProgress.setBackgroundColor("rgba(255, 99, 132, 0.5)");

        datasets.add(completed);
        datasets.add(inProgress);

        return datasets;
    }
}

 //MOCK DATA

//import com.SDGP.ProgressAnalyticsBE.model.ChartData;
//import com.SDGP.ProgressAnalyticsBE.model.TaskMetrics;
//import org.springframework.stereotype.Service;
//import java.util.Arrays;
//import java.util.ArrayList;
//import java.util.List;

//@Service
//public class AnalyticsService {
//
//    public TaskMetrics getMetrics(String dateRange) {
//        // TODO: Replace with actual database queries
//        TaskMetrics metrics = new TaskMetrics();
//
//        switch (dateRange) {
//            case "month":
//                metrics.setTotalTasksCompletedMonth(45);
//                metrics.setTotalTasksCompletedOverall(230);
//                metrics.setTasksInProgress(15);
//                metrics.setCompletionRate(75.0);
//                metrics.setPointsEarnedMonth(450);
//                metrics.setPointsEarnedTotal(2300);
//                break;
//            case "quarter":
//                metrics.setTotalTasksCompletedMonth(135);
//                metrics.setTotalTasksCompletedOverall(560);
//                metrics.setTasksInProgress(25);
//                metrics.setCompletionRate(84.0);
//                metrics.setPointsEarnedMonth(1350);
//                metrics.setPointsEarnedTotal(5600);
//                break;
//            case "year":
//                metrics.setTotalTasksCompletedMonth(540);
//                metrics.setTotalTasksCompletedOverall(1200);
//                metrics.setTasksInProgress(60);
//                metrics.setCompletionRate(90.0);
//                metrics.setPointsEarnedMonth(5400);
//                metrics.setPointsEarnedTotal(12000);
//                break;
//        }
//
//        return metrics;
//    }
//
//    public ChartData getChartData(String dateRange) {
//        ChartData chartData = new ChartData();
//
//        switch (dateRange) {
//            case "month":
//                chartData.setLabels(Arrays.asList("Week 1", "Week 2", "Week 3", "Week 4"));
//                chartData.setDatasets(createDatasets(
//                        Arrays.asList(10, 15, 8, 12),
//                        Arrays.asList(5, 7, 4, 6)
//                ));
//                break;
//            case "quarter":
//                chartData.setLabels(Arrays.asList("Month 1", "Month 2", "Month 3"));
//                chartData.setDatasets(createDatasets(
//                        Arrays.asList(45, 52, 38),
//                        Arrays.asList(15, 18, 12)
//                ));
//                break;
//            case "year":
//                chartData.setLabels(Arrays.asList("Q1", "Q2", "Q3", "Q4"));
//                chartData.setDatasets(createDatasets(
//                        Arrays.asList(135, 142, 128, 135),
//                        Arrays.asList(45, 48, 42, 45)
//                ));
//                break;
//        }
//
//        return chartData;
//    }
//
//    private List<ChartData.Dataset> createDatasets(List<Integer> completedData, List<Integer> inProgressData) {
//        List<ChartData.Dataset> datasets = new ArrayList<>();
//
//        ChartData.Dataset completed = new ChartData.Dataset();
//        completed.setLabel("Tasks Completed");
//        completed.setData(completedData);
//        completed.setBorderColor("rgb(75, 192, 192)");
//        completed.setBackgroundColor("rgba(75, 192, 192, 0.5)");
//
//        ChartData.Dataset inProgress = new ChartData.Dataset();
//        inProgress.setLabel("Tasks in Progress");
//        inProgress.setData(inProgressData);
//        inProgress.setBorderColor("rgb(255, 99, 132)");
//        inProgress.setBackgroundColor("rgba(255, 99, 132, 0.5)");
//
//        datasets.add(completed);
//        datasets.add(inProgress);
//
//        return datasets;
//    }
//}

