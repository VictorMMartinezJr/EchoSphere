package in.victormartinezjr.echosphere.controller;

import in.victormartinezjr.echosphere.document.User;
import in.victormartinezjr.echosphere.dto.AuthRequest;
import in.victormartinezjr.echosphere.dto.AuthResponse;
import in.victormartinezjr.echosphere.dto.RegisterRequest;
import in.victormartinezjr.echosphere.dto.UserResponse;
import in.victormartinezjr.echosphere.service.AppUserDetailsService;
import in.victormartinezjr.echosphere.service.UserService;
import in.victormartinezjr.echosphere.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final AppUserDetailsService appUserDetailsService;
    private final JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest authRequest) {
        try {
            // Authenticate user
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getEmail(), authRequest.getPassword()));

            // Load user details
            UserDetails userDetails = appUserDetailsService.loadUserByUsername(authRequest.getEmail());
            User existingUser = userService.findByEmail(authRequest.getEmail());

            // Generate JWT token
            String jwtToken = jwtUtil.generateToken(userDetails, existingUser.getRole().name());

            return ResponseEntity.ok(new AuthResponse(jwtToken, authRequest.getEmail(), existingUser.getRole().name()));
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email or password incorrect");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        try {
            UserResponse response = userService.registerUser(request);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
}
