package com.capgi.service;

import java.util.Collections;
import java.util.HashSet;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.capgi.dto.attempt.AttemptRequest;
import com.capgi.dto.quiz.QuizDTO;
//import com.sun.org.apache.bcel.internal.generic.NEW;

@Service
public class ScoringServiceImpl implements ScoringService {

	@Override
	public int computeScore(QuizDTO quiz, AttemptRequest req) {
		//guard clauses
		if (quiz == null || quiz.getQuestions() == null || req == null || req.getAnswers() == null) {
			return 0;
		}
		
		//questionId is merged set of selected options Ids
		Map<Long, Set<Long>> answerByQid = req.getAnswers().stream()
				.filter(a -> a.getQuestionId() != null && a != null)
				.collect(Collectors.toMap(
						a -> a.getQuestionId(), 
						a -> new HashSet<>(
								Optional.ofNullable(a.getSelectedOptionIds())
								.orElse(Collections.emptyList())), 
	(left, right) -> {
		left.addAll(right);
		return left;
	}
						));
		//questionId -> set of correct option ID
		Map<Long, Set<Long>> correctByQid = quiz.getQuestions().stream()
				.filter(q -> q != null && q.getId() != null)
				.collect(Collectors.toMap(q -> q.getId(),
						q -> {
							if (q.getOptions() == null)
								return Collections.emptySet();
							return q.getOptions().stream()
									.filter(o -> o != null && Boolean.TRUE.equals(o.getIsCorrect()))
									.map(o -> o.getId())
									.filter(Objects :: nonNull)
									.collect(Collectors.toSet());
						}));
		
		int score = 0;
		for (Map.Entry<Long, Set<Long>> entry : correctByQid.entrySet()) {
			Long questionId = entry.getKey();
			Set<Long> correct = entry.getValue();
			
			Set<Long> selected = answerByQid.getOrDefault(questionId, Collections.emptySet());
			
			//exact set match
			if (!correct.isEmpty() && selected.equals(correct)) {
				score++;
			}
		}
		return score;
	}

}










