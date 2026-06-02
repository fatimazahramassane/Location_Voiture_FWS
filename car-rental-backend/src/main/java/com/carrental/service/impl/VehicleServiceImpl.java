package com.carrental.service.impl;

import com.carrental.dto.VehicleRequest;
import com.carrental.dto.VehicleResponse;
import com.carrental.entity.Agency;
import com.carrental.entity.Vehicle;
import com.carrental.exception.ResourceAlreadyExistsException;
import com.carrental.exception.ResourceNotFoundException;
import com.carrental.repository.AgencyRepository;
import com.carrental.repository.VehicleRepository;
import com.carrental.service.VehicleService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class VehicleServiceImpl implements VehicleService {

    private final VehicleRepository vehicleRepository;
    private final AgencyRepository agencyRepository;

    private Agency resolveAgency(Long agencyId) {
        if (agencyId == null) {
            return null;
        }
        return agencyRepository.findById(agencyId)
                .orElseThrow(() -> new ResourceNotFoundException("Agency not found with id: " + agencyId));
    }

    private VehicleResponse mapToResponse(Vehicle vehicle) {
        VehicleResponse response = new VehicleResponse();
        response.setId(vehicle.getId());
        response.setBrand(vehicle.getBrand());
        response.setModel(vehicle.getModel());
        response.setYear(vehicle.getYear());
        response.setRegistrationPlate(vehicle.getRegistrationPlate());
        response.setMileage(vehicle.getMileage());
        response.setDailyRate(vehicle.getDailyRate());
        response.setStatus(vehicle.getStatus());
        if (vehicle.getAgency() != null) {
            response.setAgencyId(vehicle.getAgency().getId());
            response.setAgencyName(vehicle.getAgency().getName());
        }
        return response;
    }

    private void applyRequestToVehicle(VehicleRequest request, Vehicle vehicle) {
        vehicle.setBrand(request.getBrand());
        vehicle.setModel(request.getModel());
        vehicle.setYear(request.getYear());
        vehicle.setRegistrationPlate(request.getRegistrationPlate());
        vehicle.setMileage(request.getMileage() != null ? request.getMileage() : 0.0);
        vehicle.setDailyRate(request.getDailyRate());
        vehicle.setStatus(request.getStatus() != null ? request.getStatus() : Vehicle.VehicleStatus.AVAILABLE);
        vehicle.setAgency(resolveAgency(request.getAgencyId()));
    }

    @Override
    @Transactional(readOnly = true)
    public List<VehicleResponse> getAllVehicles() {
        return vehicleRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public VehicleResponse createVehicle(VehicleRequest request) {
        if (vehicleRepository.existsByRegistrationPlate(request.getRegistrationPlate())) {
            throw new ResourceAlreadyExistsException("Vehicle with this registration plate already exists");
        }

        Vehicle vehicle = new Vehicle();
        applyRequestToVehicle(request, vehicle);
        return mapToResponse(vehicleRepository.save(vehicle));
    }

    @Override
    public void deleteVehicle(Long id) {
        Vehicle vehicle = vehicleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Vehicle not found with id: " + id));
        vehicleRepository.delete(vehicle);
    }
}
