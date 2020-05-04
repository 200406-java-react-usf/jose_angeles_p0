import {Playlist} from  '../models/playlist';
import {CrudRepository} from './crud-repo';
import {
    NotImplementedError, 
    ResourceNotFoundError, 
    ResourcePersistenceError,
    InternalServerError
} from '../errors/errors';
import {PoolClient} from 'pg';
import {connectionPool} from '..';
import {mapPlaylistResultSet} from '../util/result-set-mapper';


export class PlaylistRepository implements CrudRepository<Playlist>{
    baseQuery = `select playlist_id, playlist_name from playlist`;

    async getAll(): Promise<Playlist[]>{
        let client: PoolClient;
        try {
            client = await connectionPool.connect();
            let sql = `${this.baseQuery};`;
            let rs = await client.query(sql); // rs = ResultSet
            return rs.rows.map(mapPlaylistResultSet);

        } catch (e) {
            throw new InternalServerError();
        } finally {
            client && client.release();
        }
    };
    async getById(id: number): Promise<Playlist> {
        let client: PoolClient;
        try {
            client = await connectionPool.connect();
            let sql = `${this.baseQuery} where playlist_id = $1`;
            let rs = await client.query(sql,[id]);
            return mapPlaylistResultSet(rs.rows[0]);

        } catch (e) {
            throw new InternalServerError();
        } finally {
            client && client.release();
        }
    };

    async addNew(newPlaylist: Playlist): Promise<Playlist> {
        let client: PoolClient;
        try {
            client = await connectionPool.connect();
            let sql = `insert into playlist (playlist_name, playlist_desc) values ($1, $2)`;
            let rs = await client.query(sql, [newPlaylist.name, newPlaylist.desc]); // rs = ResultSet
            newPlaylist.id = rs.rows[0].id;
            return newPlaylist;

        } catch (e) {
            throw new InternalServerError();
        } finally {
            client && client.release();
        }
    };

    async update(updatedPlaylist: Playlist): Promise<boolean> {
        let client: PoolClient;
        try {
            client = await connectionPool.connect();
            let sql = `update song set song_name = $2 where song.id = $1`;
            let rs = await client.query(sql, [updatedPlaylist.name]);
            updatedPlaylist.id = rs.rows[0].id;
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
            let sql = `delete from playlist p where p.playlist_id = $1`;
            let rs = await client.query(sql);
            return true;

        } catch (e) {
            throw new InternalServerError();
        } finally {
            client && client.release();
        }
    }
}

