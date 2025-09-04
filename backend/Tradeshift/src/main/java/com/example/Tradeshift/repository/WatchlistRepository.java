package com.example.Tradeshift.repository;

import com.example.Tradeshift.entity.Watchlist;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface WatchlistRepository extends JpaRepository<Watchlist, Integer> {
    List<Watchlist> findByUserId(Integer userId);
}
