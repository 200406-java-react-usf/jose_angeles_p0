import { ArtistSchema, AlbumSchema, SongSchema, PlaylistSchema } from './schemas';
import { Artist } from '../models/artist';
import { Album } from '../models/album';
import { Song } from '../models/song';
import { Playlist } from '../models/playlist';

export function mapArtistResultSet(resultSet: ArtistSchema): Artist {
    if (!resultSet) {
        return {} as Artist;
    };

    return new Artist (
        resultSet.artist_id,
        resultSet.artist_name
    );   
};

export function mapAlbumResultSet(resultSet: AlbumSchema): Album {
    if(!resultSet) {
        return {} as Album;
    };

    return new Album (
        resultSet.album_id,
        resultSet.album_name,
        resultSet.year_released
    );
};

export function mapSongResultSet(resultSet: SongSchema): Song {
    if(!resultSet) {
        return {} as Song;
    };

    return new Song (
        resultSet.song_id,
        resultSet.song_name,
    );
};

export function mapPlaylistResultSet(resultSet: PlaylistSchema): Playlist {
    if(!resultSet) {
        return {} as Playlist;
    };

    return new Playlist (
        resultSet.playlist_id,
        resultSet.playlist_name,
        resultSet.playlist_desc
    );
}
