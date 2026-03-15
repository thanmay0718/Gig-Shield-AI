package com.example.Gig.Worker.Insurance.Service;

import com.example.Gig.Worker.Insurance.DTO.LoginRequestDTO;
import com.example.Gig.Worker.Insurance.DTO.WorkerRequestDTO;
import com.example.Gig.Worker.Insurance.DTO.WorkerResponseDTO;
import com.example.Gig.Worker.Insurance.Model.Worker;
import com.example.Gig.Worker.Insurance.Repository.WorkerRepository;
import com.example.Gig.Worker.Insurance.mapper.WorkerMapper;
import com.example.Gig.Worker.Insurance.security.JwtUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private WorkerRepository workerRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public WorkerResponseDTO register(WorkerRequestDTO request) {

        Worker worker = new Worker();

        worker.setName(request.getName());
        worker.setCity(request.getCity());
        worker.setPlatform(request.getPlatform());
        worker.setPhoneNumber(request.getPhoneNumber());
        worker.setAvgIncome(request.getAvgIncome());

        worker.setPassword(passwordEncoder.encode(request.getPassword()));
        worker.setWorkerId("GW-ZMT-" + System.currentTimeMillis());

        workerRepository.save(worker);

        return WorkerMapper.toDTO(worker);
    }

    @Override
    public String login(LoginRequestDTO request) {

        Worker worker = workerRepository.findByPhoneNumber(request.getPhoneNumber())
                .orElseThrow(() -> new RuntimeException("Worker not found"));

        if (!passwordEncoder.matches(request.getPassword(), worker.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        return jwtUtil.generateToken(worker.getPhoneNumber().toString());
    }
}