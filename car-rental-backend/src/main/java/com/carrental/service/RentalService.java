package com.carrental.service;

import com.carrental.dto.RentalRequest;
import com.carrental.dto.RentalResponse;

import java.util.List;

public interface RentalService {

    List<RentalResponse> getAllRentals();

    RentalResponse getRentalById(Long id);

    RentalResponse createRental(RentalRequest request);

    RentalResponse updateRental(Long id, RentalRequest request);

    void cancelRental(Long id);

    List<RentalResponse> getRentalsByUserId(Long userId);
}
