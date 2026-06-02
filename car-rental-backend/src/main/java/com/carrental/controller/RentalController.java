package com.carrental.controller;

import com.carrental.dto.RentalRequest;
import com.carrental.dto.RentalResponse;
import com.carrental.dto.UpdateStatusRequest;
import com.carrental.service.RentalService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rentals")
@CrossOrigin(origins = "http://localhost:3000")
@Tag(name = "Rentals", description = "API pour la gestion des locations")
@RequiredArgsConstructor
public class RentalController {

    private final RentalService rentalService;

    @PostMapping
    @Operation(summary = "Soumettre une nouvelle demande de location")
    public ResponseEntity<RentalResponse> createRental(
            @Valid @RequestBody RentalRequest request,
            Authentication authentication) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(rentalService.createRental(request, authentication));
    }

    @GetMapping("/my-history")
    @Operation(summary = "Historique des réservations de l'utilisateur connecté")
    public ResponseEntity<List<RentalResponse>> getMyRentals(Authentication authentication) {
        return ResponseEntity.ok(rentalService.getMyRentals(authentication));
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    @Operation(summary = "Liste complète de toutes les locations")
    public ResponseEntity<List<RentalResponse>> getAllRentals() {
        return ResponseEntity.ok(rentalService.getAllRentals());
    }

    @PutMapping("/{id}/status")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    @Operation(summary = "Modifier le statut d'une location (ACTIVE, COMPLETED, CANCELLED)")
    public ResponseEntity<RentalResponse> updateRentalStatus(
            @PathVariable Long id,
            @Valid @RequestBody UpdateStatusRequest request) {
        return ResponseEntity.ok(rentalService.updateStatus(id, request));
    }
}
