package com.sentinelai.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @GetMapping("/api/admin/dashboard")
    public String adminOnly() {
        return "Welcome, Admin! You have full access.";
    }

    @GetMapping("/api/investigator/cases")
    public String investigatorAccess() {
        return "Here are your assigned cases.";
    }
}