package com.carrental.repository;

import com.carrental.entity.Rental;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface RentalRepository extends JpaRepository<Rental, Long> {

    List<Rental> findByCarId(Long carId);

    List<Rental> findByUserId(Long userId);

    List<Rental> findByStatus(Rental.RentalStatus status);

    List<Rental> findByCustomerEmail(String email);

    @Query("SELECT r FROM Rental r WHERE r.car.id = :carId AND r.status = 'ACTIVE'")
    List<Rental> findActiveRentalsByCar(@Param("carId") Long carId);

    @Query("SELECT r FROM Rental r WHERE r.user.id = :userId ORDER BY r.startDate DESC")
    List<Rental> findHistoryByUser(@Param("userId") Long userId);

    @Query("SELECT r FROM Rental r WHERE r.car.agency.id = :agencyId ORDER BY r.startDate DESC")
    List<Rental> findByAgencyId(@Param("agencyId") Long agencyId);

    @Query("SELECT r FROM Rental r WHERE r.startDate BETWEEN :start AND :end")
    List<Rental> findByDateRange(@Param("start") LocalDate start, @Param("end") LocalDate end);

    @Query("""
        SELECT COUNT(r) > 0 FROM Rental r
        WHERE r.car.id = :carId
        AND r.status NOT IN ('CANCELLED', 'COMPLETED')
        AND (r.startDate < :endDate AND r.endDate > :startDate)
    """)
    boolean isCarUnavailable(@Param("carId") Long carId,
                             @Param("startDate") LocalDate startDate,
                             @Param("endDate") LocalDate endDate);

    @Query("SELECT r FROM Rental r WHERE r.status = 'ACTIVE' AND r.endDate < :today")
    List<Rental> findOverdue(@Param("today") LocalDate today);

    @Query("SELECT COALESCE(SUM(r.totalCost), 0) FROM Rental r " +
            "WHERE r.status = 'COMPLETED' AND r.car.agency.id = :agencyId")
    Double getTotalRevenueByAgency(@Param("agencyId") Long agencyId);
}