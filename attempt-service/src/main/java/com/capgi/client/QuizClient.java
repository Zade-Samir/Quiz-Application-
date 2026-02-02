package com.capgi.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.capgi.dto.quiz.QuizDTO;

@FeignClient(name = "quiz-service")
public interface QuizClient {

    @GetMapping("/quizzes/{id}")
    QuizDTO getQuizById(@PathVariable Long id);
}
