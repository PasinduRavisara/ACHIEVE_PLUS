package com.AchievePlus.RewardStore.service;

import com.AchievePlus.RewardStore.model.User;
import com.AchievePlus.RewardStore.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public Optional<User> getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Transactional
    public User createUser(User user) {
        return userRepository.save(user);
    }

    @Transactional
    public User updateUser(User user) {
        return userRepository.save(user);
    }

    @Transactional
    public boolean addPoints(Long userId, int points) {
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setPoints(user.getPoints() + points);
            userRepository.save(user);
            return true;
        }
        return false;
    }

    @Transactional
    public boolean deductPoints(Long userId, int points) {
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            if (user.getPoints() >= points) {
                user.setPoints(user.getPoints() - points);
                userRepository.save(user);
                return true;
            }
        }
        return false;
    }
}