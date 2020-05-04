import {ArtistRepository} from '../repos/artist-repo';
import {ArtistService} from '../services/artist-service';
import {AlbumRepository} from '../repos/album-repo';
import {AlbumService} from '../services/album-service';
import {SongRepository} from '../repos/song-repo';
import {SongService} from '../services/song-service';
import {PlaylistRepository} from '../repos/playlist-repo';
import {PlaylistService} from '../services/playlist-service';

const artistRepo = new ArtistRepository();
const artistService = new ArtistService(artistRepo);

const albumRepo = new AlbumRepository();
const albumService = new AlbumService(albumRepo);

const songRepo = new SongRepository();
const songService = new SongService(songRepo);

const playlistRepo = new PlaylistRepository();
const playlistService = new PlaylistService(playlistRepo);

export default {
    artistRepo,
    artistService,
    albumRepo, 
    albumService,
    songRepo,
    songService,
    playlistRepo,
    playlistService
};