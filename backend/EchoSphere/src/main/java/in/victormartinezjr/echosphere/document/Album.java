package in.victormartinezjr.echosphere.document;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection =
        "albums")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Album {
    @Id
    @JsonProperty("_id")
    private String id;

    private String name;
    private String description;
    private String bgColor;
    private String imageUrl;
}
