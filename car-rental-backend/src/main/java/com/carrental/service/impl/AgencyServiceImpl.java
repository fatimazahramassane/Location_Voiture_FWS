package com.carrental.service.impl;

import com.carrental.dto.AgencyRequest;
import com.carrental.dto.AgencyResponse;
import com.carrental.dto.CarResponse;
import com.carrental.entity.Agency;
import com.carrental.entity.Car;
import com.carrental.exception.ResourceAlreadyExistsException;
import com.carrental.exception.ResourceNotFoundException;
import com.carrental.repository.AgencyRepository;
import com.carrental.repository.CarRepository;
import com.carrental.service.AgencyService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class AgencyServiceImpl implements AgencyService {

    private final AgencyRepository agencyRepository;
    private final CarRepository carRepository;

    private Agency findAgencyOrThrow(Long id) {
        return agencyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Agency not found with id: " + id));
    }

    private AgencyResponse mapToResponse(Agency agency) {
        AgencyResponse response = new AgencyResponse();
        response.setId(agency.getId());
        response.setName(agency.getName());
        response.setAddress(agency.getAddress());
        response.setCity(agency.getCity());
        response.setState(agency.getState());
        response.setPhone(agency.getPhone());
        response.setEmail(agency.getEmail());
        return response;
    }

    private CarResponse mapCarToResponse(Car car) {
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

    @Override
    @Transactional(readOnly = true)
    public List<AgencyResponse> getAllAgencies() {
        return agencyRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<CarResponse> getAgencyCars(Long agencyId) {
        findAgencyOrThrow(agencyId);
        return carRepository.findByAgencyId(agencyId).stream()
                .map(this::mapCarToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public AgencyResponse createAgency(AgencyRequest request) {
        if (agencyRepository.existsByName(request.getName())) {
            throw new ResourceAlreadyExistsException("Agency with this name already exists");
        }

        Agency agency = Agency.builder()
                .name(request.getName())
                .address(request.getAddress())
                .city(request.getCity())
                .state(request.getState())
                .phone(request.getPhone())
                .email(request.getEmail())
                .build();

        return mapToResponse(agencyRepository.save(agency));
    }
}
