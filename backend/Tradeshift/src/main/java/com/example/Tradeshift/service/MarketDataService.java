package com.example.Tradeshift.service;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.time.Instant;
import java.util.HashMap;
import java.util.Map;

@Service
public class MarketDataService {

    @Value("${finnhub.api.key}")
    private String apiKey;

    private final String BASE_URL = "https://finnhub.io/api/v1/quote";

    // Simple in-memory cache to store stock prices
    private final Map<String, CachedPrice> priceCache = new HashMap<>();
    private final long CACHE_DURATION_MS = 60_000; // 1 minute

    public double getCurrentPrice(String symbol) {
        // Check cache first
        if (priceCache.containsKey(symbol)) {
            CachedPrice cached = priceCache.get(symbol);
            if (Instant.now().toEpochMilli() - cached.timestamp < CACHE_DURATION_MS) {
                return cached.price;
            }
        }

        try {
            RestTemplate restTemplate = new RestTemplate();
            String url = BASE_URL + "?symbol=" + symbol + "&token=" + apiKey;

            String response = restTemplate.getForObject(url, String.class);
            JSONObject json = new JSONObject(response);

            double price = json.getDouble("c");

            // Store in cache
            priceCache.put(symbol, new CachedPrice(price));

            return price;

        } catch (HttpClientErrorException e) {
            if (e.getStatusCode() == HttpStatus.TOO_MANY_REQUESTS) {
                System.err.println("API limit reached for Finnhub. Returning cached price if available.");
                if (priceCache.containsKey(symbol)) {
                    return priceCache.get(symbol).price; // fallback
                }
                throw new RuntimeException("API limit reached. Please try again later.");
            }
            throw e;
        }
    }

    // Helper class for caching
    private static class CachedPrice {
        double price;
        long timestamp;

        CachedPrice(double price) {
            this.price = price;
            this.timestamp = Instant.now().toEpochMilli();
        }
    }
}
