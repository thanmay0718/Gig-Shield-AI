package com.example.Gig.Worker.Insurance.mapper;

import com.example.Gig.Worker.Insurance.DTO.PaymentRequestDTO;
import com.example.Gig.Worker.Insurance.DTO.PaymentResponseDTO;
import com.example.Gig.Worker.Insurance.Model.Payment;

public class PaymentMapper {

    public static Payment toEntity(PaymentRequestDTO dto){

        Payment payment = new Payment();

        payment.setWorkerId(dto.getWorkerId());
        payment.setAmount(dto.getAmount());
        payment.setPaymentType(dto.getPaymentType());
        payment.setPaymentStatus("SUCCESS");

        return payment;
    }

    public static PaymentResponseDTO toResponseDTO(Payment payment){

        PaymentResponseDTO dto = new PaymentResponseDTO();

        dto.setId(payment.getId());
        dto.setWorkerId(payment.getWorkerId());
        dto.setAmount(payment.getAmount());
        dto.setPaymentType(payment.getPaymentType());
        dto.setPaymentStatus(payment.getPaymentStatus());

        if(payment.getPaymentDate() != null){
            dto.setPaymentDate(payment.getPaymentDate().atStartOfDay());
        }

        return dto;
    }
}