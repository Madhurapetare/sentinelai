package com.sentinelai.backend.dto;

import lombok.Data;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import java.math.BigDecimal;

@Data
public class TransactionRequest {

    private Integer step;

    @NotNull(message = "Transaction type is required")
    private String type;

    @NotNull(message = "Amount is required")
    @Positive(message = "Amount must be greater than zero")
    private BigDecimal amount;

    @NotNull(message = "Sender account is required")
    private String senderAccount;

    @NotNull(message = "Receiver account is required")
    private String receiverAccount;

    private BigDecimal oldBalanceSender;
    private BigDecimal newBalanceSender;
    private BigDecimal oldBalanceReceiver;
    private BigDecimal newBalanceReceiver;
}