package in.victormartinezjr.echosphere.repository;

import in.victormartinezjr.echosphere.document.Album;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AlbumRepository extends MongoRepository<Album,String> {
}
