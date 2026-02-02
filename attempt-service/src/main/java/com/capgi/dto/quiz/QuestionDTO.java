package com.capgi.dto.quiz;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class QuestionDTO {

	private Long id;
	private String text;
	private String type;
	private List<OptionDTO> options;
}
