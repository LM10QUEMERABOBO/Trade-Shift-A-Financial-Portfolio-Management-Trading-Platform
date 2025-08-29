package com.example.Tradeshift.repository;

import com.example.Tradeshift.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AnalyticsRepository extends JpaRepository<Analytics, Long> {
    List<Analytics> findByUserId(Long userId);
}



