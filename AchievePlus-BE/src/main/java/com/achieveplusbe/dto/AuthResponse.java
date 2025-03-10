package com.achieveplusbe.dto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder

public class AuthResponse {
    private String token;
    private String role;
    private String fullName;
    private String email;

    public AuthResponse() {
    }

    public AuthResponse( String role,String token, String fullName, String email) {

        this.token = token;
        this.role = role;
        this.fullName = fullName;
        this.email = email;
    }


    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}