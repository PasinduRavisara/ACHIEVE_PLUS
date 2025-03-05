package com.SDGP.ProgressAnalyticsBE.repository;


import com.SDGP.ProgressAnalyticsBE.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
}