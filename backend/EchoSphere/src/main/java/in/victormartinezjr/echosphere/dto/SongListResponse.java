package in.victormartinezjr.echosphere.dto;

import in.victormartinezjr.echosphere.document.Song;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SongListResponse {
    private boolean success;
    private List<Song> songs;
}
