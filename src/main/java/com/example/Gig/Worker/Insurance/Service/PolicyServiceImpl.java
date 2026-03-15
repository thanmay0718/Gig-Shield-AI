package com.example.Gig.Worker.Insurance.Service;

import com.example.Gig.Worker.Insurance.DTO.PolicyRequestDTO;
import com.example.Gig.Worker.Insurance.DTO.PolicyResponseDTO;
import com.example.Gig.Worker.Insurance.Model.Policy;
import com.example.Gig.Worker.Insurance.Repository.PolicyRepository;
import com.example.Gig.Worker.Insurance.exception.ResourceNotFoundException;
import com.example.Gig.Worker.Insurance.mapper.PolicyMapper;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PolicyServiceImpl implements PolicyService {

    private final PolicyRepository policyRepository;

    public PolicyServiceImpl(PolicyRepository policyRepository) {
        this.policyRepository = policyRepository;
    }

    @Override
    public PolicyResponseDTO createPolicy(PolicyRequestDTO requestDTO) {

        Policy policy = PolicyMapper.toEntity(requestDTO);
        policy.setStatus("ACTIVE");

        Policy savedPolicy = policyRepository.save(policy);

        return PolicyMapper.toResponseDTO(savedPolicy);
    }

    @Override
    public List<PolicyResponseDTO> getPoliciesByWorker(Long workerId) {

        List<Policy> policies = policyRepository.findByWorkerId(workerId);

        if (policies.isEmpty()) {
            throw new ResourceNotFoundException(
                    "No policies found for worker id: " + workerId);
        }

        return policies.stream()
                .map(PolicyMapper::toResponseDTO)
                .collect(Collectors.toList());
    }
}