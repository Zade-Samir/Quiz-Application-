package com.capgi.dto.result;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResultDTO {
    private Long resultId;
    private Long quizId;
    private Long userId;
    private Integer score;
    private Integer durationSecond;
    private LocalDateTime takenAt;
}
