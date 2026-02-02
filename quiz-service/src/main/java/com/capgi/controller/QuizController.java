package com.capgi.controller;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.capgi.dto.QuestionRequest;
import com.capgi.dto.QuizRequest;
import com.capgi.model.Question;
import com.capgi.model.Quiz;
import com.capgi.service.QuizService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/quizzes")
@RequiredArgsConstructor
public class QuizController {

	public final QuizService quizService;

	@PostMapping
	public ResponseEntity<Quiz> createQuiz(@RequestBody QuizRequest request) {
		String username = org.springframework.security.core.context.SecurityContextHolder.getContext()
				.getAuthentication().getName();
		return ResponseEntity.status(HttpStatus.CREATED).body(quizService.createQuiz(request, username));
	}

	@PostMapping("/{id}/questions")
	public ResponseEntity<Question> addQuestion(@PathVariable Long id, @RequestBody QuestionRequest request) {
		return ResponseEntity.status(HttpStatus.CREATED).body(quizService.addQuestion(id, request));
	}

	// get list of published quizzes
	@PutMapping("/{id}/publish")
	public ResponseEntity<Quiz> publishQuiz(@PathVariable Long id) {
		return ResponseEntity.ok(quizService.publishQuiz(id));
	}

	@GetMapping("/published")
	public ResponseEntity<Page<Quiz>> getPublishedQuizzes(@RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "10") int size) {
		return ResponseEntity.ok(quizService.getPublishedQuizzes(page, size));
	}

	@GetMapping("/{id}")
	public ResponseEntity<Quiz> getQuizDetails(@PathVariable Long id) {
		return ResponseEntity.ok(quizService.getQuizDetails(id));
	}

}
