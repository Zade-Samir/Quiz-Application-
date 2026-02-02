package com.capgi.service;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.Arrays;
import java.util.Collections;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;

import com.capgi.dto.attempt.AnswerDTO;
import com.capgi.dto.attempt.AttemptRequest;
import com.capgi.dto.quiz.OptionDTO;
import com.capgi.dto.quiz.QuestionDTO;
import com.capgi.dto.quiz.QuizDTO;

@ExtendWith(MockitoExtension.class)
public class ScoringServiceImplTest {

    @InjectMocks
    private ScoringServiceImpl scoringService;

    private QuizDTO quizDTO;
    private AttemptRequest attemptRequest;

    @BeforeEach
    void setUp() {
        quizDTO = new QuizDTO();
        QuestionDTO q1 = new QuestionDTO();
        q1.setId(1L);
        OptionDTO o1 = new OptionDTO(1L, "A", true);
        OptionDTO o2 = new OptionDTO(2L, "B", false);
        q1.setOptions(Arrays.asList(o1, o2));

        QuestionDTO q2 = new QuestionDTO();
        q2.setId(2L);
        OptionDTO o3 = new OptionDTO(3L, "C", false);
        OptionDTO o4 = new OptionDTO(4L, "D", true);
        q2.setOptions(Arrays.asList(o3, o4));

        quizDTO.setQuestions(Arrays.asList(q1, q2));
    }

    @Test
    void testComputeScore_AllCorrect() {
        attemptRequest = new AttemptRequest();
        AnswerDTO a1 = new AnswerDTO();
        a1.setQuestionId(1L);
        a1.setSelectedOptionIds(Collections.singletonList(1L));

        AnswerDTO a2 = new AnswerDTO();
        a2.setQuestionId(2L);
        a2.setSelectedOptionIds(Collections.singletonList(4L));

        attemptRequest.setAnswers(Arrays.asList(a1, a2));

        int score = scoringService.computeScore(quizDTO, attemptRequest);
        assertEquals(2, score);
    }

    @Test
    void testComputeScore_Mixed() {
        attemptRequest = new AttemptRequest();
        AnswerDTO a1 = new AnswerDTO();
        a1.setQuestionId(1L);
        a1.setSelectedOptionIds(Collections.singletonList(1L)); // Correct

        AnswerDTO a2 = new AnswerDTO();
        a2.setQuestionId(2L);
        a2.setSelectedOptionIds(Collections.singletonList(3L)); // Incorrect

        attemptRequest.setAnswers(Arrays.asList(a1, a2));

        int score = scoringService.computeScore(quizDTO, attemptRequest);
        assertEquals(1, score);
    }

    @Test
    void testComputeScore_AllWrong() {
        attemptRequest = new AttemptRequest();
        AnswerDTO a1 = new AnswerDTO();
        a1.setQuestionId(1L);
        a1.setSelectedOptionIds(Collections.singletonList(2L)); // Wrong

        AnswerDTO a2 = new AnswerDTO();
        a2.setQuestionId(2L);
        a2.setSelectedOptionIds(Collections.singletonList(3L)); // Wrong

        attemptRequest.setAnswers(Arrays.asList(a1, a2));

        int score = scoringService.computeScore(quizDTO, attemptRequest);
        assertEquals(0, score);
    }
}
