package com.example.Tradeshift.payload;

public class WatchlistDTO {
    private Integer id;
    private Integer userId;
    private String assetSymbol;
    private String assetName;

    // ---- Getters & Setters ----
    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getUserId() {
        return userId;
    }
    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getAssetSymbol() {
        return assetSymbol;
    }
    public void setAssetSymbol(String assetSymbol) {
        this.assetSymbol = assetSymbol;
    }

    public String getAssetName() {
        return assetName;
    }
    public void setAssetName(String assetName) {
        this.assetName = assetName;
    }
}
