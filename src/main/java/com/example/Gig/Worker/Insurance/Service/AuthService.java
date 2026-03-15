package com.example.Gig.Worker.Insurance.Service;

import com.example.Gig.Worker.Insurance.DTO.LoginRequestDTO;
import com.example.Gig.Worker.Insurance.DTO.WorkerRequestDTO;
import com.example.Gig.Worker.Insurance.DTO.WorkerResponseDTO;

public interface AuthService {
    WorkerResponseDTO register(WorkerRequestDTO request);
    String login(LoginRequestDTO request);
}
