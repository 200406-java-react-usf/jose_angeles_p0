import {Playlist} from '../models/playlist';
import {PlaylistRepository} from '../repos/playlist-repo';
import {isValidId, isValidString, isValidObject, isPropertyOf, isEmptyObject} from '../util/validator';
import { 
    BadRequestError, 
    ResourceNotFoundError, 
    NotImplementedError, 
    ResourcePersistenceError, 
    AuthenticationError 
} from "../errors/errors";

export class PlaylistService {
    constructor (private PlaylistRepo: PlaylistRepository) {
        this.PlaylistRepo = PlaylistRepo;
    };

    async getAllPlaylists(): Promise<Playlist[]> {
        let playlists = await this.PlaylistRepo.getAll();
        if (playlists.length == 0) {
            throw new ResourceNotFoundError();
        }
        return playlists;
    };

    async getPlaylistById(id: number): Promise<Playlist[]> {
        if (!isValidId(id)) {
            throw new BadRequestError();
        }
        let playlists = await this.PlaylistRepo.getById(id);
        if (isEmptyObject(playlists)){
            throw new ResourceNotFoundError();
        };
        return playlists;
    }

    async addNewPlaylist(newPlaylist: Playlist): Promise<Playlist> {
        try {
            if(!isValidObject(newPlaylist, 'id')){
                throw new BadRequestError('Invalid property values found in provided playlist.')
            }

            const persistedPlaylist = await this.PlaylistRepo.addNew(newPlaylist);
            return persistedPlaylist;
        } catch (e) {
            throw e;
        }
    }

    async addSongToPlaylist(addSong: Playlist): Promise<Playlist[]> {
        if (!isValidObject(addSong, 'id')) {
            throw new BadRequestError();
        }
        let playlist = await this.PlaylistRepo.addSong(addSong);
        return playlist;
    }

    async updatePlaylistById(playlistToUpdate: Playlist): Promise<Playlist> {
        try {
            if (!isValidObject(playlistToUpdate)) {
                throw new BadRequestError('Invalid playlist provided (invalid values found).');
            }
            return await this.PlaylistRepo.update(playlistToUpdate);
        } catch (e) {
            throw e;
        }
    }

    async deletePlaylistById(jsonObj: object): Promise<boolean> {
        let keys = Object.keys(jsonObj);
        let val = keys[0];
        let playlistID = +jsonObj[val];
        try{
            if (!isValidId(playlistID)) {
                throw new BadRequestError();
            }
            let deletedPlaylist = await this.PlaylistRepo.deleteById(playlistID);

            if (!deletedPlaylist){
                throw new ResourceNotFoundError('Playlist does not exist or has already been deleted');
            }
            return deletedPlaylist;
        } catch (e) {
            throw e;
        }    
    }

    async deleteSongFromPlaylist(song: Playlist): Promise<boolean> {
        // let keys = Object.keys(jsonObj);
        // let val = keys[0];
        // let songID = +jsonObj[val];
        let songID = song.songs[0];
        try{
            if (!isValidId(song.songs[0])) {
                throw new BadRequestError();
            }
            let deletedSong = await this.PlaylistRepo.removeSong(song);

            if (!deletedSong){
                throw new ResourceNotFoundError('Song does not exist or has already been deleted');
            }
            return deletedSong;
        } catch (e) {
            throw e;
        }    
    }
}