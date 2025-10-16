package in.victormartinezjr.echosphere.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import in.victormartinezjr.echosphere.document.Song;
import in.victormartinezjr.echosphere.dto.SongListResponse;
import in.victormartinezjr.echosphere.dto.SongRequest;
import in.victormartinezjr.echosphere.repository.SongRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class SongService {
    private final SongRepository songRepository;
    private final Cloudinary cloudinary;

    public Song addSong(SongRequest songRequest) throws IOException {
        Map<String, Object> audioUploadResult = cloudinary.uploader()
                .upload(songRequest.getAudioFile().getBytes(), ObjectUtils.asMap("resource_type", "video"));

        Map<String, Object> imageUploadResult = cloudinary.uploader()
                .upload(songRequest.getImageFile().getBytes(), ObjectUtils.asMap("resource_type", "image"));

        Double durationSeconds = (Double) audioUploadResult.get("duration");

        String duration = formatDuration(durationSeconds);

        Song songToAdd = Song.builder()
                .name(songRequest.getName())
                .albumName(songRequest.getAlbum())
                .image(imageUploadResult.get("secure_url").toString())
                .file(audioUploadResult.get("secure_url").toString())
                .duration(duration)
                .build();

        return songRepository.save(songToAdd);
    }

    public SongListResponse getAllSongs() {
        return new SongListResponse(true, songRepository.findAll());
    }

    public Boolean deleteSong(String id) {
        Song songToDelete = songRepository.findById(id).orElseThrow(() -> new RuntimeException("Song not found"));

        songRepository.delete(songToDelete);
        return true;
    }

    private String formatDuration(Double durationSeconds) {
        if (durationSeconds == null) {
            return "0:00";
        }

        int minutes = (int) (durationSeconds / 60);
        int seconds = (int) (durationSeconds % 60);

        return String.format("%d:%02d", minutes, seconds);
    }


}
