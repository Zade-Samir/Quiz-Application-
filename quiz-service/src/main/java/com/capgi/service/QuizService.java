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

	Page<Quiz> getPublishedQuizzes(int page, int size);

	Quiz getQuizDetails(Long quizId);

}
