package com.example.Tradeshift.service;

import com.example.Tradeshift.payload.*;
import com.example.Tradeshift.entity.Portfolio;
import com.example.Tradeshift.entity.Trade;
import com.example.Tradeshift.repository.PortfolioRepository;
import com.example.Tradeshift.repository.TradeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class TradeService {

    private final TradeRepository tradeRepo;
    private final PortfolioRepository portfolioRepository;

    @Autowired
    public TradeService(TradeRepository tradeRepo, PortfolioRepository portfolioRepository) {
        this.tradeRepo = tradeRepo;
        this.portfolioRepository = portfolioRepository;
    }

    public Trade placeOrder(TradeRequest req) {
        if (req.getQuantity() <= 0 || req.getPrice() <= 0) {
            throw new IllegalArgumentException("Invalid quantity or price");
        }

        Trade trade = new Trade();
        trade.setUserId(req.getUserId());
        trade.setAssetSymbol(req.getSymbol());
        trade.setOrderType(req.getType());
        trade.setQuantity(req.getQuantity());
        trade.setPrice(req.getPrice());
        trade.setStatus("FILLED");

        updatePortfolio(req);

        return tradeRepo.save(trade);
    }
    private void updatePortfolio(TradeRequest req) {
        Portfolio portfolio = portfolioRepository.findByUserIdAndAssetSymbol(
            req.getUserId(), req.getSymbol()
        ).orElse(new Portfolio());

        portfolio.setUserId(req.getUserId());
        portfolio.setAssetSymbol(req.getSymbol());

        if ("BUY".equalsIgnoreCase(req.getType())) {
            // Update holdings and average price
            double oldQty = portfolio.getQuantity();
            double newQty = oldQty + req.getQuantity();

            double oldTotal = oldQty * (portfolio.getAvgBuyPrice());
            double newTotal = oldTotal + (req.getQuantity() * req.getPrice());

            portfolio.setQuantity(newQty);
            portfolio.setAvgBuyPrice(newTotal / newQty);
        } else if ("SELL".equalsIgnoreCase(req.getType())) {
            // Reduce quantity
            double oldQty = portfolio.getQuantity();
            portfolio.setQuantity(Math.max(0.0, oldQty - req.getQuantity()));
        }

        portfolioRepository.save(portfolio);
    }

    public List<Trade> getOrderHistory(Long userId) {
        return tradeRepo.findByUserId(userId);
    }
}
