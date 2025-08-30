
package com.example.Tradeshift.service;

// import com.example.Tradeshift.service.MarketDataService;
import com.example.Tradeshift.entity.Portfolio;
import com.example.Tradeshift.repository.PortfolioRepository;
import com.example.Tradeshift.entity.Transaction;
import com.example.Tradeshift.repository.TransactionRepository;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;
import java.math.BigDecimal;
import java.math.RoundingMode;

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

        BigDecimal totalValue = BigDecimal.ZERO;
        BigDecimal totalInvestment = BigDecimal.ZERO;
        BigDecimal percentage = BigDecimal.ZERO;
        
        List<Map<String, Object>> assets = new ArrayList<>();


        for (Portfolio p : holdings) {
        // Convert double to BigDecimal for precision-safe calculations
        BigDecimal currentPrice = BigDecimal.valueOf(marketDataService.getCurrentPrice(p.getAssetSymbol()));

        // Calculate market value and invested amount
        BigDecimal marketValue = p.getQuantity().multiply(currentPrice);
        BigDecimal invested = p.getQuantity().multiply(p.getAvgBuyPrice());

        // Accumulate totals safely using BigDecimal
        totalValue = totalValue.add(marketValue);
        totalInvestment = totalInvestment.add(invested);

        // Calculate PnL = Market Value - Invested
        BigDecimal pnl = marketValue.subtract(invested);

        // Build asset map
        Map<String, Object> asset = new HashMap<>();
        asset.put("symbol", p.getAssetSymbol());
        asset.put("quantity", p.getQuantity());
        asset.put("avgBuyPrice", p.getAvgBuyPrice());
        asset.put("currentPrice", currentPrice);
        asset.put("marketValue", marketValue);
        asset.put("pnl", pnl);

        assets.add(asset);
    }


        Map<String, Object> result = new HashMap<>();
        result.put("totalValue", totalValue);
        result.put("totalInvestment", totalInvestment);
        result.put("overallPnL", totalValue.subtract(totalInvestment));
        result.put("assets", assets);

        // allocation by value
        List<Map<String, Object>> allocation = new ArrayList<>();
        for (Map<String, Object> a : assets) {
        Map<String, Object> m = new HashMap<>();
        double marketValue = ((Number) a.get("marketValue")).doubleValue();
        BigDecimal marketValueBD = BigDecimal.valueOf(marketValue);
        if (totalValue.compareTo(BigDecimal.ZERO) > 0) {
            percentage = marketValueBD
            .divide(totalValue, 4, RoundingMode.HALF_UP)
            .multiply(BigDecimal.valueOf(100));
        }

        m.put("symbol", a.get("symbol"));
        m.put("marketValue", marketValue);
        m.put("percentage", percentage.doubleValue());
        allocation.add(m);
        };
        result.put("allocation", allocation);


        return result;
    }

    /**
     * Transaction summary and recent history
     */
    public Map<String, Object> getTransactionSummary(Long userId) {
        List<Transaction> txns = transactionRepository.findByUserIdOrderByTransactionDateDesc(userId);

        // long buys = txns.stream().filter(t -> "BUY".equalsIgnoreCase(t.getTransactionType())).count();
        // long sells = txns.stream().filter(t -> "SELL".equalsIgnoreCase(t.getTransactionType())).count();

        long buys = txns.stream()
        .filter(t -> t.getTransactionType() == Transaction.TransactionType.BUY)
        .count();

        long sells = txns.stream()
        .filter(t -> t.getTransactionType() == Transaction.TransactionType.SELL)
        .count();

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
        List<Transaction> txns = transactionRepository.findByUserIdOrderByTransactionDateDesc(userId);
        StringBuilder sb = new StringBuilder();
        sb.append("id,assetSymbol,transactionType,quantity,price,transactionDate\n");
        for (Transaction t : txns) {
            sb.append(t.getId()).append(",")
              .append(t.getAssetSymbol()).append(",")
              .append(t.getTransactionType()).append(",")
              .append(t.getQuantity()).append(",")
              .append(t.getPrice()).append(",")
              .append(t.getTransactionDate()).append("\n");
        }
        return sb.toString();
    }
}
