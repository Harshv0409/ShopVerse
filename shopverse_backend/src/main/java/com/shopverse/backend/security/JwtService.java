package com.shopverse.backend.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;

// JwtService — JWT token banana aur verify karna
@Service
public class JwtService {

    // Secret key — isse token sign hoga, kisi ko mat batana
    private static final String SECRET = "shopverse_secret_key_minimum_256_bits_long_string";

    // Token kitne waqt valid rahega — 24 ghante
    private static final long EXPIRATION = 1000 * 60 * 60 * 24;

    // Secret key object banata hai
    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(SECRET.getBytes());
    }

    // Token generate karta hai — login ke baad call hoga
    public String generateToken(String email, String role) {
        return Jwts.builder()
                .setSubject(email)          // token mein email store karo
                .claim("role", role)        // token mein role store karo
                .setIssuedAt(new Date())    // token kab bana
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION)) // kab expire hoga
                .signWith(getSigningKey(), SignatureAlgorithm.HS256) // sign karo
                .compact();
    }

    // Token se email nikalta hai
    public String extractEmail(String token) {
        return extractClaims(token).getSubject();
    }

    // Token valid hai ya nahi check karta hai
    public boolean isTokenValid(String token) {
        try {
            extractClaims(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    // Token ke andar ki info nikalta hai
    private Claims extractClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}
