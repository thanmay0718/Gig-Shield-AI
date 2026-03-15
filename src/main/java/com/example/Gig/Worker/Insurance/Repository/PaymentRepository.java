package com.example.Gig.Worker.Insurance.Repository;

import com.example.Gig.Worker.Insurance.Model.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
}
