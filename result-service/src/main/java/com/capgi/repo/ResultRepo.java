package com.capgi.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.capgi.dto.QuizPerformanceDTO;
import com.capgi.model.Result;

@Repository
public interface ResultRepo extends JpaRepository<Result, Long> {

    // Leaderboard queries
    List<Result> findTop10ByOrderByScoreDescDurationSecondAsc();

    List<Result> findTop10ByQuizIdOrderByScoreDescDurationSecondAsc(Long quizId);

    // Analytics queries
    @Query("SELECT COUNT(DISTINCT r.quizId) FROM Result r")
    Long countDistinctQuizzes();

    @Query("SELECT COUNT(DISTINCT r.userId) FROM Result r")
    Long countDistinctUsers();

    @Query("SELECT AVG(r.score) FROM Result r")
    Double findAverageScore();

    @Query("SELECT new com.capgi.dto.QuizPerformanceDTO(r.quizId, r.quizTitle, COUNT(r), AVG(r.score), " +
            "CAST(COUNT(r) * 100.0 / (SELECT COUNT(*) FROM Result) AS double)) " +
            "FROM Result r GROUP BY r.quizId, r.quizTitle")
    List<QuizPerformanceDTO> findQuizPerformance();

    List<Result> findTop10ByOrderByTakenAtDesc();

    List<Result> findByUserId(Long userId);

}
