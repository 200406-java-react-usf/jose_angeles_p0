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
    baseQuery = `select a.artist_id, a.artist_name from artist a`;

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
    async getNameById(id: number): Promise<Artist> {
        let client: PoolClient;
        try {
            client = await connectionPool.connect();
            let sql = `${this.baseQuery} where a.id = $1`;
            let rs = await client.query(sql);
            return mapArtistResultSet(rs.rows[0]);

        } catch (e) {
            throw (e);
        } finally {
            client && client.release();
        }
    };

    async addNew(newArtist: Artist): Promise<Artist> {
        let client: PoolClient;
        try {
            client = await connectionPool.connect();
            let sql = `insert into artist (artist_name) values ($1)`;
            let rs = await client.query(sql, [newArtist.name]); // rs = ResultSet
            newArtist.id = rs.rows[0].id;
            return newArtist;

        } catch (e) {
            throw (e);
        } finally {
            client && client.release();
        }
    };

    async update(artist: Artist): Promise<boolean> {
        let client: PoolClient;
        try {
            client = await connectionPool.connect();
            let sql = `${this.baseQuery} where a.id = $1`;
            let rs = await client.query(sql);
            return true;

        } catch (e) {
            throw (e);
        } finally {
            client && client.release();
        }
    };

    async deleteById(id: number): Promise<boolean> {
        let client: PoolClient;
        try {
            client = await connectionPool.connect();
            let sql = `${this.baseQuery} where a.id = $1`;
            let rs = await client.query(sql);
            return true;

        } catch (e) {
            throw (e);
        } finally {
            client && client.release();
        }
    }

}