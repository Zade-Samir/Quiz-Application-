package com.capgi.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.capgi.dto.AnalyticsOverviewDTO;
import com.capgi.dto.LeaderboardDTO;
import com.capgi.dto.QuizPerformanceDTO;
import com.capgi.dto.RecentActivityDTO;
import com.capgi.model.Result;
import com.capgi.repo.ResultRepo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ResultServiceImpl implements ResultService {

	private final ResultRepo resultRepo;

	@Override
	public Result saveResult(Result res) {
		res.setTakenAt(LocalDateTime.now());
		return resultRepo.save(res);
	}

	@Override
	public Result getByResultId(Long resultId) {
		return resultRepo.findById(resultId).orElse(null);
	}

	@Override
	public List<LeaderboardDTO> getLeaderboard(Long quizId, int limit) {
		List<Result> results;

		if (quizId != null) {
			results = resultRepo.findTop10ByQuizIdOrderByScoreDescDurationSecondAsc(quizId);
		} else {
			results = resultRepo.findTop10ByOrderByScoreDescDurationSecondAsc();
		}

		List<LeaderboardDTO> leaderboard = new ArrayList<>();
		int rank = 1;

		for (Result result : results) {
			LeaderboardDTO dto = new LeaderboardDTO(
					result.getUserId(),
					result.getUsername(),
					result.getScore(),
					result.getDurationSecond(),
					result.getTakenAt());
			dto.setRank(rank++);

			// Calculate user stats
			List<Result> userResults = resultRepo.findByUserId(result.getUserId());
			dto.setQuizzesTaken(userResults.size());
			dto.setAvgScore(userResults.stream()
					.mapToInt(Result::getScore)
					.average()
					.orElse(0.0));

			leaderboard.add(dto);

			if (leaderboard.size() >= limit) {
				break;
			}
		}

		return leaderboard;
	}

	@Override
	public AnalyticsOverviewDTO getAnalyticsOverview() {
		Long totalQuizzes = resultRepo.countDistinctQuizzes();
		Long totalStudents = resultRepo.countDistinctUsers();
		Long totalAttempts = resultRepo.count();
		Double avgScore = resultRepo.findAverageScore();

		// Completion rate (simplified - assuming all attempts are completed)
		Double avgCompletionRate = 100.0;

		return new AnalyticsOverviewDTO(
				totalQuizzes,
				totalStudents,
				totalAttempts,
				avgCompletionRate,
				avgScore != null ? avgScore : 0.0);
	}

	@Override
	public List<QuizPerformanceDTO> getQuizPerformance() {
		return resultRepo.findQuizPerformance();
	}

	@Override
	public List<RecentActivityDTO> getRecentActivity(int limit) {
		List<Result> recentResults = resultRepo.findTop10ByOrderByTakenAtDesc();

		return recentResults.stream()
				.limit(limit)
				.map(result -> new RecentActivityDTO(
						result.getUsername(),
						result.getQuizTitle(),
						result.getScore(),
						result.getTakenAt()))
				.collect(Collectors.toList());
	}

}
