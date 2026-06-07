package com.carrental.service;

import com.carrental.dto.RentalRequest;
import com.carrental.dto.RentalResponse;
import com.carrental.dto.UpdateStatusRequest;
import org.springframework.security.core.Authentication;

import java.util.List;

public interface RentalService {

    List<RentalResponse> getAllRentals();

    RentalResponse getRentalById(Long id);

    RentalResponse createRental(RentalRequest request);

    RentalResponse createRental(RentalRequest request, Authentication authentication);

    RentalResponse updateRental(Long id, RentalRequest request);

    void cancelRental(Long id);

    List<RentalResponse> getRentalsByUserId(Long userId);

    List<RentalResponse> getMyRentals(Authentication authentication);

    RentalResponse updateStatus(Long id, UpdateStatusRequest request);



    List<RentalResponse> getRentalsByAgency(Long agencyId);
}
