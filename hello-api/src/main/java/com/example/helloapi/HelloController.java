package com.example.helloapi;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/hello")
public class HelloController {
    @PostMapping
    public String sayHello(@RequestParam String name) {
        return String.format("Hello, %s!", name);
    }
}
