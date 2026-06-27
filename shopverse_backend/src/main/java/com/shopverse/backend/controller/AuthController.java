package com.shopverse.backend.controller;

import com.shopverse.backend.service.UserService;
import com.shopverse.backend.vo.UserVO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

// AuthController — register aur login ke endpoints yahan hain
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;

    // POST /api/auth/register — naya user banao
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserVO userVO) {
        return userService.register(userVO);
    }

    // POST /api/auth/login — user login karo
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserVO userVO) {
        return userService.login(userVO);
    }
}
