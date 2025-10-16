package in.victormartinezjr.echosphere.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import in.victormartinezjr.echosphere.dto.SongListResponse;
import in.victormartinezjr.echosphere.dto.SongRequest;
import in.victormartinezjr.echosphere.service.SongService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/songs")
@RequiredArgsConstructor
public class SongController {
    private final SongService songService;

    @PostMapping
    public ResponseEntity<?> addSong(@RequestPart("request") String requestString,
                                     @RequestPart("audio")MultipartFile audioFile,
                                     @RequestPart("image") MultipartFile imageFile) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            SongRequest songRequest = objectMapper.readValue(requestString, SongRequest.class);
            songRequest.setImageFile(imageFile);
            songRequest.setAudioFile(audioFile);

            return ResponseEntity.status(HttpStatus.CREATED).body(songService.addSong(songRequest));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<?> getAllSongs() {
        try {
            return ResponseEntity.ok(songService.getAllSongs());
        } catch (Exception e) {
            return ResponseEntity.ok(new SongListResponse(false, null));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSong(@PathVariable String id) {
        try {
            boolean deleted = songService.deleteSong(id);
            if (deleted) {
                return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
            }

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
}
