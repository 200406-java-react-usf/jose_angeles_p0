import { ArtistRepository } from '../repos/artist-repo';
import * as mockIndex from '..';
import * as mockMapper from '../util/result-set-mapper';
import { Artist } from '../models/artist';
import { release } from 'os';


/*
    We need to mock the connectionPool exported from the main module
    of our application. At this time, we only use one exposed method
    of the pg Pool API: connect. So we will provide a mock function 
    in its place so that we can mock it in our tests.
*/
jest.mock('..', () => {
    return {
        connectionPool: {
            connect: jest.fn()
        }
    }
});

// The result-set-mapper module also needs to be mocked
jest.mock('../util/result-set-mapper', () => {
    return {
        mapUserResultSet: jest.fn()
    }
});

describe('ArtistRepo', () => {
    let sut = new ArtistRepository();
    let mockConnect = mockIndex.connectionPool.connect;

    // beforeEach(() => {
        /*
            We can provide a successful retrieval as the default mock implementation
            since it is very verbose. We can provide alternative implementations for
            the query and release methods in specific tests if needed.
        */
    //     (mockConnect as jest.Mock).mockClear().mockImplementation(() => {
    //         return {
    //             query: jest.fn().mockImplementation(() => {
    //                 return {
    //                     rows: [
    //                         {
    //                             id: 1,
    //                             name: 'Drake'
    //                         }
    //                     ]
    //                 }
    //             }),
    //             release: jest.fn()
    //         }
    //     });
    //     (mockMapper.mapArtistResultSet as jest.Mock).mockClear();
    // });

    test('should return an array of artists when getAll retrieves records from DB', async () =>{
        // Arrange 
        expect.hasAssertions();
        let mockArtist = new Artist (1, 'name', 'country', 'genre');
        (mockMapper.mapArtistResultSet as jest.Mock).mockReturnValue(mockArtist);

        // Act
        let result = await sut.getAll();

        // Assert 
        expect(result).toBeTruthy();
        expect(result instanceof Array).toBe(true);
        expect(result.length).toBe(1);
        expect(mockConnect).toBeCalledTimes(1);
    })
});

