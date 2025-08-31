package com.example.Tradeshift.service;
//
import com.example.Tradeshift.payload.*;
import com.example.Tradeshift.repository.*;
import com.example.Tradeshift.entity.Portfolio;

// import org.springframework.beans.factory.annotation.Autowired;
// import com.example.Tradeshift.entity.*;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

import java.math.BigDecimal;
// import java.math.RoundingMode;
@Service
public class PortfolioService {

   private final PortfolioRepository portfolioRepository;
    private final MarketDataService marketDataService;
    private final AnalyticsService analyticsService; // <-- Add this

    public PortfolioService(PortfolioRepository portfolioRepository,
                            MarketDataService marketDataService,
                            AnalyticsService analyticsService) { // <-- Include here
        this.portfolioRepository = portfolioRepository;
        this.marketDataService = marketDataService;
        this.analyticsService = analyticsService;
    }

   public PortfolioSummaryDTO getPortfolioSummary(Long userId) {
    List<Portfolio> holdings = portfolioRepository.findByUserId(userId);

     analyticsService.logAction(
        userId,
        "PORTFOLIO_VIEWED",
        "User viewed portfolio with " + holdings.size() + " holdings"
    );

    BigDecimal totalValue = BigDecimal.ZERO;
    BigDecimal totalPnL = BigDecimal.ZERO;
    List<HoldingDTO> holdingDTOs = new ArrayList<>();

    for (Portfolio holding : holdings) {
        BigDecimal currentPrice = BigDecimal.valueOf(marketDataService.getCurrentPrice(holding.getAssetSymbol()));
        
        // Ensure quantity is BigDecimal
        BigDecimal quantity = holding.getQuantity();  // or convert if needed
        
        BigDecimal currentValue = currentPrice.multiply(quantity);
        
        BigDecimal pnlBD = currentPrice.subtract(holding.getAvgBuyPrice()).multiply(quantity);
        BigDecimal pnl = BigDecimal.valueOf(pnlBD.doubleValue());

        totalValue = totalValue.add(currentValue);
        totalPnL = totalPnL.add(pnl);

        holdingDTOs.add(new HoldingDTO(
            holding.getAssetSymbol(),
            currentPrice,
            quantity,
            pnl
        ));
    }

    return new PortfolioSummaryDTO(totalValue, totalPnL, holdingDTOs);
}

}
