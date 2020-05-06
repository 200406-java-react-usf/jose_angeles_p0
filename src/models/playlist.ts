export class Playlist {
    id: number;
    name: string;
    desc: string;
    songs: number[];

    constructor (id: number, name: string,  songs?: number[], desc?: string) {
        this.id = id;
        this.name = name;
        this.desc = desc;
        this.songs = songs;
    }
}