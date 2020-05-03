export interface ArtistSchema {
    artist_id: number;
    artist_name: string;
};

export interface AlbumSchema {
    album_id: number,
    album_name: string,
    year_released: string,
    artist_id: number
};

export interface SongSchema {
    song_id: number,
    song_name: string,
    album_id: number
};

export interface PlaylistSchema {
    playlist_id: number,
    playlist_name: string,
    playlist_desc: string
};
