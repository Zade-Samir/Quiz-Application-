package com.capgi.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AnalyticsOverviewDTO {

    private Long totalQuizzes;
    private Long totalStudents;
    private Long totalAttempts;
    private Double avgCompletionRate;
    private Double avgScore;
}
