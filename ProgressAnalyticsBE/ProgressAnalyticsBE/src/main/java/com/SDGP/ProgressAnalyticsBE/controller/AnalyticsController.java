package com.SDGP.ProgressAnalyticsBE.controller;

import com.SDGP.ProgressAnalyticsBE.model.ChartData;
import com.SDGP.ProgressAnalyticsBE.model.TaskMetrics;
import com.SDGP.ProgressAnalyticsBE.service.AnalyticsService;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/analytics")
@CrossOrigin(origins = "http://localhost:5173") // Adjust this based on your frontend URL
public class AnalyticsController {

    @Autowired
    private AnalyticsService analyticsService;

    @GetMapping("/metrics")
    public TaskMetrics getMetrics(@RequestParam String dateRange) {
        return analyticsService.getMetrics(dateRange);
    }

    @GetMapping("/chart-data")
    public ChartData getChartData(@RequestParam String dateRange) {
        return analyticsService.getChartData(dateRange);
    }
}