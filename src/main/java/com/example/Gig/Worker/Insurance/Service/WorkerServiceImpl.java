package com.example.Gig.Worker.Insurance.Service;

import com.example.Gig.Worker.Insurance.DTO.WorkerRequestDTO;
import com.example.Gig.Worker.Insurance.DTO.WorkerResponseDTO;
import com.example.Gig.Worker.Insurance.Model.Worker;
import com.example.Gig.Worker.Insurance.Model.User;
import com.example.Gig.Worker.Insurance.Repository.WorkerRepository;
import com.example.Gig.Worker.Insurance.Repository.UserRepository;
import com.example.Gig.Worker.Insurance.exception.ResourceNotFoundException;
import com.example.Gig.Worker.Insurance.mapper.WorkerMapper;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class WorkerServiceImpl implements WorkerService {

    private final WorkerRepository workerRepository;
    private final UserRepository userRepository;

    public WorkerServiceImpl(WorkerRepository workerRepository,
                             UserRepository userRepository) {
        this.workerRepository = workerRepository;
        this.userRepository = userRepository;
    }

    @Override
    public WorkerResponseDTO createWorker(WorkerRequestDTO request) {

        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        // Create User
        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(encoder.encode(request.getPassword()));
        user.setRole("WORKER");

        userRepository.save(user);

        // Create Worker Profile
        Worker worker = WorkerMapper.toEntity(request, user);

        worker = workerRepository.save(worker);

        return WorkerMapper.toResponseDTO(worker);
    }

    @Override
    public List<WorkerResponseDTO> getAllWorkers() {

        return workerRepository.findAll()
                .stream()
                .map(WorkerMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public WorkerResponseDTO getWorkerById(Long id) {

        Worker worker = workerRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Worker not found with id: " + id));

        return WorkerMapper.toResponseDTO(worker);
    }

    @Override
    public WorkerResponseDTO updateWorker(Long id, WorkerRequestDTO request) {

        Worker worker = workerRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Worker not found with id: " + id));

        worker.setName(request.getName());
        worker.setCity(request.getCity());
        worker.setPlatform(request.getPlatform());
        worker.setPhoneNumber(request.getPhoneNumber());
        worker.setAvgIncome(request.getAvgIncome());
        worker.setRiskScore(null);

        Worker updatedWorker = workerRepository.save(worker);

        return WorkerMapper.toResponseDTO(updatedWorker);
    }

    @Override
    public void deleteWorker(Long id) {

        Worker worker = workerRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Worker not found with id: " + id));

        workerRepository.delete(worker);
    }
}