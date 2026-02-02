package com.capgi.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Collections;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.capgi.dto.OptionRequest;
import com.capgi.dto.QuestionRequest;
import com.capgi.dto.QuizRequest;
import com.capgi.model.Option;
import com.capgi.model.Question;
import com.capgi.model.Quiz;
import com.capgi.repo.OptionRepo;
import com.capgi.repo.QuestionRepo;
import com.capgi.repo.QuizRepo;
import com.capgi.service.impl.QuizServiceImpl;

@ExtendWith(MockitoExtension.class)
public class QuizServiceImplTest {

    @Mock
    private QuizRepo quizRepository;

    @Mock
    private QuestionRepo questionRepository;

    @Mock
    private OptionRepo optionRepository;

    @InjectMocks
    private QuizServiceImpl quizService;

    private Quiz quiz;

    @BeforeEach
    void setUp() {
        quiz = new Quiz();
        quiz.setId(1L);
        quiz.setTitle("Test Quiz");
        quiz.setCategory("Java");
        quiz.setIsPublished(false);
    }

    @Test
    void testCreateQuiz() {
        QuizRequest request = new QuizRequest();
        request.setTitle("Test Quiz");
        request.setCategory("Java");

        when(quizRepository.save(any(Quiz.class))).thenReturn(quiz);

        Quiz createdQuiz = quizService.createQuiz(request, "user");

        assertNotNull(createdQuiz);
        verify(quizRepository).save(any(Quiz.class));
    }

    @Test
    void testAddQuestion() {
        when(quizRepository.findById(1L)).thenReturn(Optional.of(quiz));
        when(questionRepository.save(any(Question.class))).thenAnswer(invocation -> invocation.getArgument(0)); // Returns
                                                                                                                // same
                                                                                                                // object

        QuestionRequest request = new QuestionRequest();
        request.setText("What is Java?");
        request.setType("SINGLE");

        OptionRequest optionReq = new OptionRequest();
        optionReq.setText("Language");
        optionReq.setIsCorrect(true);
        request.setOptions(Collections.singletonList(optionReq));

        Question question = quizService.addQuestion(1L, request);

        assertNotNull(question);
        verify(questionRepository).save(any(Question.class));
        verify(optionRepository).save(any(Option.class));
    }

    @Test
    void testGetQuizDetails_Success() {
        when(quizRepository.findById(1L)).thenReturn(Optional.of(quiz));

        Quiz foundQuiz = quizService.getQuizDetails(1L);

        assertNotNull(foundQuiz);
        assertEquals("Test Quiz", foundQuiz.getTitle());
    }

    @Test
    void testGetQuizDetails_NotFound() {
        when(quizRepository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> quizService.getQuizDetails(1L));
    }

    @Test
    void testPublishQuiz() {
        when(quizRepository.findById(1L)).thenReturn(Optional.of(quiz));
        when(quizRepository.save(any(Quiz.class))).thenReturn(quiz);

        quizService.publishQuiz(1L);

        verify(quizRepository).save(quiz);
        // Note: In real object quiz.setIsPublished(true) happens. In mocked save
        // return, it depends on what we returned.
        // We verified save was called, which is the important part of service logic.
    }
}
