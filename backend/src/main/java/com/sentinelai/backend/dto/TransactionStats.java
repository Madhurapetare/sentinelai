package com.sentinelai.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;
import java.util.Map;

@Data
@AllArgsConstructor
public class TransactionStats {
    private long totalCount;
    private BigDecimal totalAmount;
    private Map<String, Long> typeBreakdown;
}