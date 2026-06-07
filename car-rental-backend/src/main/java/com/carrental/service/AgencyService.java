package com.carrental.service;

import com.carrental.dto.AgencyRequest;
import com.carrental.dto.AgencyResponse;
import com.carrental.dto.CarResponse;
import com.carrental.entity.Agency;

import java.util.List;

public interface AgencyService {

    List<AgencyResponse> getAllAgencies();

    List<CarResponse> getAgencyCars(Long agencyId);

    AgencyResponse createAgency(AgencyRequest request);
    Agency assignManagerToAgency(Long agencyId, Long managerId);

    AgencyResponse getAgencyByManagerId(Long managerId);

    String getAgencyNameById(Long id);
}
