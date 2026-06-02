package com.carrental.dto;

import com.carrental.entity.Car;
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
public class CarRequest {

    @NotBlank(message = "Brand is required")
    private String brand;

    @NotBlank(message = "Model is required")
    private String model;

    @NotNull(message = "Year is required")
    @Min(value = 1990, message = "Year must be 1990 or later")
    private Integer year;

    private String vin;

    private String registrationPlate;

    @DecimalMin(value = "0.0", message = "Mileage cannot be negative")
    private Double mileage;

    @NotNull(message = "Daily rate is required")
    @DecimalMin(value = "0.0", message = "Daily rate cannot be negative")
    private Double dailyRate;

    private String color;

    private Car.CarStatus status;

    private Car.FuelType fuelType;

    private Car.Transmission transmission;

    private Integer numberOfDoors;

    private Integer numberOfSeats;

    private Boolean hasAirConditioning;

    private Boolean hasGPS;

    private String titleStatus;

    private String originState;

    private Long agencyId;
}
