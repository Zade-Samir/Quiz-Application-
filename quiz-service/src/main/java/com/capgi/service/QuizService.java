package com.capgi.service;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import com.capgi.dto.QuestionRequest;
import com.capgi.dto.QuizRequest;
import com.capgi.model.Question;
import com.capgi.model.Quiz;

@Service
public interface QuizService {

	Quiz createQuiz(QuizRequest request, String createdBy);

	Question addQuestion(Long quizId, QuestionRequest request);

	Quiz publishQuiz(Long quizId);

	Page<Quiz> getPublishedQuizzes(int page, int size, String category, String difficulty);

	Page<Quiz> getAllQuizzes(int page, int size, Boolean published);

	Quiz getQuizDetails(Long quizId);

	Quiz updateQuiz(Long quizId, QuizRequest request);

	void deleteQuiz(Long quizId);

	Question updateQuestion(Long questionId, QuestionRequest request);

	void deleteQuestion(Long questionId);

}
