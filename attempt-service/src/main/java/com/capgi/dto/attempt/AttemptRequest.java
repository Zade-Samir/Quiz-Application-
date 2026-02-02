package com.capgi.dto.attempt;

import java.util.List;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AttemptRequest {

	@NotEmpty
	@Valid
	private List<AnswerDTO> answers;
}
