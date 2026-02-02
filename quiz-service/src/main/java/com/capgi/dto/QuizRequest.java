package com.capgi.dto;

import lombok.Data;

@Data
public class QuizRequest {

	private String title;
	private String description;
	private String category;
	private Integer duration;
	private Integer passingScore;
	private String difficulty;

}
