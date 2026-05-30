package com.carrental.dto;

import com.carrental.entity.Rental;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RentalResponse {

    private Long id;
    private LocalDate startDate;
    private LocalDate endDate;
    private LocalDate actualReturnDate;
    private Rental.RentalStatus status;
    private Double totalCost;
    private Long rentalDays;
    private String customerName;
    private String customerEmail;
    private String customerPhone;
    private String customerLicenseNumber;
    private String notes;
    private Long carId;
    private String carBrand;
    private String carModel;
    private String agencyName;
    private Long userId;
}
