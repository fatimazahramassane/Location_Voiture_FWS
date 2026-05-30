package com.carrental.dto;

import com.carrental.entity.Rental;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RentalRequest {

    @NotNull(message = "Start date is required")
    private LocalDate startDate;

    @NotNull(message = "End date is required")
    private LocalDate endDate;

    private LocalDate actualReturnDate;

    private Rental.RentalStatus status;

    @NotBlank(message = "Customer name is required")
    private String customerName;

    private String customerEmail;

    private String customerPhone;

    private String customerLicenseNumber;

    private String notes;

    @NotNull(message = "Car ID is required")
    private Long carId;

    private Long userId;
}
