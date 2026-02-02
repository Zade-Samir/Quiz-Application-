package com.capgi.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.capgi.model.Option;

@Repository
public interface OptionRepo extends JpaRepository<Option, Long> {

	
}
