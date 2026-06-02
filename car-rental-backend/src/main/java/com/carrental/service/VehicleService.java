package com.carrental.service;

import com.carrental.dto.VehicleRequest;
import com.carrental.dto.VehicleResponse;

import java.util.List;

public interface VehicleService {

    List<VehicleResponse> getAllVehicles();

    VehicleResponse createVehicle(VehicleRequest request);

    void deleteVehicle(Long id);
}
