package com.example.Tradeshift.service;
//
import com.example.Tradeshift.payload.*;
import com.example.Tradeshift.repository.*;
import com.example.Tradeshift.entity.Portfolio;

import org.springframework.beans.factory.annotation.Autowired;
// import com.example.Tradeshift.entity.*;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Service
public class PortfolioService {

   private final PortfolioRepository portfolioRepository;
   private final MarketDataService marketDataService;

   @Autowired
   public PortfolioService(PortfolioRepository portfolioRepository, MarketDataService marketDataService) {
       this.portfolioRepository = portfolioRepository;
       this.marketDataService = marketDataService;
   }

   public PortfolioSummaryDTO getPortfolioSummary(Long userId) {
       List<Portfolio> holdings = portfolioRepository.findByUserId(userId);

       double totalValue = 0;
       double totalPnL = 0;
       List<HoldingDTO> holdingDTOs = new ArrayList<>();

       for (Portfolio holding : holdings) {
           double currentPrice = marketDataService.getCurrentPrice(holding.getAssetSymbol());
           double currentValue = currentPrice * holding.getQuantity();
           double pnl = (currentPrice - holding.getAvgBuyPrice()) * holding.getQuantity();

           totalValue += currentValue;
           totalPnL += pnl;

           holdingDTOs.add(new HoldingDTO(
               holding.getAssetSymbol(),
               currentPrice,
               holding.getQuantity(),
               pnl
           ));
       }

       return new PortfolioSummaryDTO(totalValue, totalPnL, holdingDTOs);
   }
}
