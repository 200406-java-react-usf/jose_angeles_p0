export class Artist 
{
    id: number;
    name: string;
    country: string;
    genre: string;

    constructor (id: number, name: string, country: string, genre: string) {
        this.id = id;
        this.name = name;
        this.country = country;
        this.genre = genre;
    }
}