package com.example.Tradeshift.payload;
import java.math.BigDecimal;
//
import java.util.List;

public class PortfolioSummaryDTO {
   private BigDecimal totalValue;
   private BigDecimal totalPnL;
   private List<HoldingDTO> holdings;

   public PortfolioSummaryDTO(BigDecimal totalValue2, BigDecimal totalPnL2, List<HoldingDTO> holdings) {
       this.totalValue = totalValue2;
       this.totalPnL = totalPnL2;
       this.holdings = holdings;
   }

   public BigDecimal getTotalValue() { return totalValue; }
   public void setTotalValue(BigDecimal totalValue) { this.totalValue = totalValue; }
   public BigDecimal getTotalPnL() { return totalPnL; }
   public void setTotalPnL(BigDecimal totalPnL) { this.totalPnL = totalPnL; }
   public List<HoldingDTO> getHoldings() { return holdings; }
   public void setHoldings(List<HoldingDTO> holdings) { this.holdings = holdings; }
}
