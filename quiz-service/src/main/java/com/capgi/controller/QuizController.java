package com.capgi.controller;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
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

	@GetMapping
	public ResponseEntity<Page<Quiz>> getAllQuizzes(
			@RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "10") int size,
			@RequestParam(required = false) Boolean published) {
		return ResponseEntity.ok(quizService.getAllQuizzes(page, size, published));
	}

	@GetMapping("/{id}")
	public ResponseEntity<Quiz> getQuizDetails(@PathVariable Long id) {
		return ResponseEntity.ok(quizService.getQuizDetails(id));
	}

	@PutMapping("/{id}")
	public ResponseEntity<Quiz> updateQuiz(@PathVariable Long id, @RequestBody QuizRequest request) {
		return ResponseEntity.ok(quizService.updateQuiz(id, request));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteQuiz(@PathVariable Long id) {
		quizService.deleteQuiz(id);
		return ResponseEntity.noContent().build();
	}

	@PostMapping("/{id}/questions")
	public ResponseEntity<Question> addQuestion(@PathVariable Long id, @RequestBody QuestionRequest request) {
		return ResponseEntity.status(HttpStatus.CREATED).body(quizService.addQuestion(id, request));
	}

	@PutMapping("/questions/{questionId}")
	public ResponseEntity<Question> updateQuestion(@PathVariable Long questionId,
			@RequestBody QuestionRequest request) {
		return ResponseEntity.ok(quizService.updateQuestion(questionId, request));
	}

	@DeleteMapping("/questions/{questionId}")
	public ResponseEntity<Void> deleteQuestion(@PathVariable Long questionId) {
		quizService.deleteQuestion(questionId);
		return ResponseEntity.noContent().build();
	}

	@PutMapping("/{id}/publish")
	public ResponseEntity<Quiz> publishQuiz(@PathVariable Long id) {
		return ResponseEntity.ok(quizService.publishQuiz(id));
	}

	@GetMapping("/published")
	public ResponseEntity<Page<Quiz>> getPublishedQuizzes(
			@RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "10") int size,
			@RequestParam(required = false) String category,
			@RequestParam(required = false) String difficulty) {
		return ResponseEntity.ok(quizService.getPublishedQuizzes(page, size, category, difficulty));
	}

}
