import {Playlist} from  '../models/playlist';
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
import {mapPlaylistResultSet} from '../util/result-set-mapper';


export class PlaylistRepository {
    baseQuery = `select p.playlist_id as id, 
                        s.song_name as tracks,
                        p.playlist_name as name
                        from playlist p 
                        join tracker t
                        on p.playlist_id = t.playlist_id
                        join song s
                        on s.song_id = t.song_id
                        `;

    async getAll(): Promise<Playlist[]>{
        let client: PoolClient;
        try {
            client = await connectionPool.connect();
            let sql = `select * from playlist`;
            let rs = await client.query(sql); // rs = ResultSet
            return rs.rows.map(mapPlaylistResultSet);

        } catch (e) {
            throw new InternalServerError();
        } finally {
            client && client.release();
        }
    };
    
    async getById(id: number): Promise<Playlist[]> {
        let client: PoolClient;
        try {
            client = await connectionPool.connect();
            let sql = `${this.baseQuery} where p.playlist_id = $1`;
            let rs = await client.query(sql,[id]);        
            // return mapPlaylistResultSet(rs.rows[0]);
            return rs.rows;

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
            let sql = `insert into playlist (playlist_name, playlist_desc) values ($1, $2) returning playlist_id`;
            let rs = await client.query(sql, [newPlaylist.name, newPlaylist.desc]); // rs = ResultSet
            
            newPlaylist.id = rs.rows[0].id;
            return newPlaylist;

        } catch (e) {
            throw new InternalServerError();
        } finally {
            client && client.release();
        }
    };

    async addSong(addSong: Playlist): Promise<Playlist[]> {
        let client: PoolClient;
        try {
            client = await connectionPool.connect();
            let sql = `insert into tracker (playlist_id, song_id) values
                                            ($1, $2)`;
            console.log(addSong.id);                                     
            console.log(addSong.songs[0]);
            
            let rs2 = await client.query(sql, [addSong.id, addSong.songs[0]]); 
            console.log(rs2);
            
            let sql2 = `${this.baseQuery} where p.playlist_id = $1`;
            let rs = await client.query(sql2, [addSong.id]);           
            return rs.rows;

        } catch (e) {
            throw new InternalServerError('Song doesn\'t exist or has been deleted');
        } finally {
            client && client.release();
        }
    }

    async removeSong(removeSong: Playlist): Promise<boolean> {
        let client: PoolClient;
        try {
            client = await connectionPool.connect();
            let sql = `delete from tracker t 
                                    where t.playlist_id = $1 
                                    and t.song_id = $2`;
            console.log(removeSong.id);                                     
            console.log(removeSong.songs[0]);
            
            let rs = await client.query(sql, [removeSong.id, removeSong.songs[0]]); 
            console.log(rs);         
            if (rs.rowCount) return true;
            return false;

        } catch (e) {
            throw new InternalServerError('Song doesn\'t exist or has been deleted');
        } finally {
            client && client.release();
        }
    }

    async update(updatedPlaylist: Playlist): Promise<Playlist> {
        let client: PoolClient;
        try {
            client = await connectionPool.connect();
            let sql = `update playlist set playlist_name = $2,
                                           playlist_desc = $3 where playlist_id = $1 returning playlist_id`;
            let rs = await client.query(sql, [updatedPlaylist.id, updatedPlaylist.name, updatedPlaylist.desc]);
            
            updatedPlaylist.id = rs.rows[0].id;
            return updatedPlaylist;
        } catch (e) {
            throw new InternalServerError('Playlist doesn\'t exist or has already been deleted');
        } finally {
            client && client.release();
        }
    };

    async deleteById(id: number): Promise<boolean> {
        let client: PoolClient;
        try {
            client = await connectionPool.connect();
            let sql = `delete from playlist where playlist_id = $1`;
            let rs = await client.query(sql, [id]);
            console.log(rs);
            
            if (rs.rowCount) return true;
            return false;

        } catch (e) {
            throw new InternalServerError();
        } finally {
            client && client.release();
        }
    }
}

