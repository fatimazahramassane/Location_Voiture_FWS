package com.carrental.dto;

import com.carrental.entity.Vehicle;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VehicleResponse {

    private Long id;
    private String brand;
    private String model;
    private Integer year;
    private String registrationPlate;
    private Double mileage;
    private Double dailyRate;
    private Vehicle.VehicleStatus status;
    private Long agencyId;
    private String agencyName;
}
