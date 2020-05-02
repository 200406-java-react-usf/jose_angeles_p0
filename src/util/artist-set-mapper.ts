import {ArtistSchema} from './schemas';
import {Artist} from '../models/artist';

export function mapArtistResultSet(resultSet: ArtistSchema): Artist {
    if (!resultSet) {
        return {} as Artist;
    };

    return new Artist (
        resultSet.id,
        resultSet.name
    );   
}