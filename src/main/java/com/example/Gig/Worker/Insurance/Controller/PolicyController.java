package com.example.Gig.Worker.Insurance.Controller;

import com.example.Gig.Worker.Insurance.DTO.PolicyRequestDTO;
import com.example.Gig.Worker.Insurance.DTO.PolicyResponseDTO;
import com.example.Gig.Worker.Insurance.Model.Policy;
import com.example.Gig.Worker.Insurance.Service.PolicyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/policies")
public class PolicyController {

    @Autowired
    private PolicyService policyService;

    @PostMapping
    public PolicyResponseDTO createPolicy(@RequestBody PolicyRequestDTO request){
        return policyService.createPolicy(request);
    }

    @GetMapping("/worker/{workerId}")
    public List<PolicyResponseDTO> getPolicies(@PathVariable Long workerId){
        return policyService.getPoliciesByWorker(workerId);
    }
}
