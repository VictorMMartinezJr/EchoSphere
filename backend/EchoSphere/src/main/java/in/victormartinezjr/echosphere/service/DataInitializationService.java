package in.victormartinezjr.echosphere.service;

import in.victormartinezjr.echosphere.document.User;
import in.victormartinezjr.echosphere.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class DataInitializationService implements CommandLineRunner {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        createDefaultAdminUser();
    }

    private void createDefaultAdminUser() {
        // Check if email exists
        if (!userRepository.existsByEmail("admin@echosphere.com")) {
            User admin = User.builder()
                    .email("admin@echosphere.com")
                    .password("admin123")
                    .role(User.Role.ADMIN)
                    .build();

            userRepository.save(admin);
            log.info("Created Admin User: email=admin@echosphere.com, password=admin123");
        } else {
            log.info("Admin User already exists");
        }
    }
}
