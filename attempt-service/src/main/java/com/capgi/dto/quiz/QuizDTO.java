package com.capgi.dto.quiz;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class QuizDTO {

	private Long id;
	private String title;
	private Boolean isPublished;
	private List<QuestionDTO> questions;
}
