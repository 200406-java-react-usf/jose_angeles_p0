export class Album {
    id: number;
    name: string;
    year_released: string;
    constructor (id: number, name: string, year_released: string){
        this.id = id;
        this.name = name;
        this.year_released = year_released;
    }
}