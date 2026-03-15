package com.example.Gig.Worker.Insurance.DTO;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
public class WorkerResponseDTO {

    private Long id;
    private String name;
    private String email;
    private String city;
    private String platform;
    private Long phoneNumber;
    private Double avgIncome;
    private Double riskScore;
    private LocalDateTime createdAt;

    public WorkerResponseDTO() {}

}