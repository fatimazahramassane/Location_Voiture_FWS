package com.carrental.service.impl;

import com.carrental.dto.CarRequest;
import com.carrental.dto.CarResponse;
import com.carrental.entity.Agency;
import com.carrental.entity.Car;
import com.carrental.exception.ResourceAlreadyExistsException;
import com.carrental.exception.ResourceNotFoundException;
import com.carrental.repository.AgencyRepository;
import com.carrental.repository.CarRepository;
import com.carrental.repository.RentalRepository;
import com.carrental.service.CarService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class CarServiceImpl implements CarService {

    private final CarRepository carRepository;
    private final RentalRepository rentalRepository;
    private final AgencyRepository agencyRepository;

    private Car mapToEntity(CarRequest request) {
        Car car = new Car();
        applyRequestToCar(request, car);
        return car;
    }

    private void applyRequestToCar(CarRequest request, Car car) {
        car.setBrand(request.getBrand());
        car.setModel(request.getModel());
        car.setYear(request.getYear());
        car.setVin(request.getVin());
        car.setRegistrationPlate(request.getRegistrationPlate());
        car.setMileage(request.getMileage() != null ? request.getMileage() : 0.0);
        car.setDailyRate(request.getDailyRate());
        car.setColor(request.getColor());
        car.setStatus(request.getStatus() != null ? request.getStatus() : Car.CarStatus.AVAILABLE);
        car.setFuelType(request.getFuelType());
        car.setTransmission(request.getTransmission());
        car.setNumberOfDoors(request.getNumberOfDoors());
        car.setNumberOfSeats(request.getNumberOfSeats());
        car.setHasAirConditioning(request.getHasAirConditioning());
        car.setHasGPS(request.getHasGPS());
        car.setTitleStatus(request.getTitleStatus());
        car.setOriginState(request.getOriginState());
        car.setAgency(resolveAgency(request.getAgencyId()));
    }

    private Agency resolveAgency(Long agencyId) {
        if (agencyId == null) {
            return null;
        }
        return agencyRepository.findById(agencyId)
                .orElseThrow(() -> new ResourceNotFoundException("Agency not found with id: " + agencyId));
    }

    private CarResponse mapToResponse(Car car) {
        CarResponse response = new CarResponse();
        response.setId(car.getId());
        response.setBrand(car.getBrand());
        response.setModel(car.getModel());
        response.setYear(car.getYear());
        response.setVin(car.getVin());
        response.setRegistrationPlate(car.getRegistrationPlate());
        response.setMileage(car.getMileage());
        response.setDailyRate(car.getDailyRate());
        response.setColor(car.getColor());
        response.setStatus(car.getStatus());
        response.setFuelType(car.getFuelType());
        response.setTransmission(car.getTransmission());
        response.setNumberOfDoors(car.getNumberOfDoors());
        response.setNumberOfSeats(car.getNumberOfSeats());
        response.setHasAirConditioning(car.getHasAirConditioning());
        response.setHasGPS(car.getHasGPS());
        response.setTitleStatus(car.getTitleStatus());
        response.setOriginState(car.getOriginState());
        if (car.getAgency() != null) {
            response.setAgencyId(car.getAgency().getId());
            response.setAgencyName(car.getAgency().getName());
        }
        return response;
    }

    private Car findCarOrThrow(Long id) {
        return carRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Car not found with id: " + id));
    }

    private void validateDateRange(LocalDate start, LocalDate end) {
        if (start == null || end == null) {
            throw new IllegalArgumentException("Start date and end date are required");
        }
        if (end.isBefore(start)) {
            throw new IllegalArgumentException("End date must be on or after start date");
        }
    }

    private void validateRegistrationPlateUniqueness(String registrationPlate, Long excludeCarId) {
        if (registrationPlate == null || registrationPlate.isBlank()) {
            return;
        }
        carRepository.findByRegistrationPlate(registrationPlate).ifPresent(existing -> {
            if (excludeCarId == null || !existing.getId().equals(excludeCarId)) {
                throw new ResourceAlreadyExistsException("Véhicule avec cette plaque existe déjà");
            }
        });
    }

    @Override
    @Transactional(readOnly = true)
    public List<CarResponse> getAllCars() {
        return carRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public CarResponse getCarById(Long id) {
        return mapToResponse(findCarOrThrow(id));
    }

    @Override
    public CarResponse createCar(CarRequest request) {
        validateRegistrationPlateUniqueness(request.getRegistrationPlate(), null);
        Car car = mapToEntity(request);
        return mapToResponse(carRepository.save(car));
    }

    @Override
    public CarResponse updateCar(Long id, CarRequest request) {
        Car car = findCarOrThrow(id);
        validateRegistrationPlateUniqueness(request.getRegistrationPlate(), id);
        applyRequestToCar(request, car);
        return mapToResponse(carRepository.save(car));
    }

    @Override
    public void deleteCar(Long id) {
        Car car = findCarOrThrow(id);
        carRepository.delete(car);
    }

    @Override
    @Transactional(readOnly = true)
    public List<CarResponse> getAvailableCars(LocalDate start, LocalDate end) {
        validateDateRange(start, end);
        return carRepository.findByStatus(Car.CarStatus.AVAILABLE).stream()
                .filter(car -> checkAvailability(car.getId(), start, end))
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<CarResponse> getAvailableCars() {
        return carRepository.findByStatus(Car.CarStatus.AVAILABLE).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public boolean checkAvailability(Long carId, LocalDate start, LocalDate end) {
        validateDateRange(start, end);
        Car car = findCarOrThrow(carId);
        if (car.getStatus() != Car.CarStatus.AVAILABLE) {
            return false;
        }
        return !rentalRepository.isCarUnavailable(carId, start, end);
    }
}
