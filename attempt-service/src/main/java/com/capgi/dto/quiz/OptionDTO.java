package com.capgi.dto.quiz;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OptionDTO {
	
	private Long id;
	private String text;
	private Boolean isCorrect;

}
