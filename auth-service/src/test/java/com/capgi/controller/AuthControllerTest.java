package com.capgi.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.Collections;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.capgi.dto.ForgotPasswordRequest;
import com.capgi.dto.LoginRequest;
import com.capgi.dto.ResetPasswordRequest;
import com.capgi.dto.SignUpRequest;
import com.capgi.model.UserRole;
import com.capgi.model.Users;
import com.capgi.repo.UserRepository;
import com.capgi.service.JWTService;
import com.capgi.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;

@ExtendWith(MockitoExtension.class)
public class AuthControllerTest {

        private MockMvc mockMvc;

        @Mock
        private UserRepository userRepository;

        @Mock
        private PasswordEncoder passwordEncoder;

        @Mock
        private AuthenticationManager authenticationManager;

        private JWTService jwtService;
        private UserService userService;
        private AuthController authController;

        private ObjectMapper objectMapper = new ObjectMapper();
        private Users user;

        @BeforeEach
        void setUp() {
                // Instantiate real services to avoid mocking classes (Java 25 Mockito issue)
                jwtService = new JWTService();
                ReflectionTestUtils.setField(jwtService, "secretKey",
                                "404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970");
                ReflectionTestUtils.setField(jwtService, "jwtExpiration", 1000 * 60 * 24);
                // refreshExpiration does not exist in the file view, so omitting it.

                userService = new UserService(userRepository, passwordEncoder);

                authController = new AuthController(userRepository, passwordEncoder, jwtService, authenticationManager,
                                userService);

                mockMvc = MockMvcBuilders.standaloneSetup(authController).build();

                user = Users.builder()
                                .id(1L)
                                .username("testuser")
                                .email("test@example.com")
                                .password("encodedPassword")
                                .role(UserRole.PLAYER)
                                .build();
        }

        @Test
        void testRegister() throws Exception {
                SignUpRequest request = new SignUpRequest("testuser", "test@example.com", "password", UserRole.PLAYER);

                when(passwordEncoder.encode(any(String.class))).thenReturn("encodedPassword");
                // For void or object returning methods
                when(userRepository.save(any(Users.class))).thenReturn(user);

                mockMvc.perform(post("/api/auth/register")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(request)))
                                .andExpect(status().isOk())
                                .andExpect(jsonPath("$.token").exists());
        }

        @Test
        void testLogin() throws Exception {
                LoginRequest request = new LoginRequest("testuser", "password");

                when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                                .thenReturn(null);
                when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(user));

                mockMvc.perform(post("/api/auth/login")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(request)))
                                .andExpect(status().isOk())
                                .andExpect(jsonPath("$.token").exists());
        }

        @Test
        void testForgotPassword() throws Exception {
                ForgotPasswordRequest request = new ForgotPasswordRequest("test@example.com");

                when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.of(user));
                // UserService.processForgotPassword calls userRepository.save internally
                when(userRepository.save(any(Users.class))).thenReturn(user);

                mockMvc.perform(post("/api/auth/forgot-password")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(request)))
                                .andExpect(status().isOk());
        }

        @Test
        void testResetPassword() throws Exception {
                ResetPasswordRequest request = new ResetPasswordRequest("validToken", "newPassword");

                user.setResetToken("validToken");
                user.setResetTokenExpiry(java.time.LocalDateTime.now().plusMinutes(10));

                // Mock findAll() as UserService uses it to find token
                when(userRepository.findAll()).thenReturn(Collections.singletonList(user));
                when(passwordEncoder.encode("newPassword")).thenReturn("newEncodedPassword");

                mockMvc.perform(post("/api/auth/reset-password")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(request)))
                                .andExpect(status().isOk())
                                .andExpect(jsonPath("$").value("Password reset successfully"));
        }
}
