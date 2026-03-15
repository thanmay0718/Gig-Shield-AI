package com.example.Gig.Worker.Insurance.mapper;

import com.example.Gig.Worker.Insurance.DTO.PolicyRequestDTO;
import com.example.Gig.Worker.Insurance.DTO.PolicyResponseDTO;
import com.example.Gig.Worker.Insurance.Model.Policy;

public class PolicyMapper {

    public static Policy toEntity(PolicyRequestDTO dto){

        Policy policy = new Policy();

        policy.setWorkerId(dto.getWorkerId());
        policy.setPolicyType(dto.getPolicyType());
        policy.setPremium(dto.getPremium());
        policy.setStartDate(dto.getStartDate());
        policy.setEndDate(dto.getEndDate());

        return policy;
    }

    public static PolicyResponseDTO toResponseDTO(Policy policy){

        PolicyResponseDTO dto = new PolicyResponseDTO();

        dto.setId(policy.getId());
        dto.setWorkerId(policy.getWorkerId());
        dto.setPolicyType(policy.getPolicyType());
        dto.setPremium(policy.getPremium());
        dto.setStartDate(policy.getStartDate());
        dto.setEndDate(policy.getEndDate());
        dto.setStatus(policy.getStatus());

        return dto;
    }
}