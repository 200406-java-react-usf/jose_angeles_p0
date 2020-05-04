import {Album} from '../models/album';
import {AlbumRepository} from '../repos/album-repo';
import {isValidId, isValidString, isValidObject, isPropertyOf, isEmptyObject} from '../util/validator';
import { 
    BadRequestError, 
    ResourceNotFoundError, 
    NotImplementedError, 
    ResourcePersistenceError, 
    AuthenticationError 
} from "../errors/errors";

export class AlbumService {
    constructor (private albumRepo: AlbumRepository) {
        this.albumRepo = albumRepo;
    };

    async getAllAlbums(): Promise<Album[]> {
        let albums = await this.albumRepo.getAll();
        if (albums.length == 0) {
            throw new ResourceNotFoundError();
        }
        return albums;
    };

    async getAlbumsById(id: number): Promise<Album> {
        if (!isValidId(id)) {
            throw new BadRequestError();
        }
        let albums = await this.albumRepo.getById(id);
        if (isEmptyObject(albums)){
            throw new ResourceNotFoundError();
        };
        return albums;
    }

    async addNewAlbum(newAlbum: Album): Promise<Album> {
        try {
            if(!isValidObject(newAlbum, 'id')){
                throw new BadRequestError('Invalid property values found in provided album.')
            }

            const persistedAlbum = await this.albumRepo.addNew(newAlbum);
            return persistedAlbum;
        } catch (e) {
            throw e;
        }
    }

    async updateAlbumById(albumToUpdate: Album): Promise<boolean> {
        try {
            if (!isValidObject(albumToUpdate)) {
                throw new BadRequestError('Invalid album provided (invalid values found).');
            }
            return await this.albumRepo.update(albumToUpdate);
        } catch (e) {
            throw e;
        }
    }

    async deleteAlbumById(id: number): Promise<boolean> {
        try{
            if (!isValidId(id)) {
                throw new BadRequestError();
            }
            return await this.albumRepo.deleteById(id);
        } catch (e) {
            throw e;
        }     
    }
}