package com.carrental.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "cars")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Car {

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

    @Column(unique = true)
    private String vin;

    @Column(name = "registration_plate", unique = true)
    private String registrationPlate;

    @Builder.Default
    @Min(value = 0)
    private Double mileage = 0.0;

    @NotNull(message = "Daily rate is required")
    @Min(value = 0)
    private Double dailyRate;

    private String color;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    private CarStatus status = CarStatus.AVAILABLE;

    @Enumerated(EnumType.STRING)
    private FuelType fuelType;

    @Enumerated(EnumType.STRING)
    private Transmission transmission;

    private Integer numberOfDoors;

    private Integer numberOfSeats;

    private Boolean hasAirConditioning;

    private Boolean hasGPS;

    private String titleStatus;

    private String originState;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "agency_id")
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private Agency agency;

    @OneToMany(mappedBy = "car", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @Builder.Default
    private List<Rental> rentals = new ArrayList<>();

    public enum CarStatus {
        AVAILABLE,
        RENTED,
        MAINTENANCE,
        OUT_OF_SERVICE
    }

    public enum FuelType {
        GASOLINE,
        DIESEL,
        ELECTRIC,
        HYBRID
    }

    public enum Transmission {
        MANUAL,
        AUTOMATIC
    }
}