package com.capgi.dto.attempt;

import java.util.List;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AnswerDTO {

//	@NotNull
	private Long questionId;
	
//	@NotNull
	private List<Long> selectedOptionIds;
}
