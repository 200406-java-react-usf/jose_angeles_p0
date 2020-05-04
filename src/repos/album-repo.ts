import {Album} from '../models/album';
import {CrudRepository} from './crud-repo';
import {
    NotImplementedError, 
    ResourceNotFoundError, 
    ResourcePersistenceError,
    InternalServerError
} from '../errors/errors';
import {PoolClient} from 'pg';
import {connectionPool} from '..';
import {mapAlbumResultSet} from '../util/result-set-mapper';


export class AlbumRepository implements CrudRepository<Album>{
    baseQuery = `select a.album_id, a.album_name from album a`;

    async getAll(): Promise<Album[]>{
        let client: PoolClient;
        try {
            client = await connectionPool.connect();
            let sql = `${this.baseQuery};`;
            let rs = await client.query(sql); // rs = ResultSet
            return rs.rows.map(mapAlbumResultSet);

        } catch (e) {
            throw new InternalServerError();
        } finally {
            client && client.release();
        }
    };
    async getById(id: number): Promise<Album> {
        let client: PoolClient;
        try {
            client = await connectionPool.connect();
            let sql = `${this.baseQuery} where a.id = $1`;
            let rs = await client.query(sql);
            return mapAlbumResultSet(rs.rows[0]);

        } catch (e) {
            throw (e);
        } finally {
            client && client.release();
        }
    };

    async addNew(newAlbum: Album): Promise<Album> {
        let client: PoolClient;
        try {
            client = await connectionPool.connect();
            let sql = `insert into album (album_name) values ($1)`;
            let rs = await client.query(sql, [newAlbum.name]); // rs = ResultSet
            newAlbum.id = rs.rows[0].id;
            return newAlbum;

        } catch (e) {
            throw new InternalServerError();
        } finally {
            client && client.release();
        }
    };

    async update(updatedAlbum: Album): Promise<boolean> {
        let client: PoolClient;
        try {
            client = await connectionPool.connect();
            let sql = `update album set album_name = $2, year_released = $3 where album.id = $1`;
            let rs = await client.query(sql, [updatedAlbum.name, updatedAlbum.year_released]);
            updatedAlbum.id = rs.rows[0].id;
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
            let sql = `delete from album a where a.album_id = $1`;
            let rs = await client.query(sql);
            return true;

        } catch (e) {
            throw (e);
        } finally {
            client && client.release();
        }
    }
}