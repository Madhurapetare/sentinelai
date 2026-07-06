package com.sentinelai.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "transactions")
@Data
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer step;

    private String type;

    @Column(nullable = false)
    private BigDecimal amount;

    private String senderAccount;

    private String receiverAccount;

    private BigDecimal oldBalanceSender;

    private BigDecimal newBalanceSender;

    private BigDecimal oldBalanceReceiver;

    private BigDecimal newBalanceReceiver;

    @Column(updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
}