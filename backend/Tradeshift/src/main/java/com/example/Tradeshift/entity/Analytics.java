package com.example.Tradeshift.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDateTime;

@Entity
@Table(name = "analytics")
public class Analytics {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;

    private String actionType;  // e.g., "TRADE_PLACED", "PORTFOLIO_VIEWED"

    private String details;

    @CreationTimestamp
    private LocalDateTime timestamp;

    // -------------------------
    // Constructors
    // -------------------------
    public Analytics() {
    }

    public Analytics(Long userId, String actionType, String details) {
        this.userId = userId;
        this.actionType = actionType;
        this.details = details;
    }

    // -------------------------
    // Getters and Setters
    // -------------------------
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getActionType() {
        return actionType;
    }

    public void setActionType(String actionType) {
        this.actionType = actionType;
    }

    public String getDetails() {
        return details;
    }

    public void setDetails(String details) {
        this.details = details;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    // -------------------------
    // toString
    // -------------------------
    @Override
    public String toString() {
        return "Analytics{" +
                "id=" + id +
                ", userId=" + userId +
                ", actionType='" + actionType + '\'' +
                ", details='" + details + '\'' +
                ", timestamp=" + timestamp +
                '}';
    }
}
