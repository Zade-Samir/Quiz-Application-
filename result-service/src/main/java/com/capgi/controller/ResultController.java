package com.capgi.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.capgi.dto.AnalyticsOverviewDTO;
import com.capgi.dto.LeaderboardDTO;
import com.capgi.dto.QuizPerformanceDTO;
import com.capgi.dto.RecentActivityDTO;
import com.capgi.model.Result;
import com.capgi.service.ResultService;
import com.capgi.service.JWTService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/result")
@RequiredArgsConstructor
public class ResultController {

	private final ResultService resultService;
	private final JWTService jwtService;

	@PostMapping("/create_res")
	public ResponseEntity<Result> createResult(@RequestHeader("Authorization") String token, @RequestBody Result res) {
		Long userId = jwtService.extractUserId(token.substring(7));
		res.setUserId(userId);
		Result result = resultService.saveResult(res);
		return ResponseEntity.ok(result);
	}

	@GetMapping("/{resultId}")
	public ResponseEntity<Result> getResult(@PathVariable Long resultId) {
		Result result = resultService.getByResultId(resultId);
		return ResponseEntity.ok(result);
	}

	@GetMapping("/leaderboard")
	public ResponseEntity<List<LeaderboardDTO>> getLeaderboard(
			@RequestParam(required = false) Long quizId,
			@RequestParam(defaultValue = "10") int limit) {
		return ResponseEntity.ok(resultService.getLeaderboard(quizId, limit));
	}

	@GetMapping("/analytics/overview")
	public ResponseEntity<AnalyticsOverviewDTO> getAnalyticsOverview() {
		return ResponseEntity.ok(resultService.getAnalyticsOverview());
	}

	@GetMapping("/analytics/quiz-performance")
	public ResponseEntity<List<QuizPerformanceDTO>> getQuizPerformance() {
		return ResponseEntity.ok(resultService.getQuizPerformance());
	}

	@GetMapping("/analytics/recent-activity")
	public ResponseEntity<List<RecentActivityDTO>> getRecentActivity(
			@RequestParam(defaultValue = "10") int limit) {
		return ResponseEntity.ok(resultService.getRecentActivity(limit));
	}
}
