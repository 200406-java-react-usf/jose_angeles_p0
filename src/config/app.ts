import {ArtistRepository} from '../repos/artist-repo';
import {ArtistService} from '../services/artist-service';
import {SongRepository} from '../repos/song-repo';
import {SongService} from '../services/song-service';
import {PlaylistRepository} from '../repos/playlist-repo';
import {PlaylistService} from '../services/playlist-service';

const artistRepo = new ArtistRepository();
const artistService = new ArtistService(artistRepo);

const songRepo = new SongRepository();
const songService = new SongService(songRepo);

const playlistRepo = new PlaylistRepository();
const playlistService = new PlaylistService(playlistRepo);

export default {
    artistRepo,
    artistService,
    songRepo,
    songService,
    playlistRepo,
    playlistService
};