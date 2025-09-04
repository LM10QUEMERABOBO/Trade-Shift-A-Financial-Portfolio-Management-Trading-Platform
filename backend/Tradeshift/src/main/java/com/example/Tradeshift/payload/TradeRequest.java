package com.example.Tradeshift.payload;

public class TradeRequest {
    private Long userId;
    private String symbol;
    private String type;  // BUY or SELL
    private Double quantity;
    private Double price;
    private String assetName; 
    // Constructors
    public TradeRequest() {
    }

    public TradeRequest(Long userId, String symbol,String assetName, String type, Double quantity, Double price) {
        this.userId = userId;
        this.symbol = symbol;
        this.type = type;
        this.quantity = quantity;
        this.price = price;
        this.assetName=assetName;
    }

    // Getters and Setters
    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getSymbol() {
        return symbol;
    }

    public void setSymbol(String symbol) {
        this.symbol = symbol;
    }
    public String getAssetName() {
     return assetName;
    }

    public void setAssetName(String assetName) {
        this.assetName = assetName;
    }
    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Double getQuantity() {
        return quantity;
    }

    public void setQuantity(Double quantity) {
        this.quantity = quantity;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }
}
