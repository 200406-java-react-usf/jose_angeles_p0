import {Song} from '../models/song';
import {SongRepository} from '../repos/song-repo';
import {isValidId, isValidString, isValidObject, isPropertyOf, isEmptyObject} from '../util/validator';
import { 
    BadRequestError, 
    ResourceNotFoundError, 
    NotImplementedError, 
    ResourcePersistenceError, 
    AuthenticationError 
} from "../errors/errors";

export class SongService {
    constructor (private SongRepo: SongRepository) {
        this.SongRepo = SongRepo;
    };

    async getAllSongs(): Promise<Song[]> {
        let songs = await this.SongRepo.getAll();
        if (songs.length == 0) {
            throw new ResourceNotFoundError();
        }
        return songs;
    };

    async getSongsById(id: number): Promise<Song> {
        if (!isValidId(id)) {
            throw new BadRequestError();
        }
        let songs = await this.SongRepo.getById(id);
        if (isEmptyObject(songs)){
            throw new ResourceNotFoundError();
        };
        return songs;
    }

    async addNewSong(newSong: Song): Promise<Song> {
        try {
            if(!isValidObject(newSong, 'id')){
                throw new BadRequestError('Invalid property values found in provided song.')
            }

            const persistedSong = await this.SongRepo.addNew(newSong);
            return persistedSong;
        } catch (e) {
            throw e;
        }
    }

    async updateSongById(songToUpdate: Song): Promise<boolean> {
        try {
            if (!isValidObject(songToUpdate)) {
                throw new BadRequestError('Invalid song provided (invalid values found).');
            }
            return await this.SongRepo.update(songToUpdate);
        } catch (e) {
            throw e;
        }
    }

    async deleteSongById(id: number): Promise<boolean> {
        try{
            if (!isValidId(id)) {
                throw new BadRequestError();
            }
            return await this.SongRepo.deleteById(id);
        } catch (e) {
            throw e;
        }     
    }
}