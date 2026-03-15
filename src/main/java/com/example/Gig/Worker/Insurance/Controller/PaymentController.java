package com.example.Gig.Worker.Insurance.Controller;

import com.example.Gig.Worker.Insurance.DTO.PaymentRequestDTO;
import com.example.Gig.Worker.Insurance.DTO.PaymentResponseDTO;
import com.example.Gig.Worker.Insurance.Service.PaymentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/payments")
public class PaymentController {
    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping
    public PaymentResponseDTO createPayment(@RequestBody PaymentRequestDTO request){
        return paymentService.createPayment(request);
    }

    @GetMapping
    public List<PaymentResponseDTO> getAllPayments(){
        return paymentService.getAllPayments();
    }

    @GetMapping("/{id}")
    public PaymentResponseDTO getPaymentById(@PathVariable Long id){
        return paymentService.getPaymentById(id);
    }
}
