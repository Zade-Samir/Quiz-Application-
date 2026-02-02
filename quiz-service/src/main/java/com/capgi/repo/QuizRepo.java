package com.capgi.repo;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.capgi.model.Quiz;

public interface QuizRepo extends JpaRepository<Quiz, Long> {

	Page<Quiz> findByIsPublishedTrue(Pageable pageable);

	Page<Quiz> findByIsPublishedTrueAndCategory(String category, Pageable pageable);

	Page<Quiz> findByIsPublishedTrueAndDifficulty(String difficulty, Pageable pageable);

	Page<Quiz> findByIsPublishedTrueAndCategoryAndDifficulty(String category, String difficulty, Pageable pageable);

	Page<Quiz> findByIsPublished(Boolean isPublished, Pageable pageable);
}
