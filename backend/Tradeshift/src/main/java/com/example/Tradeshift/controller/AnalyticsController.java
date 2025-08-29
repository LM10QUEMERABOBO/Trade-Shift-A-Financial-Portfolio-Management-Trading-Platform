
package com.example.Tradeshift.controller;

import com.example.Tradeshift.service.AnalyticsService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.StandardCharsets;
import java.util.Map;

@RestController
@RequestMapping("/api/analytics")
@CrossOrigin
public class AnalyticsController {

    private final AnalyticsService analyticsService;

    public AnalyticsController(AnalyticsService analyticsService) {
        this.analyticsService = analyticsService;
    }

    @GetMapping("/portfolio/{userId}")
    public ResponseEntity<Map<String, Object>> portfolioSummary(@PathVariable Long userId) {
        return ResponseEntity.ok(analyticsService.getPortfolioSummary(userId));
    }

    @GetMapping("/transactions/{userId}")
    public ResponseEntity<Map<String, Object>> transactionSummary(@PathVariable Long userId) {
        return ResponseEntity.ok(analyticsService.getTransactionSummary(userId));
    }

    @GetMapping("/transactions/{userId}/export")
    public ResponseEntity<byte[]> exportTransactionsCsv(@PathVariable Long userId) {
        String csv = analyticsService.exportTransactionsCsv(userId);
        byte[] bytes = csv.getBytes(StandardCharsets.UTF_8);
        return ResponseEntity.ok()
            .header(HttpHeaders.CONTENT_DISPOSITION, 
                    "attachment; filename=transactions_user_" + userId + ".csv")
            .contentType(MediaType.TEXT_PLAIN)
            .body(bytes);
    }
}
