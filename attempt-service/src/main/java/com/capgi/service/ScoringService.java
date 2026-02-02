package com.capgi.service;

import com.capgi.dto.attempt.AttemptRequest;
import com.capgi.dto.quiz.QuizDTO;

public interface ScoringService {

	public int computeScore(QuizDTO quiz, AttemptRequest request);
}
