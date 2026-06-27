package com.shopverse.backend.vo;

// UserVO — Angular se aane wala data is format mein hoga
// Register aur Login dono ke liye same VO use karenge
import lombok.Data;

@Data
public class UserVO {

    private String name;     // sirf register mein use hoga
    private String email;    // register + login dono mein
    private String password; // register + login dono mein
}
