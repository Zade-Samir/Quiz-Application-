package com.capgi.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.capgi.model.Question;

public interface QuestionRepo extends JpaRepository<Question, Long> {

}
