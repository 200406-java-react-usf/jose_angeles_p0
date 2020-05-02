import {Artist} from '../models/artist';
import {CrudRepository} from './crud-repo';
import {PoolClient} from 'pg';
import {connectionPool} from '..';
import {mapArtistResultSet} from '../util/artist-set-mapper';


export class ArtistRepository implements CrudRepository<Artist>{
    async getAll(): Promise<Artist[]>{

    };
    async getNameById(id: number): Promise<Artist> {

    };

    async addNew(newArtist: Artist): Promise<boolean> {

    };

    async update(artist: Artist): Promise<boolean> {

    };

    async deleteById(id: number): Promise<boolean> {

    }

}