package com.shopverse.backend.repository;

import com.shopverse.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

// UserRepository — database se user dhundne ke liye
public interface UserRepository extends JpaRepository<User, Long> {

    // email se user dhundta hai — login ke waqt use hoga
    Optional<User> findByEmail(String email);
}
