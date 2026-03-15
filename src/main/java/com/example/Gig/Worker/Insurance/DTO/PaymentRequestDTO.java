package com.example.Gig.Worker.Insurance.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PaymentRequestDTO {
    private Long workerId;
    private Double amount;
    private String paymentType;
}
