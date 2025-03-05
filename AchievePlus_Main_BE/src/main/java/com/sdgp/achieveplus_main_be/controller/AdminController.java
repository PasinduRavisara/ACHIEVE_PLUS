// 5. Create a separate AdminController class
package com.sdgp.achieveplus_main_be.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class AdminController {

    @GetMapping("/data")
    public ResponseEntity<?> getAdminData() {
        // Your admin data logic here
        Map<String, Object> data = new HashMap<>();
        data.put("message", "Admin data loaded successfully");
        return ResponseEntity.ok(data);
    }
}