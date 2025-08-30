package com.example.Tradeshift.service;

import com.example.Tradeshift.payload.TradeRequest;
import com.example.Tradeshift.entity.Portfolio;
import com.example.Tradeshift.entity.Trade;
import com.example.Tradeshift.entity.Transaction;
import com.example.Tradeshift.entity.Transaction.TransactionType;
import com.example.Tradeshift.repository.PortfolioRepository;
import com.example.Tradeshift.repository.TradeRepository;
import com.example.Tradeshift.repository.TransactionRepository;

import jakarta.transaction.Transactional;

// import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.Instant;
import java.util.List;

@Service
public class TradeService {

    private final TradeRepository tradeRepo;
    private final PortfolioRepository portfolioRepository;
    private final TransactionRepository transactionRepository;

    // @Autowired
    public TradeService(TradeRepository tradeRepo, PortfolioRepository portfolioRepository,TransactionRepository transactionRepository) {
        this.tradeRepo = tradeRepo;
        this.portfolioRepository = portfolioRepository;
        this.transactionRepository=transactionRepository;
    }

    @Transactional  
    public Trade placeOrder(TradeRequest req) {
        validateTradeRequest(req);

        Trade trade = new Trade();
        trade.setUserId(req.getUserId());
        trade.setAssetSymbol(req.getSymbol());
        trade.setOrderType(req.getType());
        trade.setQuantity(req.getQuantity());
        trade.setPrice(req.getPrice());
        trade.setStatus("FILLED");

        updatePortfolio(req);
        recordTransaction(req);
        return tradeRepo.save(trade);
    }

 private void recordTransaction(TradeRequest req) {
    Transaction transaction = new Transaction();
    transaction.setUserId(req.getUserId());
    transaction.setAssetSymbol(req.getSymbol());
    transaction.setTransactionType(
        TransactionType.valueOf(req.getType().toUpperCase())
    );
    transaction.setQuantity(BigDecimal.valueOf(req.getQuantity())); // Keep actual quantity
    transaction.setPrice(BigDecimal.valueOf(req.getPrice())); // Price per unit
    transaction.setTransactionDate(Instant.now()); // Set timestamp

    transactionRepository.save(transaction);
}



    private void validateTradeRequest(TradeRequest req) {
        if (req.getQuantity() <= 0 || req.getPrice() <= 0) {
            throw new IllegalArgumentException("Quantity and price must be greater than zero.");
        }

        if (!"BUY".equalsIgnoreCase(req.getType()) && !"SELL".equalsIgnoreCase(req.getType())) {
            throw new IllegalArgumentException("Invalid order type: must be BUY or SELL.");
        }
    }

    private void updatePortfolio(TradeRequest req) {
        Portfolio portfolio = portfolioRepository.findByUserIdAndAssetSymbol(
            req.getUserId(), req.getSymbol()
        ).orElseGet(() -> {
            Portfolio p = new Portfolio();
            p.setUserId(req.getUserId());
            p.setAssetSymbol(req.getSymbol());
            p.setQuantity(BigDecimal.ZERO);
            p.setAvgBuyPrice(BigDecimal.ZERO);
            return p;
        });

        BigDecimal reqQty = BigDecimal.valueOf(req.getQuantity());
        BigDecimal reqTotal = reqQty.multiply(BigDecimal.valueOf(req.getPrice()));
        BigDecimal oldQty = portfolio.getQuantity();

        if ("BUY".equalsIgnoreCase(req.getType())) {
            BigDecimal oldTotal = oldQty.multiply(portfolio.getAvgBuyPrice());
            BigDecimal newQty = oldQty.add(reqQty);
            BigDecimal newTotal = oldTotal.add(reqTotal);

            portfolio.setQuantity(newQty);
            portfolio.setAvgBuyPrice(newTotal.divide(newQty, 2, RoundingMode.HALF_UP));
        } else if ("SELL".equalsIgnoreCase(req.getType())) {
            if (oldQty.compareTo(reqQty) < 0) {
                throw new IllegalArgumentException("Insufficient quantity to sell.");
            }
            portfolio.setQuantity(oldQty.subtract(reqQty));
            // Optionally reset avg buy price if holdings become zero
            if (portfolio.getQuantity().compareTo(BigDecimal.ZERO) == 0) {
                portfolio.setAvgBuyPrice(BigDecimal.ZERO);
            }
        }

        portfolioRepository.save(portfolio);
    }

    public List<Trade> getOrderHistory(Long userId) {
        return tradeRepo.findByUserId(userId);
    }
}
