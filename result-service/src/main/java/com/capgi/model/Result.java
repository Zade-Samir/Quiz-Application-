package com.capgi.model;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "result")
public class Result {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long resultId;

	private Long quizId;
	private Long userId;
	private Integer score;
	private Integer durationSecond;
	private LocalDateTime takenAt;

	// Denormalized fields for performance
	private String username;
	private String quizTitle;
	private Integer totalQuestions;
	private Integer correctAnswers;
	private Integer incorrectAnswers;
}
