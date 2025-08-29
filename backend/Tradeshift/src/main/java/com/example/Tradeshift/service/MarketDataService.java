package com.example.Tradeshift.service;
//
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.json.JSONObject;
//
@Service
public class MarketDataService {

   @Value("${finnhub.api.key}")
   private String apiKey;

   private final String BASE_URL = "https://finnhub.io/api/v1/quote";

   public double getCurrentPrice(String symbol) {
       RestTemplate restTemplate = new RestTemplate();
       String url = BASE_URL + "?symbol=" + symbol + "&token=" + apiKey;

       String response = restTemplate.getForObject(url, String.class);
       JSONObject json = new JSONObject(response);

       return json.getDouble("c");
   }
}
