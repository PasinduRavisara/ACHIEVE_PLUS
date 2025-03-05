package com.sdgp.achieveplus_main_be.service;

import com.sdgp.achieveplus_main_be.dto.UserDto;
import com.sdgp.achieveplus_main_be.model.User;

public interface UserService {

	User save (UserDto userDto);


}

//
//import com.example.demo.model.User;
//import com.example.demo.repository.UserRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//import java.util.Optional;
//
//@Service
//public class UserService {
//
//	@Autowired
//	private UserRepository userRepository;
//
//	// Method to get a user by ID
//	public User getUserById(Long id) {
//		Optional<User> user = userRepository.findById(id);
//
//		// Check if the user exists, else return null or throw an exception
//		return user.orElseThrow(() -> new RuntimeException("User not found with id " + id));
//	}
//}
