package com.example.Tradeshift.controller;

import com.example.Tradeshift.entity.Watchlist;
import com.example.Tradeshift.repository.WatchlistRepository;
import com.example.Tradeshift.payload.WatchlistDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/watchlist")
public class WatchlistController {

    @Autowired
    private WatchlistRepository watchlistRepository;

    // ✅ Get all watchlist items for a user
    @GetMapping("/user/{userId}")
    public List<Watchlist> getUserWatchlist(@PathVariable Integer userId) {
        return watchlistRepository.findByUserId(userId);
    }

    // ✅ Add to watchlist
    @PostMapping
    public ResponseEntity<Watchlist> addToWatchlist(@RequestBody WatchlistDTO dto) {
        Watchlist watchlist = new Watchlist();
        watchlist.setUserId(dto.getUserId());
        watchlist.setAssetSymbol(dto.getAssetSymbol());
        watchlist.setAssetName(dto.getAssetName());

        Watchlist saved = watchlistRepository.save(watchlist);
        return ResponseEntity.ok(saved);
    }

    // ✅ Delete from watchlist
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removeFromWatchlist(@PathVariable Integer id) {
        if (!watchlistRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        watchlistRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
