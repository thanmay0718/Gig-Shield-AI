package com.example.Gig.Worker.Insurance.DTO;

import lombok.Data;

@Data
public class ClaimRequestDTO {
    private Long workerId;
    private Long policyId;
    private String description;
    private double amount;
    private String location;
}
