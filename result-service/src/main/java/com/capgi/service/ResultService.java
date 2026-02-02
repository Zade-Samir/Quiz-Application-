package com.capgi.service;

import com.capgi.model.Result;

public interface ResultService {

	Result saveResult(Result res);
	Result getByResultId(Long resultId);
}
