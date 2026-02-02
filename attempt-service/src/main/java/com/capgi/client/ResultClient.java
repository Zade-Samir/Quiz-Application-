package com.capgi.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

import com.capgi.dto.result.ResultDTO;

@FeignClient(name = "result-service")
public interface ResultClient {

    @PostMapping("/result/create_res")
    ResultDTO createResult(@RequestHeader("Authorization") String token, @RequestBody ResultDTO res);
}
