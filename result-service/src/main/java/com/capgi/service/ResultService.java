package com.capgi.service;

import java.util.List;

import com.capgi.dto.AnalyticsOverviewDTO;
import com.capgi.dto.LeaderboardDTO;
import com.capgi.dto.QuizPerformanceDTO;
import com.capgi.dto.RecentActivityDTO;
import com.capgi.model.Result;

public interface ResultService {

	Result saveResult(Result res);

	Result getByResultId(Long resultId);

	List<LeaderboardDTO> getLeaderboard(Long quizId, int limit);

	AnalyticsOverviewDTO getAnalyticsOverview();

	List<QuizPerformanceDTO> getQuizPerformance();

	List<RecentActivityDTO> getRecentActivity(int limit);
}
