package com.example.Tradeshift.repository;

import com.example.Tradeshift.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    
    // Find all transactions for a specific user
    List<Transaction> findByUserIdOrderByTransactionDateDesc(Long userId);
    
    // Find all transactions of a specific type (BUY/SELL)
    List<Transaction> findByTransactionType(Transaction.TransactionType transactionType);

    // Optional: Find all transactions for a user and a type
    List<Transaction> findByUserIdAndTransactionType(Long userId, Transaction.TransactionType transactionType);
}

