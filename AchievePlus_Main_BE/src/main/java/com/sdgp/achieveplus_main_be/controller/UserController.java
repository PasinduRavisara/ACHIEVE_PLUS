//package admin_user.controller;
//
//import java.security.Principal;
//import java.util.HashMap;
//import java.util.Map;
//
//import admin_user.service.CustomUserDetail;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.stereotype.Controller;
//import org.springframework.ui.Model;
//import org.springframework.web.bind.annotation.*;
//
//import admin_user.dto.UserDto;
//import admin_user.service.UserService;
//@CrossOrigin(origins = "http://localhost:5180")
//@Controller
//public class UserController {
//
//	@Autowired
//	UserDetailsService userDetailsService;
//
//	@Autowired
//	private UserService userService;
//
//
//	@GetMapping("/registration")
//	public String getRegistrationPage(@ModelAttribute("user") UserDto userDto) {
//		return "register";
//	}
//
//	@PostMapping("/registration")
//	public String saveUser(@ModelAttribute("user") UserDto userDto, Model model) {
//		userService.save(userDto);
//		model.addAttribute("message", "Registered Successfuly!");
//		return "register";
//	}
//
//	@GetMapping("/login")
//	public String login() {
//		return "login";
//	}
//
//	@GetMapping("user-page")
//	public String userPage (Model model, Principal principal) {
//		UserDetails userDetails = userDetailsService.loadUserByUsername(principal.getName());
//		model.addAttribute("user", userDetails);
//		return "user";
//	}
//
//	@GetMapping("admin-page")
//	public String adminPage (Model model, Principal principal) {
//		UserDetails userDetails = userDetailsService.loadUserByUsername(principal.getName());
//		model.addAttribute("user", userDetails);
//		return "admin";
//	}
//
//	@GetMapping("/data")
//	public ResponseEntity<?> getUserData() {
//		// Your user data logic here
//		Map<String, Object> data = new HashMap<>();
//		data.put("message", "User data loaded successfully");
//		return ResponseEntity.ok(data);
//	}
//
//	// For admin-specific API
//	@RestController
//	@RequestMapping("/api/admin")
//	public class AdminController {
//
//		@GetMapping("/data")
//		public ResponseEntity<?> getAdminData() {
//			// Your admin data logic here
//			Map<String, Object> data = new HashMap<>();
//			data.put("message", "Admin data loaded successfully");
//			return ResponseEntity.ok(data);
//		}
//	}
//
//}
package com.sdgp.achieveplus_main_be.controller;

import com.sdgp.achieveplus_main_be.dto.UserDto;
import com.sdgp.achieveplus_main_be.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import java.security.Principal;
import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
@Controller
public class UserController {

	@Autowired
	UserDetailsService userDetailsService;

	@Autowired
	private UserService userService;

	@GetMapping("/registration")
	public String getRegistrationPage(@ModelAttribute("user") UserDto userDto) {
		return "register";
	}

	@PostMapping("/registration")
	public String saveUser(@ModelAttribute("user") UserDto userDto, Model model) {
		try {
			userService.save(userDto);
			model.addAttribute("message", "Registered Successfully!");
			return "register";
		} catch (Exception e) {
			model.addAttribute("error", "Registration failed: " + e.getMessage());
			return "register";
		}
	}

	@GetMapping("/login")
	public String login() {
		return "login";
	}

	@GetMapping("user-page")
	public String userPage (Model model, Principal principal) {
		UserDetails userDetails = userDetailsService.loadUserByUsername(principal.getName());
		model.addAttribute("user", userDetails);
		return "user";
	}

	@GetMapping("admin-page")
	public String adminPage (Model model, Principal principal) {
		UserDetails userDetails = userDetailsService.loadUserByUsername(principal.getName());
		model.addAttribute("user", userDetails);
		return "admin";
	}

	@GetMapping("/data")
	public ResponseEntity<?> getUserData() {
		// Your user data logic here
		Map<String, Object> data = new HashMap<>();
		data.put("message", "User data loaded successfully");
		return ResponseEntity.ok(data);
	}

//	@GetMapping("/get-user/{id}")
//	public User getUser(@PathVariable Long id) {
//		return userService.getUserById(id);
//	}
}