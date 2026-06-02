package com.carrental.dto;

import com.carrental.entity.Car;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CarResponse {

    private Long id;
    private String brand;
    private String model;
    private Integer year;
    private String vin;
    private String registrationPlate;
    private Double mileage;
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
    private String agencyName;
}
