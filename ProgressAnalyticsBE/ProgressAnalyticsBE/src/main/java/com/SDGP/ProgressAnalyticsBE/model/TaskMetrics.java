package com.SDGP.ProgressAnalyticsBE.model;

import lombok.Data;

@Data
public class TaskMetrics {
    private int totalTasksCompletedMonth;
    private int totalTasksCompletedOverall;
    private int tasksInProgress;
    private double completionRate;
    private int pointsEarnedMonth;
    private int pointsEarnedTotal;

    public int getTotalTasksCompletedMonth() {
        return totalTasksCompletedMonth;
    }

    public void setTotalTasksCompletedMonth(int totalTasksCompletedMonth) {
        this.totalTasksCompletedMonth = totalTasksCompletedMonth;
    }

    public int getTotalTasksCompletedOverall() {
        return totalTasksCompletedOverall;
    }

    public void setTotalTasksCompletedOverall(int totalTasksCompletedOverall) {
        this.totalTasksCompletedOverall = totalTasksCompletedOverall;
    }

    public int getTasksInProgress() {
        return tasksInProgress;
    }

    public void setTasksInProgress(int tasksInProgress) {
        this.tasksInProgress = tasksInProgress;
    }

    public double getCompletionRate() {
        return completionRate;
    }

    public void setCompletionRate(double completionRate) {
        this.completionRate = completionRate;
    }

    public int getPointsEarnedMonth() {
        return pointsEarnedMonth;
    }

    public void setPointsEarnedMonth(int pointsEarnedMonth) {
        this.pointsEarnedMonth = pointsEarnedMonth;
    }

    public int getPointsEarnedTotal() {
        return pointsEarnedTotal;
    }

    public void setPointsEarnedTotal(int pointsEarnedTotal) {
        this.pointsEarnedTotal = pointsEarnedTotal;
    }
}
