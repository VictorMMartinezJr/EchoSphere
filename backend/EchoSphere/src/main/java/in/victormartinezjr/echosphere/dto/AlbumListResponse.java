package in.victormartinezjr.echosphere.dto;

import in.victormartinezjr.echosphere.document.Album;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AlbumListResponse {
    private boolean success;
    private List<Album> albums;
}
