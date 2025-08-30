package com.example.Tradeshift.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.Instant;

@Entity
@Table(name = "transactions")
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;
    private String assetSymbol;
    private TransactionType transactionType;
    private BigDecimal quantity;
    private BigDecimal price;
    private Instant transactionDate;
    public enum TransactionType {
        BUY, SELL
    }

    // Default constructor
    public Transaction() {}

    // Parameterized constructor
    public Transaction(Long userId, String assetSymbol, TransactionType transactionType,
                       BigDecimal quantity, BigDecimal price, Instant transactionDate) {
        this.userId = userId;
        this.assetSymbol = assetSymbol;
        this.transactionType = transactionType;
        this.quantity = quantity;
        this.price = price;
        this.transactionDate = transactionDate;
    }

    // Getters and Setters

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

    public String getAssetSymbol() {
        return assetSymbol;
    }

    public void setAssetSymbol(String assetSymbol) {
        this.assetSymbol = assetSymbol;
    }

    public TransactionType getTransactionType() {
        return transactionType;
    }

    public void setTransactionType(TransactionType transactionType) {
        this.transactionType = transactionType;
    }

    public BigDecimal getQuantity() {
        return quantity;
    }

    public void setQuantity(BigDecimal quantity) {
        this.quantity = quantity;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public Instant getTransactionDate() {
        return transactionDate;
    }

    public void setTransactionDate(Instant transactionDate) {
        this.transactionDate = transactionDate;
    }

    // toString() for debugging
    @Override
    public String toString() {
        return "Transaction{" +
                "id=" + id +
                ", userId=" + userId +
                ", assetSymbol='" + assetSymbol + '\'' +
                ", transactionType=" + transactionType +
                ", quantity=" + quantity +
                ", price=" + price +
                ", transactionDate=" + transactionDate +
                '}';
    }

    public void setTransactionType(String type) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'setTransactionType'");
    }
}
