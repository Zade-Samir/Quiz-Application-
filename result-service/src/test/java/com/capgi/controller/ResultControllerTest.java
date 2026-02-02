package com.capgi.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
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

import com.capgi.dto.AnalyticsOverviewDTO;
import com.capgi.dto.LeaderboardDTO;
import com.capgi.model.Result;
import com.capgi.service.JWTService;
import com.capgi.service.ResultService;
import com.fasterxml.jackson.databind.ObjectMapper;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@ExtendWith(MockitoExtension.class)
public class ResultControllerTest {

    private MockMvc mockMvc;

    @Mock
    private ResultService resultService;

    private JWTService jwtService;
    private ResultController resultController;

    private ObjectMapper objectMapper = new ObjectMapper();
    private String validToken;
    private String secretKey = "404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970";
    private Result result;

    @BeforeEach
    void setUp() {
        // Real JWTService
        jwtService = new JWTService();
        ReflectionTestUtils.setField(jwtService, "secretKey", secretKey);

        Map<String, Object> claims = new HashMap<>();
        claims.put("userId", 123L);
        validToken = "Bearer " + generateTestToken(claims, "testuser");

        resultController = new ResultController(resultService, jwtService);
        mockMvc = MockMvcBuilders.standaloneSetup(resultController).build();

        result = new Result();
        result.setResultId(1L);
        result.setUserId(123L);
        result.setQuizId(10L);
        result.setScore(90);
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
    void testCreateResult() throws Exception {
        when(resultService.saveResult(any(Result.class))).thenReturn(result);

        mockMvc.perform(post("/result/create_res")
                .header("Authorization", validToken)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(result)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.score").value(90));
    }

    @Test
    void testGetResult() throws Exception {
        when(resultService.getByResultId(1L)).thenReturn(result);

        mockMvc.perform(get("/result/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.score").value(90));
    }

    @Test
    void testGetLeaderboard() throws Exception {
        // Constructor: userId, username, score, durationSecond, takenAt
        LeaderboardDTO dto = new LeaderboardDTO(123L, "user1", 100, 60, java.time.LocalDateTime.now());
        when(resultService.getLeaderboard(anyLong(), anyInt())).thenReturn(Collections.singletonList(dto));

        mockMvc.perform(get("/result/leaderboard")
                .param("quizId", "10")
                .param("limit", "5"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].username").value("user1"));
    }

    @Test
    void testGetAnalyticsOverview() throws Exception {
        AnalyticsOverviewDTO dto = new AnalyticsOverviewDTO();
        dto.setTotalQuizzes(5L);
        when(resultService.getAnalyticsOverview()).thenReturn(dto);

        mockMvc.perform(get("/result/analytics/overview"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.totalQuizzes").value(5));
    }
}
