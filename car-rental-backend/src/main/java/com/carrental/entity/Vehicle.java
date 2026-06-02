package com.carrental.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Entity
@Table(name = "vehicles")
@Inheritance(strategy = InheritanceType.JOINED)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Vehicle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Brand is required")
    @Column(nullable = false)
    private String brand;

    @NotBlank(message = "Model is required")
    @Column(nullable = false)
    private String model;

    @NotNull(message = "Year is required")
    @Min(value = 1990, message = "Year must be 1990 or later")
    @Column(name = "manufacture_year")
    private Integer year;

    @NotBlank(message = "Registration plate is required")
    @Column(nullable = false, unique = true)
    private String registrationPlate;

    @Min(value = 0, message = "Mileage cannot be negative")
    @Builder.Default
    private Double mileage = 0.0;

    @NotNull(message = "Daily rate is required")
    @Min(value = 0, message = "Daily rate cannot be negative")
    private Double dailyRate;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    private VehicleStatus status = VehicleStatus.AVAILABLE;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "agency_id")
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private Agency agency;

    public enum VehicleStatus {
        AVAILABLE,
        RENTED,
        MAINTENANCE,
        OUT_OF_SERVICE
    }
}