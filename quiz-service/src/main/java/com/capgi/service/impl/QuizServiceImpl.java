package com.capgi.service.impl;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.capgi.dto.OptionRequest;
import com.capgi.dto.QuestionRequest;
import com.capgi.dto.QuizRequest;
import com.capgi.model.Option;
import com.capgi.model.Question;
import com.capgi.model.Quiz;
import com.capgi.repo.OptionRepo;
import com.capgi.repo.QuestionRepo;
import com.capgi.repo.QuizRepo;
import com.capgi.service.QuizService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class QuizServiceImpl implements QuizService {

	private final QuizRepo quizRepository;
	private final QuestionRepo questionRepository;
	private final OptionRepo optionRepository;
	
	@Override
	public Quiz createQuiz(QuizRequest request, String createdBy) {
		Quiz quiz = new Quiz();
		quiz.setTitle(request.getTitle());
		quiz.setDescription(request.getDescription());
		quiz.setCreatedBy(createdBy);
		return quizRepository.save(quiz);
	}
	
	@Override
	public Question addQuestion(Long quizId, QuestionRequest request) {
		
		Quiz quiz = quizRepository.findById(quizId).orElseThrow(() -> new RuntimeException("Quiz not found"));
		
		Question question = new Question();
		question.setQuiz(quiz);
		question.setText(request.getText());
		question.setType(request.getType());
		
		question = questionRepository.save(question);
		
		for (OptionRequest optReq : request.getOptions()) {
			Option option = new Option();
			option.setQuestion(question);
			option.setText(optReq.getText());
			option.setIsCorrect(optReq.getIsCorrect());
			
			optionRepository.save(option);
		}
		
		return question;
	}
	
	@Override
	public Quiz publishQuiz(Long quizId) {
		Quiz quiz = quizRepository.findById(quizId).orElseThrow(() -> new RuntimeException("Quiz not found"));
		
		quiz.setIsPublished(true);
		return quizRepository.save(quiz);
	}
	
	@Override
	public Page<Quiz> getPublishedQuizzes(int page, int size) {
		return quizRepository.findByIsPublishedTrue(PageRequest.of(page, size));
	}
	
	@Override
	public Quiz getQuizDetails(Long quizId) {
		return quizRepository.findById(quizId).orElseThrow(() -> new RuntimeException("Quiz not found"));
	}
	
}















