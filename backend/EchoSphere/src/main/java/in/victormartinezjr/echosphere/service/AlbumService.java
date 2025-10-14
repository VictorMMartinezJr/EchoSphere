package in.victormartinezjr.echosphere.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import in.victormartinezjr.echosphere.document.Album;
import in.victormartinezjr.echosphere.dto.AlbumRequest;
import in.victormartinezjr.echosphere.repository.AlbumRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AlbumService {

    private final AlbumRepository albumRepository;
    private final Cloudinary cloudinary;


    public Album addAlbum(AlbumRequest albumRequest) throws IOException {
        Map<String, Object> imageUploadResult = cloudinary.uploader().upload(albumRequest.getImageFile().getBytes(), ObjectUtils.asMap("resource_type", "image"));

        Album newAlbum = Album.builder()
                .name(albumRequest.getName())
                .description(albumRequest.getDescription())
                .bgColor(albumRequest.getBgColor())
                .imageUrl(imageUploadResult.get("secure_url").toString())
                .build();

        return albumRepository.save(newAlbum);
    }
}
