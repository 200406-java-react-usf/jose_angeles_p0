import {Song} from '../models/song';
import {CrudRepository} from './crud-repo';
import {
    NotImplementedError, 
    ResourceNotFoundError, 
    ResourcePersistenceError,
    InternalServerError
} from '../errors/errors';
import {PoolClient} from 'pg';
import {connectionPool} from '..';
import {mapSongResultSet} from '../util/result-set-mapper';


export class SongRepository implements CrudRepository<Song>{
    baseQuery = `select s.song_id, s.song_name from song s`;

    async getAll(): Promise<Song[]>{
        let client: PoolClient;
        try {
            client = await connectionPool.connect();
            let sql = `${this.baseQuery};`;
            let rs = await client.query(sql); // rs = ResultSet
            return rs.rows.map(mapSongResultSet);

        } catch (e) {
            throw new InternalServerError();
        } finally {
            client && client.release();
        }
    };
    async getById(id: number): Promise<Song> {
        let client: PoolClient;
        try {
            client = await connectionPool.connect();
            let sql = `${this.baseQuery} where a.id = $1`;
            let rs = await client.query(sql);
            return mapSongResultSet(rs.rows[0]);

        } catch (e) {
            throw (e);
        } finally {
            client && client.release();
        }
    };

    async addNew(newSong: Song): Promise<Song> {
        let client: PoolClient;
        try {
            client = await connectionPool.connect();
            let sql = `insert into Song (song_name) values ($1)`;
            let rs = await client.query(sql, [newSong.name]); // rs = ResultSet
            newSong.id = rs.rows[0].id;
            return newSong;

        } catch (e) {
            throw new InternalServerError();
        } finally {
            client && client.release();
        }
    };

    async update(updatedSong: Song): Promise<boolean> {
        let client: PoolClient;
        try {
            client = await connectionPool.connect();
            let sql = `update song set song_name = $2 where song.id = $1`;
            let rs = await client.query(sql, [updatedSong.name]);
            updatedSong.id = rs.rows[0].id;
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
            let sql = `delete from song s where s.song_id = $1`;
            let rs = await client.query(sql);
            return true;

        } catch (e) {
            throw (e);
        } finally {
            client && client.release();
        }
    }
}