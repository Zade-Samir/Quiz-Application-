package com.capgi.service;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

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


}
