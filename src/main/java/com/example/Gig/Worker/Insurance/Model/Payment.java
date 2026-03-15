package com.example.Gig.Worker.Insurance.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "payments")
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long workerId;

    private Double amount;

    private String paymentType;

    private String paymentStatus;

    private LocalDate paymentDate;

    @PrePersist
    public void setPaymentDate() {
        this.paymentDate = LocalDate.now();
    }
}