package in.victormartinezjr.echosphere.service;

import in.victormartinezjr.echosphere.document.User;
import in.victormartinezjr.echosphere.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Collections;

@Service
@RequiredArgsConstructor
public class AppUserDetailsService implements UserDetailsService {
    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User existingUser = userRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User not found"));

        return new org.springframework.security.core.userdetails.User(existingUser.getEmail(), existingUser.getPassword(), getAuthorities(existingUser));
    }

    private Collection<? extends GrantedAuthority> getAuthorities(User existingUser) {
        return Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + existingUser.getRole().name()));
    }
}
