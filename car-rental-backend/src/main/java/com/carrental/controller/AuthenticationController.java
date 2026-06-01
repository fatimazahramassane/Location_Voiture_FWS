package com.carrental.controller;

import com.carrental.dto.AuthResponse;
import com.carrental.dto.LoginRequest;
import com.carrental.dto.RegisterRequest;
import com.carrental.entity.AppUser;
import com.carrental.service.AuthenticationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
@RestController
@CrossOrigin(origins = "http://localhost:3000")
@Tag(name = "Authentication", description = "API pour l'authentification et les utilisateurs")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authService;

    @PostMapping("/api/auth/register")
    @Operation(summary = "Inscrire un nouveau client")
    public ResponseEntity<AppUser> register(@Valid @RequestBody RegisterRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(authService.register(request));
    }

    @PostMapping("/api/auth/login")
    @Operation(summary = "Connexion sécurisée avec génération JWT")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @GetMapping("/api/users/profile")
    @Operation(summary = "Récupérer le profil de l'utilisateur connecté")
    public ResponseEntity<AppUser> getProfile(Authentication authentication) {
        return ResponseEntity.ok(authService.getProfile(authentication));
    }

    @PutMapping("/api/users/profile")
    @Operation(summary = "Mettre à jour le profil")
    public ResponseEntity<AppUser> updateProfile(Authentication authentication, @RequestBody AppUser updatedUser) {
        return ResponseEntity.ok(authService.updateProfile(authentication, updatedUser));
    }
}
