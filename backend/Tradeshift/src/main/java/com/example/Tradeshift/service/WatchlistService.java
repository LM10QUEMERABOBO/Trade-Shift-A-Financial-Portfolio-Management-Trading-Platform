package com.example.Tradeshift.service;

import com.example.Tradeshift.payload.*;
import com.example.Tradeshift.entity.Watchlist;

import java.util.List;

public interface WatchlistService {
    List<Watchlist> getUserWatchlist(Integer userId);
    Watchlist addToWatchlist(WatchlistDTO dto);
    void removeFromWatchlist(Integer id);
}
