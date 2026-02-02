package com.capgi.repo;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.capgi.model.Quiz;

public interface QuizRepo extends JpaRepository<Quiz, Long> {

	Page<Quiz> findByIsPublishedTrue(Pageable pageable);
}
