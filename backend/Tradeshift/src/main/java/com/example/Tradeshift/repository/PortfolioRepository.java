package com.example.Tradeshift.repository;
//
import com.example.Tradeshift.entity.Portfolio;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface PortfolioRepository extends JpaRepository<Portfolio, Long> {
   List<Portfolio> findByUserId(Long userId);
   Optional<Portfolio> findByUserIdAndAssetSymbol(Long userId, String assetSymbol);
}
