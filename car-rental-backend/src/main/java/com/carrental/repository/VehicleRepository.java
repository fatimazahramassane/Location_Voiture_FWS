package com.carrental.repository;

import com.carrental.entity.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface VehicleRepository extends JpaRepository<Vehicle, Long> {

    Optional<Vehicle> findByRegistrationPlate(String registrationPlate);

    boolean existsByRegistrationPlate(String registrationPlate);

    List<Vehicle> findByStatus(Vehicle.VehicleStatus status);

    List<Vehicle> findByAgencyId(Long agencyId);

    List<Vehicle> findByAgencyIdAndStatus(Long agencyId, Vehicle.VehicleStatus status);

    @Query("SELECT v FROM Vehicle v WHERE v.brand = :brand")
    List<Vehicle> findByBrand(@Param("brand") String brand);

    @Query("SELECT v FROM Vehicle v WHERE v.dailyRate BETWEEN :min AND :max")
    List<Vehicle> findByDailyRateBetween(@Param("min") Double min, @Param("max") Double max);
}