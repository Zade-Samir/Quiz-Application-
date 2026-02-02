package com.capgi.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.security.Key;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.capgi.client.QuizClient;
import com.capgi.client.ResultClient;
import com.capgi.dto.attempt.AnswerDTO;
import com.capgi.dto.attempt.AttemptRequest;
import com.capgi.dto.quiz.QuizDTO;
import com.capgi.dto.result.ResultDTO;
import com.capgi.service.JWTService;
import com.capgi.service.ScoringService;
import com.fasterxml.jackson.databind.ObjectMapper;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@ExtendWith(MockitoExtension.class)
public class AttemptControllerTest {

    private MockMvc mockMvc;

    @Mock
    private ScoringService scoringService;

    @Mock
    private QuizClient quizClient;

    @Mock
    private ResultClient resultClient;

    private JWTService jwtService;
    private AttemptController attemptController;

    private ObjectMapper objectMapper = new ObjectMapper();
    private String validToken;
    private String secretKey = "404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970";

    @BeforeEach
    void setUp() {
        // Real JWTService
        jwtService = new JWTService();
        ReflectionTestUtils.setField(jwtService, "secretKey", secretKey);

        // Generate a token manually since JWTService in this module doesn't have
        // generation logic
        Map<String, Object> claims = new HashMap<>();
        claims.put("userId", 123L);
        validToken = "Bearer " + generateTestToken(claims, "testuser");

        attemptController = new AttemptController(jwtService, scoringService, quizClient, resultClient);

        mockMvc = MockMvcBuilders.standaloneSetup(attemptController).build();
    }

    private String generateTestToken(Map<String, Object> claims, String subject) {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        Key key = Keys.hmacShaKeyFor(keyBytes);

        return Jwts.builder()
                .claims(claims)
                .subject(subject)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60))
                .signWith(key)
                .compact();
    }

    @Test
    void testSubmitAttempt() throws Exception {
        AttemptRequest request = new AttemptRequest();
        AnswerDTO answer = new AnswerDTO();
        answer.setQuestionId(1L);
        // Corrected usage: setSelectedOptionIds
        answer.setSelectedOptionIds(Collections.singletonList(1L));
        request.setAnswers(Collections.singletonList(answer));

        QuizDTO quizDTO = new QuizDTO();
        quizDTO.setId(1L);
        quizDTO.setQuestions(Collections.emptyList());

        when(quizClient.getQuizById(1L)).thenReturn(quizDTO);
        when(scoringService.computeScore(any(QuizDTO.class), any(AttemptRequest.class))).thenReturn(10);

        ResultDTO resultDTO = new ResultDTO();
        when(resultClient.createResult(any(), any(ResultDTO.class))).thenReturn(resultDTO);

        mockMvc.perform(post("/attempts/quizzes/1")
                .header("Authorization", validToken)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.score").value(10));
    }
}
