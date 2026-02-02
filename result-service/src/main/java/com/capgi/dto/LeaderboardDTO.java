package com.capgi.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LeaderboardDTO {

    private Long userId;
    private String username;
    private Integer score;
    private Integer durationSecond;
    private LocalDateTime takenAt;
    private Integer rank;
    private Integer quizzesTaken;
    private Double avgScore;

    public LeaderboardDTO(Long userId, String username, Integer score, Integer durationSecond, LocalDateTime takenAt) {
        this.userId = userId;
        this.username = username;
        this.score = score;
        this.durationSecond = durationSecond;
        this.takenAt = takenAt;
    }
}
