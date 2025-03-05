//package admin_user.controller;
//
//
//import admin_user.dto.LoginRequest;
//import admin_user.dto.LoginResponse;
//import admin_user.dto.UserDto;
//import admin_user.model.User;
//import admin_user.repositories.UserRepository;
//import admin_user.service.CustomUserDetail;
//import admin_user.service.UserService;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.web.bind.annotation.*;
//
//import java.security.Principal;
//import java.util.HashMap;
//import java.util.Map;
//
//@RestController
//@RequestMapping("/api/auth")
//@CrossOrigin(origins = "http://localhost:5180")
//public class AuthController {
//
//    @Autowired
//    private UserDetailsService userDetailsService;
//
//    @Autowired
//    private UserService userService;
//
//    @Autowired
//    private UserRepository userRepository;
//
//    @Autowired
//    private PasswordEncoder passwordEncoder;
//
//    @PostMapping("/login")
//    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
//        try {
//            User user = userRepository.findByEmail(loginRequest.getEmail());
//
//            if (user == null) {
//                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
//                        .body("Invalid email or password");
//            }
//
//            if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
//                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
//                        .body("Invalid email or password");
//            }
//
//            // Authentication successful
//            LoginResponse response = new LoginResponse();
//            response.setEmail(user.getEmail());
//            response.setName(user.getFullname());
//            response.setRole(user.getRole());
//
//            return ResponseEntity.ok(response);
//
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body("An error occurred during authentication");
//        }
//    }
//
//    @PostMapping("/register")
//    public ResponseEntity<?> register(@RequestBody UserDto userDto) {
//        try {
//            User existingUser = userRepository.findByEmail(userDto.getEmail());
//            if (existingUser != null) {
//                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
//                        .body("Email is already registered");
//            }
//
//            User savedUser = userService.save(userDto);
//
//            return ResponseEntity.ok().body("User registered successfully");
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body("An error occurred during registration");
//        }
//    }
//
//    // For getting the current user
//
//
//        @GetMapping("/current-user")
//        public ResponseEntity<?> getCurrentUser(Principal principal) {
//            if (principal == null) {
//                return ResponseEntity.status(401).body("Not authenticated");
//            }
//
//            UserDetails userDetails = userDetailsService.loadUserByUsername(principal.getName());
//            CustomUserDetail customUserDetail = (CustomUserDetail) userDetails;
//
//            Map<String, Object> response = new HashMap<>();
//            response.put("username", customUserDetail.getUsername());
//            response.put("fullname", customUserDetail.getFullname());
//            response.put("role", customUserDetail.getAuthorities().iterator().next().getAuthority());
//
//            return ResponseEntity.ok(response);
//        }
//    }
//
//


package com.sdgp.achieveplus_main_be.controller;

import com.sdgp.achieveplus_main_be.dto.LoginRequest;
import com.sdgp.achieveplus_main_be.dto.LoginResponse;
import com.sdgp.achieveplus_main_be.dto.UserDto;
import com.sdgp.achieveplus_main_be.model.User;
import com.sdgp.achieveplus_main_be.repository.UserRepository;
import com.sdgp.achieveplus_main_be.service.CustomUserDetail;
import com.sdgp.achieveplus_main_be.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {"http://localhost:5180", "http://localhost:5173"})
public class AuthController {

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            System.out.println("Login attempt for: " + loginRequest.getEmail());

            User user = userRepository.findByEmail(loginRequest.getEmail());

            if (user == null) {
                System.out.println("User not found with email: " + loginRequest.getEmail());
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body("Invalid email or password");
            }

            if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
                System.out.println("Password does not match for user: " + loginRequest.getEmail());
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body("Invalid email or password");
            }

            // Authentication successful
            System.out.println("Login successful for: " + loginRequest.getEmail());
            LoginResponse response = new LoginResponse();
            response.setEmail(user.getEmail());
            response.setName(user.getFullname());
            response.setRole(user.getRole());

            // Set authentication in security context
            UserDetails userDetails = userDetailsService.loadUserByUsername(user.getEmail());
            Authentication authentication = new UsernamePasswordAuthenticationToken(
                    userDetails, null, userDetails.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(authentication);

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            System.out.println("Exception during login: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred during authentication: " + e.getMessage());
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserDto userDto) {
        try {
            System.out.println("Registration attempt for: " + userDto.getEmail());

            User existingUser = userRepository.findByEmail(userDto.getEmail());
            if (existingUser != null) {
                System.out.println("Email already registered: " + userDto.getEmail());
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("Email is already registered");
            }

            User savedUser = userService.save(userDto);
            System.out.println("User registered successfully: " + savedUser.getEmail());

            return ResponseEntity.ok().body("User registered successfully");
        } catch (Exception e) {
            System.out.println("Exception during registration: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred during registration: " + e.getMessage());
        }
    }

    @GetMapping("/current-user")
    public ResponseEntity<?> getCurrentUser(Principal principal) {
        try {
            if (principal == null) {
                return ResponseEntity.status(401).body("Not authenticated");
            }

            System.out.println("Getting current user info for: " + principal.getName());
            UserDetails userDetails = userDetailsService.loadUserByUsername(principal.getName());
            CustomUserDetail customUserDetail = (CustomUserDetail) userDetails;

            Map<String, Object> response = new HashMap<>();
            response.put("username", customUserDetail.getUsername());
            response.put("fullname", customUserDetail.getFullname());
            response.put("role", customUserDetail.getAuthorities().iterator().next().getAuthority());

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            System.out.println("Exception getting current user: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred fetching user details: " + e.getMessage());
        }
    }
}