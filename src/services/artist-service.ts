import {Artist} from '../models/artist';
import {ArtistRepository} from '../repos/artist-repo';
import {isValidId, isValidString, isValidObject, isPropertyOf, isEmptyObject} from '../util/validator';
import { 
    BadRequestError, 
    ResourceNotFoundError, 
    NotImplementedError, 
    ResourcePersistenceError, 
    AuthenticationError 
} from "../errors/errors";

export class ArtistService {
    constructor (private artistRepo: ArtistRepository) {
        this.artistRepo = artistRepo;
    };

    async getAllArtists(): Promise<Artist[]> {
        let artists = await this.artistRepo.getAll();
        if (artists.length == 0) {
            throw new ResourceNotFoundError();
        }
        return artists;
    };

    async getArtistsById(id: number): Promise<Artist> {
        if (!isValidId(id)) {
            throw new BadRequestError();
        }
        let artist = await this.artistRepo.getById(id);
        if (isEmptyObject(artist)){
            throw new ResourceNotFoundError();
        };
        return artist;
    }

    async addNewArtist(newArtist: Artist): Promise<Artist> {
        try {
            if(!isValidObject(newArtist, 'id')){
                throw new BadRequestError('Invalid property values found in provided user.')
            }

            const persistedArtist = await this.artistRepo.addNew(newArtist);
            return persistedArtist;
        } catch (e) {
            throw e;
        }
    }

    async updateArtistById(artistToUpdate: Artist): Promise<boolean> {
        try {
            if (!isValidObject(artistToUpdate)) {
                throw new BadRequestError('Invalid artist provided (invalid values found).');
            }
            return await this.artistRepo.update(artistToUpdate);
        } catch (e) {
            throw e;
        }
    }

    async deleteArtistById(id: number): Promise<boolean> {
        try{
            if (!isValidId(id)) {
                throw new BadRequestError();
            }
            return await this.artistRepo.deleteById(id);
        } catch (e) {
            throw e;
        }     
    }
}
