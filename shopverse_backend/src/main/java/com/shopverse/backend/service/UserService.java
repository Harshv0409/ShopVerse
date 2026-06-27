package com.shopverse.backend.service;

import com.shopverse.backend.vo.UserVO;
import org.springframework.http.ResponseEntity;

// UserService — ye sirf contract hai, actual kaam UserServiceImpl mein hoga
public interface UserService {

    // naya user register karna
    ResponseEntity<?> register(UserVO userVO);

    // user login karna
    ResponseEntity<?> login(UserVO userVO);
}
