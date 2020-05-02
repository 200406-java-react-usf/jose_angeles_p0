export class Playlist {
    id: number;
    name: string;
    desc: string;

    constructor (id: number, name: string, desc: string) {
        this.id = id;
        this.name = name;
        this.desc = desc;
    }
}