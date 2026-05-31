package com.carrental.service.impl;

import com.carrental.dto.RentalRequest;
import com.carrental.dto.RentalResponse;
import com.carrental.entity.AppUser;
import com.carrental.entity.Car;
import com.carrental.entity.Rental;
import com.carrental.exception.ResourceConflictException;
import com.carrental.exception.ResourceNotFoundException;
import com.carrental.repository.AppUserRepository;
import com.carrental.repository.CarRepository;
import com.carrental.repository.RentalRepository;
import com.carrental.service.CarService;
import com.carrental.service.RentalService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class RentalServiceImpl implements RentalService {

    private final RentalRepository rentalRepository;
    private final CarRepository carRepository;
    private final AppUserRepository appUserRepository;
    private final CarService carService;

    private Rental findRentalOrThrow(Long id) {
        return rentalRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Rental not found with id: " + id));
    }

    private Car findCarOrThrow(Long carId) {
        return carRepository.findById(carId)
                .orElseThrow(() -> new ResourceNotFoundException("Car not found with id: " + carId));
    }

    private AppUser resolveUser(Long userId) {
        if (userId == null) {
            return null;
        }
        return appUserRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
    }

    private void validateDateRange(LocalDate start, LocalDate end) {
        if (start == null || end == null) {
            throw new IllegalArgumentException("Start date and end date are required");
        }
        if (end.isBefore(start)) {
            throw new IllegalArgumentException("End date must be on or after start date");
        }
    }

    private void ensureCarAvailableForCreate(Long carId, LocalDate start, LocalDate end) {
        if (!carService.checkAvailability(carId, start, end)) {
            throw new ResourceConflictException("Car is not available for the selected period");
        }
    }

    private void ensureCarAvailableForUpdate(Long carId, LocalDate start, LocalDate end, Long rentalId) {
        Car car = findCarOrThrow(carId);
        if (car.getStatus() != Car.CarStatus.AVAILABLE) {
            throw new ResourceConflictException("Car is not available for the selected period");
        }
        if (rentalRepository.isCarUnavailableExcludingRental(carId, start, end, rentalId)) {
            throw new ResourceConflictException("Car is not available for the selected period");
        }
    }

    private void ensureRentalIsModifiable(Rental rental) {
        if (rental.getStatus() == Rental.RentalStatus.COMPLETED
                || rental.getStatus() == Rental.RentalStatus.CANCELLED) {
            throw new ResourceConflictException("Cannot modify a " + rental.getStatus().name().toLowerCase() + " rental");
        }
    }

    private Rental mapToEntity(RentalRequest request) {
        Rental rental = new Rental();
        applyRequestToRental(request, rental, null);
        return rental;
    }

    private void applyRequestToRental(RentalRequest request, Rental rental, Long rentalId) {
        validateDateRange(request.getStartDate(), request.getEndDate());

        Long carId = request.getCarId();
        if (carId == null) {
            throw new IllegalArgumentException("Car ID is required");
        }

        if (rentalId == null) {
            ensureCarAvailableForCreate(carId, request.getStartDate(), request.getEndDate());
        } else {
            ensureCarAvailableForUpdate(carId, request.getStartDate(), request.getEndDate(), rentalId);
        }

        Car car = findCarOrThrow(carId);
        rental.setStartDate(request.getStartDate());
        rental.setEndDate(request.getEndDate());
        rental.setActualReturnDate(request.getActualReturnDate());
        rental.setCustomerName(request.getCustomerName());
        rental.setCustomerEmail(request.getCustomerEmail());
        rental.setCustomerPhone(request.getCustomerPhone());
        rental.setCustomerLicenseNumber(request.getCustomerLicenseNumber());
        rental.setNotes(request.getNotes());
        rental.setCar(car);
        rental.setUser(resolveUser(request.getUserId()));

        if (request.getStatus() != null) {
            rental.setStatus(request.getStatus());
        } else if (rental.getStatus() == null) {
            rental.setStatus(Rental.RentalStatus.PENDING);
        }

        rental.calculateTotalCost();
    }

    private RentalResponse mapToResponse(Rental rental) {
        RentalResponse response = new RentalResponse();
        response.setId(rental.getId());
        response.setStartDate(rental.getStartDate());
        response.setEndDate(rental.getEndDate());
        response.setActualReturnDate(rental.getActualReturnDate());
        response.setStatus(rental.getStatus());
        response.setTotalCost(rental.getTotalCost());
        response.setRentalDays(rental.getRentalDays());
        response.setCustomerName(rental.getCustomerName());
        response.setCustomerEmail(rental.getCustomerEmail());
        response.setCustomerPhone(rental.getCustomerPhone());
        response.setCustomerLicenseNumber(rental.getCustomerLicenseNumber());
        response.setNotes(rental.getNotes());

        if (rental.getCar() != null) {
            Car car = rental.getCar();
            response.setCarId(car.getId());
            response.setCarBrand(car.getBrand());
            response.setCarModel(car.getModel());
            if (car.getAgency() != null) {
                response.setAgencyName(car.getAgency().getName());
            }
        }

        if (rental.getUser() != null) {
            response.setUserId(rental.getUser().getId());
        }

        return response;
    }

    @Override
    @Transactional(readOnly = true)
    public List<RentalResponse> getAllRentals() {
        return rentalRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public RentalResponse getRentalById(Long id) {
        return mapToResponse(findRentalOrThrow(id));
    }

    @Override
    public RentalResponse createRental(RentalRequest request) {
        Rental rental = mapToEntity(request);
        return mapToResponse(rentalRepository.save(rental));
    }

    @Override
    public RentalResponse updateRental(Long id, RentalRequest request) {
        Rental rental = findRentalOrThrow(id);
        ensureRentalIsModifiable(rental);
        applyRequestToRental(request, rental, id);
        return mapToResponse(rentalRepository.save(rental));
    }

    @Override
    public void cancelRental(Long id) {
        Rental rental = findRentalOrThrow(id);
        if (rental.getStatus() == Rental.RentalStatus.COMPLETED) {
            throw new ResourceConflictException("Cannot cancel a completed rental");
        }
        if (rental.getStatus() == Rental.RentalStatus.CANCELLED) {
            throw new ResourceConflictException("Rental is already cancelled");
        }
        rental.setStatus(Rental.RentalStatus.CANCELLED);
        rentalRepository.save(rental);
    }

    @Override
    @Transactional(readOnly = true)
    public List<RentalResponse> getRentalsByUserId(Long userId) {
        if (!appUserRepository.existsById(userId)) {
            throw new ResourceNotFoundException("User not found with id: " + userId);
        }
        return rentalRepository.findHistoryByUser(userId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }
}
