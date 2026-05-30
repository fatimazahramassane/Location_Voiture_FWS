package com.carrental.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

@Entity
@Table(name = "rentals")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Rental {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Start date is required")
    @Column(nullable = false)
    private LocalDate startDate;

    @NotNull(message = "End date is required")
    @Column(nullable = false)
    private LocalDate endDate;

    private LocalDate actualReturnDate;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    private RentalStatus status = RentalStatus.PENDING;

    // Stored cost (locked at booking time so price changes don't affect history)
    private Double totalCost;

    @NotNull(message = "Customer name is required")
    private String customerName;

    private String customerEmail;

    private String customerPhone;

    private String customerLicenseNumber;

    @Column(columnDefinition = "TEXT")
    private String notes;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "car_id", nullable = false)
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private Car car;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private AppUser user;

    public enum RentalStatus {
        PENDING,
        ACTIVE,
        COMPLETED,
        CANCELLED
    }

    @PrePersist
    @PreUpdate
    public void calculateTotalCost() {
        if (startDate != null && endDate != null && car != null) {
            long days = ChronoUnit.DAYS.between(startDate, endDate);
            if (days <= 0) days = 1;
            this.totalCost = days * car.getDailyRate();
        }
    }

    public long getRentalDays() {
        if (startDate == null || endDate == null) return 0;
        long days = ChronoUnit.DAYS.between(startDate, endDate);
        return days <= 0 ? 1 : days;
    }
}