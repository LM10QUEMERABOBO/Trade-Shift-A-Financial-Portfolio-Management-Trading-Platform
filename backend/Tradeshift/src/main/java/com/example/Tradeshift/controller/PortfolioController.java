package com.example.Tradeshift.controller;
//
// import com.example.Tradeshift.entity.Portfolio;
import com.example.Tradeshift.payload.*;
import com.example.Tradeshift.service.PortfolioService;
import org.springframework.web.bind.annotation.*;
//
@RestController
@RequestMapping("/api/portfolio")
public class PortfolioController {

   private final PortfolioService portfolioService;

   public PortfolioController(PortfolioService portfolioService) {
       this.portfolioService = portfolioService;
   }

   @GetMapping("/{userId}")
   public PortfolioSummaryDTO getPortfolio(@PathVariable Long userId) {
       return portfolioService.getPortfolioSummary(userId);
   }
}
