package com.example.Gig.Worker.Insurance.mapper;

import com.example.Gig.Worker.Insurance.DTO.WorkerRequestDTO;
import com.example.Gig.Worker.Insurance.DTO.WorkerResponseDTO;
import com.example.Gig.Worker.Insurance.Model.Worker;
import com.example.Gig.Worker.Insurance.Model.User;

public class WorkerMapper {

    public static Worker toEntity(WorkerRequestDTO dto, User user) {

        Worker worker = new Worker();

        worker.setUser(user);
        worker.setName(dto.getName());
        worker.setCity(dto.getCity());
        worker.setPlatform(dto.getPlatform());
        worker.setPhoneNumber(dto.getPhoneNumber());
        worker.setAvgIncome(dto.getAvgIncome());

        return worker;
    }

    public static WorkerResponseDTO toResponseDTO(Worker worker) {

        WorkerResponseDTO dto = new WorkerResponseDTO();

        dto.setId(worker.getId());
        dto.setName(worker.getName());

        if (worker.getUser() != null) {
            dto.setEmail(worker.getUser().getEmail());
        }

        dto.setCity(worker.getCity());
        dto.setPlatform(worker.getPlatform());
        dto.setPhoneNumber(worker.getPhoneNumber());
        dto.setAvgIncome(worker.getAvgIncome());
        dto.setRiskScore(worker.getRiskScore());
        dto.setCreatedAt(worker.getCreatedAt());

        return dto;
    }

    public static WorkerResponseDTO toDTO(Worker worker) {
        return toResponseDTO(worker);
    }
}