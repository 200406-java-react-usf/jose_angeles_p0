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
    baseQuery = `select s.song_id as id, 
                        s.song_name as name, 
                        a.artist_name 
                        from song s 
                        join artist a
                        on s.artist_fk = a.artist_id`;

    async getAll(): Promise<Song[]>{
        let client: PoolClient;
        try {
            client = await connectionPool.connect();
            let sql = `${this.baseQuery}`;
            let rs = await client.query(sql); // rs = ResultSet
            console.log(rs);
            return rs.rows;
            // return rs.rows.map(mapSongResultSet);

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
            let sql = `${this.baseQuery} where s.song_id = $1`;
            let rs = await client.query(sql, [id]);
            // return mapSongResultSet(rs.rows[0]);
            return rs.rows[0];

        } catch (e) {
            throw new InternalServerError();
        } finally {
            client && client.release();
        }
    };

    async addNew(newSong: Song): Promise<Song> {
        let client: PoolClient;
        try {
            client = await connectionPool.connect();
            let artistID = (await client.query(`select artist_id from artist where artist_name = $2`, [newSong.artist_name]));
            console.log(artistID);
            
            let sql = `insert into song (song_name, artist_fk) values ($1, ${+artistID}) returning song_id`;
            let rs = await client.query(sql, [newSong.name, artistID]); // rs = ResultSet
            newSong.id = rs.rows[0].id;
            return newSong;

        } catch (e) {
            throw new InternalServerError();
        } finally {
            client && client.release();
        }
    };

    async update(updatedSong: Song): Promise<Song> {
        let client: PoolClient;
        try {
            client = await connectionPool.connect();
            let sql = `update song set song_name = $2 where song.id = $1`;
            let rs = await client.query(sql, [updatedSong.name]);
            updatedSong.id = rs.rows[0].id;
            return updatedSong;
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