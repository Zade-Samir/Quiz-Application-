package com.capgi.dto.result;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResultCreateRequest {

	private Long quizId;
	private Long userId;
	private int score;
	private int total;
}
