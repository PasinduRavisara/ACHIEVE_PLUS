package com.SDGP.ProgressAnalyticsBE.controller;

import com.SDGP.ProgressAnalyticsBE.model.ChartData;
import com.SDGP.ProgressAnalyticsBE.model.TaskMetrics;
import com.SDGP.ProgressAnalyticsBE.model.UserDto;
import com.SDGP.ProgressAnalyticsBE.service.AnalyticsService;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;

@RestController
@RequestMapping("/api/analytics")
@CrossOrigin(origins = "http://localhost:3000") // Adjust this based on your frontend URL
public class AnalyticsController {

    @Autowired
    private AnalyticsService analyticsService;

    @GetMapping("/metrics")
    public TaskMetrics getMetrics(@RequestParam String dateRange, @RequestParam(required = false) Long userId) {
        if (userId != null) {
            return analyticsService.getMetricsByUser(dateRange, userId);
        } else {
            return analyticsService.getMetrics(dateRange);
        }
    }

    @GetMapping("/chart-data")
    public ChartData getChartData(@RequestParam String dateRange, @RequestParam(required = false) Long userId) {
        if (userId != null) {
            return analyticsService.getChartDataByUser(dateRange, userId);
        } else {
            return analyticsService.getChartData(dateRange);
        }
    }

    @GetMapping("/users")
    public List<UserDto> getAllUsers() {
        return analyticsService.getAllUsers();
    }
}