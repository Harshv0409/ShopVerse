package com.shopverse.backend.service;

import com.shopverse.backend.model.User;
import com.shopverse.backend.repository.UserRepository;
import com.shopverse.backend.security.JwtService;
import com.shopverse.backend.vo.UserVO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

// UserServiceImpl — actual register aur login logic yahan hai
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    @Override
    public ResponseEntity<?> register(UserVO userVO) {

        // check karo email already exist toh nahi karta
        if (userRepository.findByEmail(userVO.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email already registered!");
        }

        // naya user banao
        User user = new User();
        user.setName(userVO.getName());
        user.setEmail(userVO.getEmail());
        user.setPassword(passwordEncoder.encode(userVO.getPassword())); // password encrypt karo
        user.setRole("BUYER"); // default role

        userRepository.save(user); // database mein save karo

        // JWT token banao aur wapas bhejo
        String token = jwtService.generateToken(user.getEmail(), user.getRole());

        Map<String, String> response = new HashMap<>();
        response.put("token", token);
        response.put("role", user.getRole());
        response.put("name", user.getName());

        return ResponseEntity.ok(response);
    }

    @Override
    public ResponseEntity<?> login(UserVO userVO) {

        // email se user dhundo
        Optional<User> optionalUser = userRepository.findByEmail(userVO.getEmail());

        if (optionalUser.isEmpty()) {
            return ResponseEntity.badRequest().body("User not found!");
        }

        User user = optionalUser.get();

        // password match karo
        if (!passwordEncoder.matches(userVO.getPassword(), user.getPassword())) {
            return ResponseEntity.badRequest().body("Wrong password!");
        }

        // JWT token banao aur wapas bhejo
        String token = jwtService.generateToken(user.getEmail(), user.getRole());

        Map<String, String> response = new HashMap<>();
        response.put("token", token);
        response.put("role", user.getRole());
        response.put("name", user.getName());

        return ResponseEntity.ok(response);
    }
}
