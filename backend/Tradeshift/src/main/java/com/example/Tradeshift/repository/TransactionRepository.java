package com.example.Tradeshift.repository;

import com.example.Tradeshift.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findByPortfolioIdOrderByTimestampDesc(Long portfolioId);
    // List<Transaction> findByUserIdOrderByTransactionDateDesc(Long userId);
}
