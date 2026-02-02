package com.capgi.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
	public ResponseEntity<Result> getMethodName(@PathVariable Long resultId) {
		Result result = resultService.getByResultId(resultId);
		return ResponseEntity.ok(result);
	}
}
