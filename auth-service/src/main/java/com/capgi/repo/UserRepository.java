package com.capgi.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.capgi.model.Users;

public interface UserRepository extends JpaRepository<Users, Long> {
    Optional<Users> findByUsername(String username);

    Optional<Users> findByEmail(String email);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);
}
