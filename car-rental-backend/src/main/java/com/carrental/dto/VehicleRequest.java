package com.carrental.dto;

import com.carrental.entity.Vehicle;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VehicleRequest {

    @NotBlank(message = "Brand is required")
    private String brand;

    @NotBlank(message = "Model is required")
    private String model;

    @NotNull(message = "Year is required")
    @Min(value = 1990, message = "Year must be 1990 or later")
    private Integer year;

    @NotBlank(message = "Registration plate is required")
    private String registrationPlate;

    @DecimalMin(value = "0.0", message = "Mileage cannot be negative")
    private Double mileage;

    @NotNull(message = "Daily rate is required")
    @DecimalMin(value = "0.0", message = "Daily rate cannot be negative")
    private Double dailyRate;

    private Vehicle.VehicleStatus status;

    private Long agencyId;
}
