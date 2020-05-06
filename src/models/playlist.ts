export class Playlist {
    id: number;
    name: string;
    desc: string;
    songs: string[];

    constructor (id: number, name: string, desc: string, songs: string[]) {
        this.id = id;
        this.name = name;
        this.desc = desc;
        this.songs = songs;
    }
}