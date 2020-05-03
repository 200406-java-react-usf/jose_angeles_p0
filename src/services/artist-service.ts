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

}
