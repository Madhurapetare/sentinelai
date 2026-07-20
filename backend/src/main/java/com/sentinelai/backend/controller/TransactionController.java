package com.sentinelai.backend.controller;

import com.sentinelai.backend.dto.TransactionRequest;
import com.sentinelai.backend.dto.TransactionStats;
import com.sentinelai.backend.model.Transaction;
import com.sentinelai.backend.repository.TransactionRepository;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    private final TransactionRepository transactionRepository;

    public TransactionController(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    // CREATE - add a new transaction
    @PostMapping
    public ResponseEntity<Transaction> createTransaction(@Valid @RequestBody TransactionRequest request) {
        Transaction transaction = new Transaction();
        transaction.setStep(request.getStep());
        transaction.setType(request.getType());
        transaction.setAmount(request.getAmount());
        transaction.setSenderAccount(request.getSenderAccount());
        transaction.setReceiverAccount(request.getReceiverAccount());
        transaction.setOldBalanceSender(request.getOldBalanceSender());
        transaction.setNewBalanceSender(request.getNewBalanceSender());
        transaction.setOldBalanceReceiver(request.getOldBalanceReceiver());
        transaction.setNewBalanceReceiver(request.getNewBalanceReceiver());

        Transaction saved = transactionRepository.save(transaction);
        return ResponseEntity.ok(saved);
    }

    // READ ALL - paginated list of transactions
    @GetMapping
    public ResponseEntity<Page<Transaction>> getAllTransactions(Pageable pageable) {
        Page<Transaction> transactions = transactionRepository.findAll(pageable);
        return ResponseEntity.ok(transactions);
    }

    // STATS - summary numbers for the dashboard
    @GetMapping("/stats")
    public ResponseEntity<TransactionStats> getStats() {
        long totalCount = transactionRepository.count();
        BigDecimal totalAmount = transactionRepository.getTotalAmount();

        Map<String, Long> typeBreakdown = new HashMap<>();
        for (Object[] row : transactionRepository.countByType()) {
            typeBreakdown.put((String) row[0], (Long) row[1]);
        }

        return ResponseEntity.ok(new TransactionStats(totalCount, totalAmount, typeBreakdown));
    }

    // READ ONE - get a single transaction by ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getTransactionById(@PathVariable Long id) {
        return transactionRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // SEARCH by type (e.g. "TRANSFER", "CASH_OUT")
    @GetMapping("/search/type")
    public ResponseEntity<Page<Transaction>> searchByType(@RequestParam String type, Pageable pageable) {
        Page<Transaction> results = transactionRepository.findByTypeContainingIgnoreCase(type, pageable);
        return ResponseEntity.ok(results);
    }

    // SEARCH by sender account
    @GetMapping("/search/sender")
    public ResponseEntity<Page<Transaction>> searchBySender(@RequestParam String account, Pageable pageable) {
        Page<Transaction> results = transactionRepository.findBySenderAccountContainingIgnoreCase(account, pageable);
        return ResponseEntity.ok(results);
    }

    // DELETE - remove a transaction
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTransaction(@PathVariable Long id) {
        if (!transactionRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        transactionRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}