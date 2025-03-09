package com.sdgp.achieveplus_main_be.repository;

import com.sdgp.achieveplus_main_be.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
	User findByEmail (String email);
}
