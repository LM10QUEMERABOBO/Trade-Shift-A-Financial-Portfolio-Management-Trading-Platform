package com.example.Tradeshift.payload;
//
import java.util.List;

public class PortfolioSummaryDTO {
   private double totalValue;
   private double totalPnL;
   private List<HoldingDTO> holdings;

   public PortfolioSummaryDTO(double totalValue, double totalPnL, List<HoldingDTO> holdings) {
       this.totalValue = totalValue;
       this.totalPnL = totalPnL;
       this.holdings = holdings;
   }

   public double getTotalValue() { return totalValue; }
   public void setTotalValue(double totalValue) { this.totalValue = totalValue; }
   public double getTotalPnL() { return totalPnL; }
   public void setTotalPnL(double totalPnL) { this.totalPnL = totalPnL; }
   public List<HoldingDTO> getHoldings() { return holdings; }
   public void setHoldings(List<HoldingDTO> holdings) { this.holdings = holdings; }
}
