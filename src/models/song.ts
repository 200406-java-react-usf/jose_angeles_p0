export class Song {
    id: number;
    name: string;
    artist_name: string;

    constructor (id: number, name: string, artist_name: string){
        this.id = id;
        this.name = name;
        this.artist_name = artist_name;
    }
}