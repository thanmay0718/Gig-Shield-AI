package com.example.Gig.Worker.Insurance.Service;

import com.example.Gig.Worker.Insurance.DTO.PolicyRequestDTO;
import com.example.Gig.Worker.Insurance.DTO.PolicyResponseDTO;
import com.example.Gig.Worker.Insurance.Model.Policy;

import java.util.List;

public interface PolicyService {

    PolicyResponseDTO createPolicy(PolicyRequestDTO request);
    List<PolicyResponseDTO> getPoliciesByWorker(Long workerId);

}
