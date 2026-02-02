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
		quiz.setCategory(request.getCategory());
		quiz.setDuration(request.getDuration());
		quiz.setPassingScore(request.getPassingScore());
		quiz.setDifficulty(request.getDifficulty());
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
	public Page<Quiz> getPublishedQuizzes(int page, int size, String category, String difficulty) {
		PageRequest pageRequest = PageRequest.of(page, size);

		if (category != null && difficulty != null) {
			return quizRepository.findByIsPublishedTrueAndCategoryAndDifficulty(category, difficulty, pageRequest);
		} else if (category != null) {
			return quizRepository.findByIsPublishedTrueAndCategory(category, pageRequest);
		} else if (difficulty != null) {
			return quizRepository.findByIsPublishedTrueAndDifficulty(difficulty, pageRequest);
		} else {
			return quizRepository.findByIsPublishedTrue(pageRequest);
		}
	}

	@Override
	public Page<Quiz> getAllQuizzes(int page, int size, Boolean published) {
		PageRequest pageRequest = PageRequest.of(page, size);

		if (published != null) {
			return quizRepository.findByIsPublished(published, pageRequest);
		} else {
			return quizRepository.findAll(pageRequest);
		}
	}

	@Override
	public Quiz getQuizDetails(Long quizId) {
		return quizRepository.findById(quizId).orElseThrow(() -> new RuntimeException("Quiz not found"));
	}

	@Override
	public Quiz updateQuiz(Long quizId, QuizRequest request) {
		Quiz quiz = quizRepository.findById(quizId).orElseThrow(() -> new RuntimeException("Quiz not found"));

		quiz.setTitle(request.getTitle());
		quiz.setDescription(request.getDescription());
		quiz.setCategory(request.getCategory());
		quiz.setDuration(request.getDuration());
		quiz.setPassingScore(request.getPassingScore());
		quiz.setDifficulty(request.getDifficulty());

		return quizRepository.save(quiz);
	}

	@Override
	public void deleteQuiz(Long quizId) {
		Quiz quiz = quizRepository.findById(quizId).orElseThrow(() -> new RuntimeException("Quiz not found"));
		quizRepository.delete(quiz);
	}

	@Override
	public Question updateQuestion(Long questionId, QuestionRequest request) {
		Question question = questionRepository.findById(questionId)
				.orElseThrow(() -> new RuntimeException("Question not found"));

		question.setText(request.getText());
		question.setType(request.getType());

		// Delete existing options
		optionRepository.deleteAll(question.getOptions());
		question.getOptions().clear();

		// Add new options
		for (OptionRequest optReq : request.getOptions()) {
			Option option = new Option();
			option.setQuestion(question);
			option.setText(optReq.getText());
			option.setIsCorrect(optReq.getIsCorrect());
			optionRepository.save(option);
		}

		return questionRepository.save(question);
	}

	@Override
	public void deleteQuestion(Long questionId) {
		Question question = questionRepository.findById(questionId)
				.orElseThrow(() -> new RuntimeException("Question not found"));
		questionRepository.delete(question);
	}

}
