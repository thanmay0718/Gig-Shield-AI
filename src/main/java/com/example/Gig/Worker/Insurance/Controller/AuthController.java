package com.example.Gig.Worker.Insurance.Controller;

import com.example.Gig.Worker.Insurance.DTO.LoginRequestDTO;
import com.example.Gig.Worker.Insurance.Model.User;
import com.example.Gig.Worker.Insurance.Repository.UserRepository;
import com.example.Gig.Worker.Insurance.security.JwtUtil;

import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Optional;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:9091")
public class AuthController {

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    public AuthController(UserRepository userRepository, JwtUtil jwtUtil){
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/login")
    public Map<String,String> login(@RequestBody LoginRequestDTO request) {

        Map<String,String> response = new HashMap<>();

        Optional<User> userOptional = userRepository.findByEmail(request.getEmail());

        if (userOptional.isEmpty()) {
            response.put("error","User not found");
            return response;
        }

        User user = userOptional.get();

        if (user.getPassword() == null) {
            response.put("error","Password not set for this user");
            return response;
        }

        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        if(!encoder.matches(request.getPassword(), user.getPassword())){
            response.put("error","Invalid password");
            return response;
        }

        String token = jwtUtil.generateToken(user.getEmail());

        response.put("token", token);
        response.put("role", user.getRole());

        return response;
    }
}