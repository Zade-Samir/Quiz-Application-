package com.capgi.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.capgi.model.Users;
import com.capgi.model.UserRole;
import com.capgi.repo.UserRepository;

@ExtendWith(MockitoExtension.class)
public class CustomUserServiceDetailsTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private CustomUserServiceDetails customUserServiceDetails;

    @Test
    void testLoadUserByUsername_Success() {
        Users user = Users.builder()
                .username("testuser")
                .password("password")
                .role(UserRole.PLAYER)
                .build();

        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(user));

        UserDetails userDetails = customUserServiceDetails.loadUserByUsername("testuser");

        assertNotNull(userDetails);
        assertEquals("testuser", userDetails.getUsername());
    }

    @Test
    void testLoadUserByUsername_UserNotFound() {
        when(userRepository.findByUsername("unknown")).thenReturn(Optional.empty());

        Exception exception = assertThrows(UsernameNotFoundException.class, () -> {
            customUserServiceDetails.loadUserByUsername("unknown");
        });

        assertEquals("User not found with username: unknown", exception.getMessage());
    }
}
