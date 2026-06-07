package com.carrental.service;

import com.carrental.dto.AuthResponse;
import com.carrental.dto.LoginRequest;
import com.carrental.dto.RegisterRequest;
import com.carrental.entity.AppUser;
import org.springframework.security.core.Authentication;

public interface AuthenticationService {

    AppUser register(RegisterRequest request);

    AuthResponse login(LoginRequest request);

    AppUser getProfile(Authentication authentication);

    AppUser updateProfile(Authentication authentication, AppUser updatedUser);
}
