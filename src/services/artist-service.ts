import {Artist} from '../models/artist';
import {ArtistRepository} from '../repos/artist-repo';
import {isValidId, isValidStrings, isValidObject, isPropertyOf, isEmptyObject} from '../util/validator';
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
                throw new BadRequestError('Invalid property values found in provided artist.')
            }

            const persistedArtist = await this.artistRepo.addNew(newArtist);
            return persistedArtist;
        } catch (e) {
            throw e;
        }
    }

    async updateArtistById(artistToUpdate: Artist): Promise<Artist> {
        try {
            if (!isValidObject(artistToUpdate, 'id') || !isValidObject(artistToUpdate.id)) {
                throw new BadRequestError('Invalid artist provided (invalid values found).');
            }
            if (!artistToUpdate){
                throw new ResourceNotFoundError();
            }
            let persistedArtist = await this.artistRepo.update(artistToUpdate);
            return persistedArtist;
        } catch (e) {
            throw e;
        }
    }

    async deleteArtistById(jsonObj: object): Promise<boolean> {
        let keys = Object.keys(jsonObj);
        let val = keys[0];
        let artistId = +jsonObj[val];
        try{
            if (!isValidId(artistId)) {
                throw new BadRequestError();
            }
            let deletedArtist = await this.artistRepo.deleteById(artistId);

            if (!deletedArtist){
                throw new ResourceNotFoundError('Artist does not exist');
            }
            return deletedArtist;
        } catch (e) {
            throw e;
        }     
    }
}
