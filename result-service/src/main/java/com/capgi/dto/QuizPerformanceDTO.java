package com.capgi.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class QuizPerformanceDTO {

    private Long quizId;
    private String quizTitle;
    private Long attempts;
    private Double avgScore;
    private Double completionRate;
}
