package com.carrental.controller;

import com.carrental.dto.AgencyRequest;
import com.carrental.dto.AgencyResponse;
import com.carrental.dto.CarResponse;
import com.carrental.entity.Agency;
import com.carrental.service.AgencyService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/agencies")
@CrossOrigin(origins = "http://localhost:3000")
@Tag(name = "Agencies", description = "API pour la gestion des agences")
@RequiredArgsConstructor
public class AgencyController {

    private final AgencyService agencyService;

    @GetMapping
    @Operation(summary = "Liste de toutes les agences")
    public ResponseEntity<List<AgencyResponse>> getAllAgencies() {
        return ResponseEntity.ok(agencyService.getAllAgencies());
    }

    @GetMapping("/{id}/cars")
    @Operation(summary = "Liste des véhicules d'une agence spécifique")
    public ResponseEntity<List<CarResponse>> getAgencyCars(@PathVariable Long id) {
        return ResponseEntity.ok(agencyService.getAgencyCars(id));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Créer une nouvelle agence")
    public ResponseEntity<AgencyResponse> createAgency(@Valid @RequestBody AgencyRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(agencyService.createAgency(request));
    }



    @PostMapping("/{agencyId}/manager/{managerId}")
    @PreAuthorize("hasRole('ROLE_MANAGER')")
    public ResponseEntity<Agency> assignManager(@PathVariable Long agencyId, @PathVariable Long managerId) {
        return ResponseEntity.ok(agencyService.assignManagerToAgency(agencyId, managerId));
    }


    @GetMapping("/manager/{managerId}")
    @PreAuthorize("hasRole('ROLE_MANAGER')")
    public ResponseEntity<AgencyResponse> getAgencyByManager(@PathVariable Long managerId) {
        return ResponseEntity.ok(agencyService.getAgencyByManagerId(managerId));
    }


    @GetMapping("/{id}/name")
    @PreAuthorize("hasRole('ROLE_MANAGER') or hasRole('ROLE_ADMIN')")
    public ResponseEntity<String> getAgencyName(@PathVariable Long id) {
        return ResponseEntity.ok(agencyService.getAgencyNameById(id));
    }
}
