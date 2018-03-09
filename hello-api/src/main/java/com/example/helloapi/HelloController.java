package com.example.helloapi;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/hello")
public class HelloController {
    @PostMapping
    public String sayHello(@RequestParam final String name) {
        return String.format("Hello, %s!", name);
    }
}
