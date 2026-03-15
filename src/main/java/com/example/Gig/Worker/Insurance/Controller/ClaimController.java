package com.example.Gig.Worker.Insurance.Controller;

import com.example.Gig.Worker.Insurance.DTO.ClaimRequestDTO;
import com.example.Gig.Worker.Insurance.DTO.ClaimResponseDTO;
import com.example.Gig.Worker.Insurance.Service.ClaimService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/claims")
public class ClaimController {

    private final ClaimService claimService;

    public ClaimController(ClaimService claimService) {
        this.claimService = claimService;
    }

    @PostMapping
    public ClaimResponseDTO createClaim(@RequestBody ClaimRequestDTO request) {
        return claimService.createClaim(request);
    }

    @GetMapping
    public List<ClaimResponseDTO> getAllClaims() {
        return claimService.getAllClaims();
    }

    @GetMapping("/{id}")
    public ClaimResponseDTO getClaimById(@PathVariable Long id) {
        return claimService.getClaimById(id);
    }
}