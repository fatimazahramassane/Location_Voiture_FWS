package com.carrental.repository;

import com.carrental.entity.Car;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CarRepository extends JpaRepository<Car, Long> {

    Optional<Car> findByVin(String vin);

    Optional<Car> findByRegistrationPlate(String plate);

    boolean existsByVin(String vin);

    boolean existsByRegistrationPlate(String plate);

    List<Car> findByStatus(Car.CarStatus status);

    List<Car> findByAgencyId(Long agencyId);

    List<Car> findByAgencyIdAndStatus(Long agencyId, Car.CarStatus status);

    List<Car> findByBrandIgnoreCase(String brand);

    List<Car> findByBrandIgnoreCaseAndStatus(String brand, Car.CarStatus status);

    @Query("SELECT c FROM Car c WHERE c.dailyRate <= :max AND c.status = 'AVAILABLE'")
    List<Car> findAvailableByMaxRate(@Param("max") Double maxRate);

    @Query("SELECT c FROM Car c WHERE c.year BETWEEN :from AND :to")
    List<Car> findByYearRange(@Param("from") int from, @Param("to") int to);

    @Query("SELECT DISTINCT c.brand FROM Car c ORDER BY c.brand")
    List<String> findAllBrands();

    @Query("SELECT c FROM Car c WHERE " +
           "(:brand IS NULL OR LOWER(c.brand) = LOWER(:brand)) AND " +
           "(:status IS NULL OR c.status = :status) AND " +
           "(:agencyId IS NULL OR c.agency.id = :agencyId)")
    List<Car> filter(@Param("brand") String brand,
                     @Param("status") Car.CarStatus status,
                     @Param("agencyId") Long agencyId);
}
