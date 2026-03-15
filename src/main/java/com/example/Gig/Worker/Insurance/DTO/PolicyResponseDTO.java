package com.example.Gig.Worker.Insurance.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PolicyResponseDTO {
    private Long id;
    private Long workerId;
    private String policyType;
    private Double premium;
    private LocalDate startDate;
    private LocalDate endDate;
    private String status;
}
