package com.capgi.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserStatsDTO {

    private Long userId;
    private String username;
    private Integer quizzesTaken;
    private Double avgScore;
    private Integer totalScore;
    private String status;
}
