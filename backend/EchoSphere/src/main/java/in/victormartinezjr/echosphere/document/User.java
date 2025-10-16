package in.victormartinezjr.echosphere.document;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class User {
    @Id
    @JsonProperty("_id")
    private String id;

    @Indexed(unique = true)
    private String email;
    private String password;
    private Role role = Role.USER;

    public enum Role {
        USER, ADMIN
    }
}
