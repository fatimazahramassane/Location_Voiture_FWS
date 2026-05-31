package com.carrental.service;

import com.carrental.dto.CarRequest;
import com.carrental.dto.CarResponse;

import java.time.LocalDate;
import java.util.List;

public interface CarService {

    List<CarResponse> getAllCars();

    CarResponse getCarById(Long id);

    CarResponse createCar(CarRequest request);

    CarResponse updateCar(Long id, CarRequest request);

    void deleteCar(Long id);

    List<CarResponse> getAvailableCars(LocalDate start, LocalDate end);

    boolean checkAvailability(Long carId, LocalDate start, LocalDate end);
}
