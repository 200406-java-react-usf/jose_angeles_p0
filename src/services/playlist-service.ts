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

    async getPlaylistById(id: number): Promise<Playlist> {
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

    async deletePlaylistById(id: number): Promise<boolean> {
        try{
            if (!isValidId(id)) {
                throw new BadRequestError();
            }
            return await this.PlaylistRepo.deleteById(id);
        } catch (e) {
            throw e;
        }     
    }
}