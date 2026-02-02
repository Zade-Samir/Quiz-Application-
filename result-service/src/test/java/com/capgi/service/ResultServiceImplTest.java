package com.capgi.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Collections;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.capgi.dto.AnalyticsOverviewDTO;
import com.capgi.dto.LeaderboardDTO;
import com.capgi.model.Result;
import com.capgi.repo.ResultRepo;

@ExtendWith(MockitoExtension.class)
public class ResultServiceImplTest {

    @Mock
    private ResultRepo resultRepo;

    @InjectMocks
    private ResultServiceImpl resultService;

    private Result result;

    @BeforeEach
    void setUp() {
        result = new Result();
        result.setResultId(1L);
        result.setUserId(101L);
        result.setUsername("testPlayer");
        result.setQuizId(1001L);
        result.setScore(85);
        result.setDurationSecond(60);
    }

    @Test
    void testSaveResult() {
        when(resultRepo.save(any(Result.class))).thenReturn(result);

        Result savedResult = resultService.saveResult(result);

        assertNotNull(savedResult);
        assertNotNull(result.getTakenAt()); // Should be set by service
        verify(resultRepo).save(result);
    }

    @Test
    void testGetLeaderboard() {
        when(resultRepo.findTop10ByQuizIdOrderByScoreDescDurationSecondAsc(1001L))
                .thenReturn(Collections.singletonList(result));
        when(resultRepo.findByUserId(101L)).thenReturn(Collections.singletonList(result));

        List<LeaderboardDTO> leaderboard = resultService.getLeaderboard(1001L, 10);

        assertNotNull(leaderboard);
        assertEquals(1, leaderboard.size());
        assertEquals("testPlayer", leaderboard.get(0).getUsername());
        assertEquals(85, leaderboard.get(0).getScore());
        assertEquals(1, leaderboard.get(0).getRank());
    }

    @Test
    void testGetAnalyticsOverview() {
        when(resultRepo.countDistinctQuizzes()).thenReturn(5L);
        when(resultRepo.countDistinctUsers()).thenReturn(10L);
        when(resultRepo.count()).thenReturn(20L);
        when(resultRepo.findAverageScore()).thenReturn(75.5);

        AnalyticsOverviewDTO analytics = resultService.getAnalyticsOverview();

        assertNotNull(analytics);
        assertEquals(5L, analytics.getTotalQuizzes());
        assertEquals(10L, analytics.getTotalStudents());
        assertEquals(20L, analytics.getTotalAttempts());
        assertEquals(75.5, analytics.getAvgScore());
    }
}
