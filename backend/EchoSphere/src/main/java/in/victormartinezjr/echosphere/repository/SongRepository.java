package in.victormartinezjr.echosphere.repository;

import in.victormartinezjr.echosphere.document.Song;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface SongRepository extends MongoRepository<Song,String> {
}
