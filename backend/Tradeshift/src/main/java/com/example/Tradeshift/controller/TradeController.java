package com.example.Tradeshift.controller;

import com.example.Tradeshift.payload.TradeRequest;
import com.example.Tradeshift.entity.Trade;
import com.example.Tradeshift.service.TradeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/trades")
public class TradeController {

    @Autowired
    private TradeService tradeService;

    // Place order
    @PostMapping("/place")
    public ResponseEntity<Trade> placeOrder(@RequestBody TradeRequest req) {
        Trade trade = tradeService.placeOrder(req);
        return ResponseEntity.ok(trade);
    }

    // Get order history
    @GetMapping("/history/{userId}")
    public ResponseEntity<List<Trade>> history(@PathVariable Long userId) {
        return ResponseEntity.ok(tradeService.getOrderHistory(userId));
    }
}
