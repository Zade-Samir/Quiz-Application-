package com.capgi.dto;


import java.util.List;

import lombok.Data;

@Data
public class QuestionRequest {

	private String text;
	private String type;
	private List<OptionRequest> options;
}
