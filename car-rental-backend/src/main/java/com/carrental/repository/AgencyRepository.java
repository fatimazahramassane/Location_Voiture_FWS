package com.carrental.repository;

import com.carrental.entity.Agency;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AgencyRepository extends JpaRepository<Agency, Long> {

    Optional<Agency> findByName(String name);

    boolean existsByName(String name);

    List<Agency> findByCity(String city);

    List<Agency> findByState(String state);

    @Query("SELECT a FROM Agency a WHERE LOWER(a.name) LIKE LOWER(CONCAT('%', :kw, '%')) " +
           "OR LOWER(a.city) LIKE LOWER(CONCAT('%', :kw, '%')) " +
           "OR LOWER(a.state) LIKE LOWER(CONCAT('%', :kw, '%'))")
    List<Agency> search(@Param("kw") String keyword);

    @Query("SELECT a FROM Agency a LEFT JOIN FETCH a.cars WHERE a.id = :id")
    Optional<Agency> findByIdWithCars(@Param("id") Long id);
}
