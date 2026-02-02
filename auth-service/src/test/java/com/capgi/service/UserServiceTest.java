package com.capgi.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.capgi.model.Users;
import com.capgi.repo.UserRepository;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UserService userService;

    private Users user;

    @BeforeEach
    void setUp() {
        user = Users.builder()
                .id(1L)
                .username("testuser")
                .email("test@example.com")
                .password("encodedPassword")
                .build();
    }

    @Test
    void testProcessForgotPassword_Success() {
        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.of(user));
        when(userRepository.save(any(Users.class))).thenReturn(user);

        String token = userService.processForgotPassword("test@example.com");

        assertNotNull(token);
        verify(userRepository).save(user);
        assertNotNull(user.getResetToken());
        assertNotNull(user.getResetTokenExpiry());
    }

    @Test
    void testProcessForgotPassword_UserNotFound() {
        when(userRepository.findByEmail("nonexistent@example.com")).thenReturn(Optional.empty());

        Exception exception = assertThrows(RuntimeException.class, () -> {
            userService.processForgotPassword("nonexistent@example.com");
        });

        assertEquals("User not found with email: nonexistent@example.com", exception.getMessage());
    }

    @Test
    void testProcessResetPassword_Success() {
        user.setResetToken("validToken");
        user.setResetTokenExpiry(LocalDateTime.now().plusMinutes(10));

        when(userRepository.findAll()).thenReturn(Collections.singletonList(user));
        when(passwordEncoder.encode("newPassword")).thenReturn("encodedNewPassword");
        when(userRepository.save(any(Users.class))).thenReturn(user);

        userService.processResetPassword("validToken", "newPassword");

        verify(userRepository).save(user);
        verify(passwordEncoder).encode("newPassword");
        assertEquals("encodedNewPassword", user.getPassword());
    }

    @Test
    void testProcessResetPassword_InvalidToken() {
        when(userRepository.findAll()).thenReturn(Collections.emptyList());

        Exception exception = assertThrows(RuntimeException.class, () -> {
            userService.processResetPassword("invalidToken", "newPassword");
        });

        assertEquals("Invalid token", exception.getMessage());
    }

    @Test
    void testProcessResetPassword_ExpiredToken() {
        user.setResetToken("expiredToken");
        user.setResetTokenExpiry(LocalDateTime.now().minusMinutes(10));

        when(userRepository.findAll()).thenReturn(Collections.singletonList(user));

        Exception exception = assertThrows(RuntimeException.class, () -> {
            userService.processResetPassword("expiredToken", "newPassword");
        });

        assertEquals("Token expired", exception.getMessage());
    }
}
