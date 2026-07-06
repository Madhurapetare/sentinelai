package com.sentinelai.backend.repository;

import com.sentinelai.backend.model.Transaction;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    Page<Transaction> findByTypeContainingIgnoreCase(String type, Pageable pageable);

    Page<Transaction> findBySenderAccountContainingIgnoreCase(String senderAccount, Pageable pageable);
}