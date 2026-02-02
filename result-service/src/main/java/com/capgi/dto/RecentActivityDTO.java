package com.capgi.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RecentActivityDTO {

    private String username;
    private String quizTitle;
    private Integer score;
    private LocalDateTime takenAt;
}
