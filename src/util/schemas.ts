export interface ArtistSchema {
    artist_id: number;
    artist_name: string;
    country: string;
    genre: string;
};

export interface SongSchema {
    song_id: number,
    song_name: string,
    artist_name: string
};

export interface PlaylistSchema {
    playlist_id: number,
    playlist_name: string,
    playlist_desc: string,
    playlist_songs: string[]
};
