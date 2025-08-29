
package com.example.Tradeshift.service;

// import com.example.Tradeshift.service.MarketDataService;
import com.example.Tradeshift.entity.Portfolio;
import com.example.Tradeshift.repository.PortfolioRepository;
import com.example.Tradeshift.entity.Transaction;
import com.example.Tradeshift.repository.TransactionRepository;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class AnalyticsService {

    private final PortfolioRepository portfolioRepository;
    private final TransactionRepository transactionRepository;
    private final MarketDataService marketDataService;

    public AnalyticsService(PortfolioRepository portfolioRepository,
                            TransactionRepository transactionRepository,
                            MarketDataService marketDataService) {
        this.portfolioRepository = portfolioRepository;
        this.transactionRepository = transactionRepository;
        this.marketDataService = marketDataService;
    }
    
    // double finalTotalValue= totalValue;

    
    public Map<String, Object> getPortfolioSummary(Long userId) {
        List<Portfolio> holdings = portfolioRepository.findByUserId(userId);

        double totalValue = 0.0;
        double totalInvestment = 0.0;
        
        List<Map<String, Object>> assets = new ArrayList<>();


        for (Portfolio p : holdings) {
            double currentPrice = marketDataService.getCurrentPrice(p.getAssetSymbol());
            double marketValue = (p.getQuantity()) * currentPrice;
            double invested = (p.getQuantity()) * (p.getAvgBuyPrice());

            totalValue += marketValue;
            totalInvestment += invested;


            Map<String, Object> asset = new HashMap<>();
            asset.put("symbol", p.getAssetSymbol());
            asset.put("quantity", p.getQuantity());
            asset.put("avgBuyPrice", p.getAvgBuyPrice());
            asset.put("currentPrice", currentPrice);
            asset.put("marketValue", marketValue);
            asset.put("pnl", marketValue - invested);

            assets.add(asset);
        }

        Map<String, Object> result = new HashMap<>();
        result.put("totalValue", totalValue);
        result.put("totalInvestment", totalInvestment);
        result.put("overallPnL", totalValue - totalInvestment);
        result.put("assets", assets);

        // allocation by value
        List<Map<String, Object>> allocation = new ArrayList<>();
        for (Map<String, Object> a : assets) {
        Map<String, Object> m = new HashMap<>();
        double marketValue = ((Number) a.get("marketValue")).doubleValue();
        m.put("symbol", a.get("symbol"));
        m.put("marketValue", marketValue);
        m.put("percentage", totalValue > 0 ? (marketValue / totalValue) * 100.0 : 0.0);
        allocation.add(m);
        };
        result.put("allocation", allocation);


        return result;
    }

    /**
     * Transaction summary and recent history
     */
    public Map<String, Object> getTransactionSummary(Long userId) {
        List<Transaction> txns = transactionRepository.findByPortfolioIdOrderByTimestampDesc(userId);

        long buys = txns.stream().filter(t -> "BUY".equalsIgnoreCase(t.getTransactionType())).count();
        long sells = txns.stream().filter(t -> "SELL".equalsIgnoreCase(t.getTransactionType())).count();

        Map<String, Object> res = new HashMap<>();
        res.put("totalTransactions", txns.size());
        res.put("totalBuys", buys);
        res.put("totalSells", sells);
        res.put("recent", txns.stream().limit(10).collect(Collectors.toList()));
        return res;
    }

    /**
     * Export transactions as CSV string (simple)
     */
    public String exportTransactionsCsv(Long userId) {
        List<Transaction> txns = transactionRepository.findByPortfolioIdOrderByTimestampDesc(userId);
        StringBuilder sb = new StringBuilder();
        sb.append("id,assetSymbol,transactionType,quantity,price,transactionDate\n");
        for (Transaction t : txns) {
            sb.append(t.getId()).append(",")
              .append(t.getAssetSymbol()).append(",")
              .append(t.getTransactionType()).append(",")
              .append(t.getQuantity()).append(",")
              .append(t.getPrice()).append(",")
              .append(t.getTimestamp()).append("\n");
        }
        return sb.toString();
    }
}
