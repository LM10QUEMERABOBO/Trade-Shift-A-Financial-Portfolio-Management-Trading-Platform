package com.example.Tradeshift.payload;
// import lombok.*;

public class AuthResponse {
    private String token;
    private long userId;
    private String email;

    public AuthResponse() {
    }

    public AuthResponse(String token, Long userId, String email) {
        this.token = token;
        this.userId = userId;
        this.email = email;
    }

    public AuthResponse(String token) {
        this.token = token;
    }

    public String getToken() { return token; }
    public Long getUserId() { return userId; }
    public String getEmail() { return email; }

    
}
