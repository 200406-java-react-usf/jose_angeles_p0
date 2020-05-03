import {ArtistRepository} from '../repos/artist-repo';
import {ArtistService} from '../services/artist-service';

const artistRepo = new ArtistRepository();
const artistService = new ArtistService(artistRepo);


export default {
    artistRepo,
    artistService
};