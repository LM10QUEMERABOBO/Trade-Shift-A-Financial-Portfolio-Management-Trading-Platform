package com.example.Tradeshift.payload;

import java.math.BigDecimal;

public class HoldingDTO {
    private String symbol;
    private BigDecimal currentPrice;
    private BigDecimal quantity;
    private BigDecimal pnl;

    public HoldingDTO(String symbol, BigDecimal currentPrice, BigDecimal quantity, BigDecimal pnl) {
        this.symbol = symbol;
        this.currentPrice = currentPrice;
        this.quantity = quantity;
        this.pnl = pnl;
    }

    public String getSymbol() {
        return symbol;
    }

    public void setSymbol(String symbol) {
        this.symbol = symbol;
    }

    public BigDecimal getCurrentPrice() {
        return currentPrice;
    }

    // Setter now accepts BigDecimal
    public void setCurrentPrice(BigDecimal currentPrice) {
        this.currentPrice = currentPrice;
    }

    public BigDecimal getQuantity() {
        return quantity;
    }

    // Setter now accepts BigDecimal
    public void setQuantity(BigDecimal quantity) {
        this.quantity = quantity;
    }

    public BigDecimal getPnl() {
        return pnl;
    }

    // Setter now accepts BigDecimal
    public void setPnl(BigDecimal pnl) {
        this.pnl = pnl;
    }
}
