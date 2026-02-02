package com.capgi.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.capgi.dto.attempt.AttemptRequest;
import com.capgi.dto.attempt.AttemptResponse;
import com.capgi.service.ScoringService;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/attempts")
public class AttemptController {

	private final com.capgi.service.JWTService jwtService;
	private final com.capgi.service.ScoringService scoringService;
	private final com.capgi.client.QuizClient quizClient;
	private final com.capgi.client.ResultClient resultClient;

	@PostMapping("/quizzes/{quizId}")
	public ResponseEntity<AttemptResponse> submitAttempt(@PathVariable Long quizId,
			@RequestHeader(name = "Authorization") String token, @Valid @RequestBody AttemptRequest attempt) {

		Long userId = jwtService.extractUserId(token.substring(7));

		// 1. Fetch Quiz Details
		com.capgi.dto.quiz.QuizDTO quiz = quizClient.getQuizById(quizId);

		// 2. Compute Score
		int score = scoringService.computeScore(quiz, attempt);

		// 3. Save Result
		com.capgi.dto.result.ResultDTO resultDTO = new com.capgi.dto.result.ResultDTO();
		resultDTO.setQuizId(quizId);
		resultDTO.setUserId(userId);
		resultDTO.setScore(score);
		resultDTO.setDurationSecond(0); // TODO: Pass duration from frontend
		resultDTO.setTakenAt(java.time.LocalDateTime.now());

		resultClient.createResult(token, resultDTO);

		// 4. Return Response
		return ResponseEntity.ok(new AttemptResponse(score, quiz.getQuestions().size()));
	}
}
