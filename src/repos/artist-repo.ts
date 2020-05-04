import {Artist} from '../models/artist';
import {CrudRepository} from './crud-repo';
import {
    NotImplementedError, 
    ResourceNotFoundError, 
    ResourcePersistenceError,
    InternalServerError
} from '../errors/errors';
import {PoolClient} from 'pg';
import {connectionPool} from '..';
import {mapArtistResultSet} from '../util/result-set-mapper';


export class ArtistRepository implements CrudRepository<Artist>{
    baseQuery = `select * from artist`;

    async getAll(): Promise<Artist[]>{
        let client: PoolClient;
        try {
            client = await connectionPool.connect();
            let sql = `${this.baseQuery};`;
            let rs = await client.query(sql); // rs = ResultSet
            return rs.rows.map(mapArtistResultSet);

        } catch (e) {
            throw new InternalServerError();
        } finally {
            client && client.release();
        }
    };
    async getById(id: number): Promise<Artist> {
        let client: PoolClient;
        try {
            client = await connectionPool.connect();       
            let sql = `${this.baseQuery} where a.artist_id = $1`; 
            let rs = await client.query(sql, [id]); 
            return mapArtistResultSet(rs.rows[0]);
        } catch (e) {
            throw new InternalServerError();
        } finally {
            client && client.release();
        }
    };

    async addNew(newArtist: Artist): Promise<Artist> {
        let client: PoolClient;
        try {
            client = await connectionPool.connect();
            let sql = `insert into artist (artist_name, country, genre) values ($1)`;
            let rs = await client.query(sql, [newArtist.name, newArtist.country, newArtist.genre]); // rs = ResultSet
            newArtist.id = rs.rows[0].id;
            return newArtist;

        } catch (e) {
            throw new InternalServerError();
        } finally {
            client && client.release();
        }
    };

    async update(updatedArtist: Artist): Promise<boolean> {
        let client: PoolClient;
        try {
            client = await connectionPool.connect();
            let sql = `update artist set artist_name = $2 where artist.id = $1`;
            let rs = await client.query(sql, [updatedArtist.name]);
            updatedArtist.id = rs.rows[0].id;
            return true;
        } catch (e) {
            throw new InternalServerError();
        } finally {
            client && client.release();
        }
    };

    async deleteById(id: number): Promise<boolean> {
        let client: PoolClient;
        try {
            client = await connectionPool.connect();
            let sql = `delete from artist where artist_id = $1`;
            await client.query(sql, [id]);
            return true;

        } catch (e) {
            throw new InternalServerError();
        } finally {
            client && client.release();
        }
    }
}