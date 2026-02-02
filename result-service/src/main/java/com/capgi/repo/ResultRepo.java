package com.capgi.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.capgi.model.Result;

@Repository
public interface ResultRepo extends JpaRepository<Result, Long> {
	

}
