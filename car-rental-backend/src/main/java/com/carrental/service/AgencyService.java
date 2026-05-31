package com.carrental.service;

import com.carrental.dto.AgencyRequest;
import com.carrental.dto.AgencyResponse;
import com.carrental.dto.CarResponse;

import java.util.List;

public interface AgencyService {

    List<AgencyResponse> getAllAgencies();

    List<CarResponse> getAgencyCars(Long agencyId);

    AgencyResponse createAgency(AgencyRequest request);
}
