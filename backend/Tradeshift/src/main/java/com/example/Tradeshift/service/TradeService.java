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

    public TradeService(TradeRepository tradeRepo,
                        PortfolioRepository portfolioRepository,
                        TransactionRepository transactionRepository) {
        this.tradeRepo = tradeRepo;
        this.portfolioRepository = portfolioRepository;
        this.transactionRepository = transactionRepository;
    }

    /**
     * Places a trade order (BUY or SELL) and updates portfolio and transaction records.
     */
    @Transactional
    public Trade placeOrder(TradeRequest req) {
        validateTradeRequest(req);

        // Create Trade entity
        Trade trade = new Trade();
        trade.setUserId(req.getUserId());
        trade.setAssetSymbol(req.getSymbol());
        trade.setOrderType(req.getType());
        trade.setQuantity(req.getQuantity());
        trade.setPrice(req.getPrice());
        trade.setStatus("FILLED");

        // Update portfolio and record transaction
        updatePortfolio(req);
        recordTransaction(req);

        return tradeRepo.save(trade);
    }

    /**
     * Records a transaction entry for auditing and history.
     */
    private void recordTransaction(TradeRequest req) {
        Transaction transaction = new Transaction();
        transaction.setUserId(req.getUserId());
        transaction.setAssetSymbol(req.getSymbol());
        // transaction.setAssetName(req.getAssetName());
        transaction.setTransactionType(TransactionType.valueOf(req.getType().toUpperCase()));
        transaction.setQuantity(BigDecimal.valueOf(req.getQuantity()));
        transaction.setPrice(BigDecimal.valueOf(req.getPrice()));
        transaction.setTransactionDate(Instant.now());

        transactionRepository.save(transaction);
    }

    /**
     * Validates trade request for correctness.
     */
    private void validateTradeRequest(TradeRequest req) {
        if (req.getQuantity() == null || req.getQuantity() <= 0 ||
            req.getPrice() == null || req.getPrice() <= 0) {
            throw new IllegalArgumentException("Quantity and price must be greater than zero.");
        }

        if (!"BUY".equalsIgnoreCase(req.getType()) && !"SELL".equalsIgnoreCase(req.getType())) {
            throw new IllegalArgumentException("Invalid order type: must be BUY or SELL.");
        }

        // if (req.getAssetName() == null || req.getAssetName().isBlank()) {
        //     throw new IllegalArgumentException("Asset name cannot be null or empty.");
        // }
    }

    /**
     * Updates user's portfolio with the new trade details.
     */
    private void updatePortfolio(TradeRequest req) {
        Portfolio portfolio = portfolioRepository.findByUserIdAndAssetSymbol(
                req.getUserId(), req.getSymbol()
        ).orElseGet(() -> {
            Portfolio p = new Portfolio();
            p.setUserId(req.getUserId());
            p.setAssetSymbol(req.getSymbol());
            p.setAssetName(req.getAssetName()); // ✅ Fix: set asset name
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

            // Reset avg price if no holdings left
            if (portfolio.getQuantity().compareTo(BigDecimal.ZERO) == 0) {
                portfolio.setAvgBuyPrice(BigDecimal.ZERO);
            }
        }

        portfolioRepository.save(portfolio);
    }

    /**
     * Returns the trade history for a given user.
     */
    public List<Trade> getOrderHistory(Long userId) {
        return tradeRepo.findByUserId(userId);
    }
}
