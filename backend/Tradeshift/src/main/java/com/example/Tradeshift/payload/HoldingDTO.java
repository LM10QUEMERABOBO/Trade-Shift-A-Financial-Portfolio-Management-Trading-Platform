package com.example.Tradeshift.payload;
//
public class HoldingDTO {
   private String symbol;
   private double currentPrice;
   private double quantity;
   private double pnl;

   public HoldingDTO(String symbol, double currentPrice, double quantity, double pnl) {
       this.symbol = symbol;
       this.currentPrice = currentPrice;
       this.quantity = quantity;
       this.pnl = pnl;
   }

   public String getSymbol() { return symbol; }
   public void setSymbol(String symbol) { this.symbol = symbol; }
   public double getCurrentPrice() { return currentPrice; }
   public void setCurrentPrice(double currentPrice) { this.currentPrice = currentPrice; }
   public double getQuantity() { return quantity; }
   public void setQuantity(double quantity) { this.quantity = quantity; }
   public double getPnl() { return pnl; }
   public void setPnl(double pnl) { this.pnl = pnl; }
}
