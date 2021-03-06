import {ArtistRepository} from '../repos/artist-repo';
import * as mockIndex from '..';
import * as mockMapper from '../util/result-set-mapper';
import {Artist} from '../models/artist';
import {InternalServerError} from '../errors/errors';

//Mock Connection Pool
jest.mock('..', () => {
    return {
        connectionPool: {
            connect: jest.fn()
        }
    };
});

//Mock result set mapper
jest.mock('../util/result-set-mapper', () => {
    return {
        mapArtistResultSet: jest.fn()
    };
});

describe('artistRepo', () => {

    let sut = new ArtistRepository();
    let mockConnect = mockIndex.connectionPool.connect;

    beforeEach(() => {

        /*
            We can provide a successful retrieval as the default mock implementation
            since it is very verbose. We can provide alternative implementations for
            the query and release methods in specific tests if needed.
        */
        (mockConnect as jest.Mock).mockClear().mockImplementation(() => {
            return {
                query: jest.fn().mockImplementation(() => {
                    return {
                        rows: [
                            {
                                id: 1,
                                name: 'test',
                                country: 'test',
                                genre: 'test' 
                            }
                        ]
                    }
                }), 
                release: jest.fn()
            }
        });
        (mockMapper.mapArtistResultSet as jest.Mock).mockClear();
    });

    test('should resolve to an array of Users when getAll retrieves records from data source', async () => {
        
        // Arrange
        expect.hasAssertions();

        let mockArtist = new Artist(1, 'test', 'test', 'test');
        (mockMapper.mapArtistResultSet as jest.Mock).mockReturnValue(mockArtist);

        // Act
        let result = await sut.getAll();

        // Assert
        expect(result).toBeTruthy();
        expect(result instanceof Array).toBe(true);
        expect(result.length).toBe(1);
        expect(mockConnect).toBeCalledTimes(1);

    });

    test('should resolve to an empty array when getAll retrieves no records from data source', async () => {
        
        // Arrange
        expect.hasAssertions();
        (mockConnect as jest.Mock).mockImplementation(() => {
            return {
                query: jest.fn().mockImplementation(() => { return { rows: [] } }), 
                release: jest.fn()
            }
        });

        // Act
        let result = await sut.getAll();

        // Assert
        expect(result).toBeTruthy();
        expect(result instanceof Array).toBe(true);
        expect(result.length).toBe(0);
        expect(mockConnect).toBeCalledTimes(1);

    });

    test('should resolve to a Artist object when getById retrieves a record from data source', async () => {

        // Arrange
        expect.hasAssertions();

        let mockArtist = new Artist (1, 'mike', 'peru', 'pop');
        (mockMapper.mapArtistResultSet as jest.Mock).mockReturnValue(mockArtist);

        // Act
        let result = await sut.getById(1);

        // Assert
        expect(result).toBeTruthy();
        expect(result instanceof Artist).toBe(true);

    });

    test('should return InternalServerError when getbyId does not find a card with specified ID', async () => {

        expect.hasAssertions();

        let mockArtist = new Artist(1, 'test', 'test', 'test');
        (mockConnect as jest.Mock).mockImplementation(() => {
            return {
                query: jest.fn().mockImplementation(() => {
                    return false;
                }),
                release: jest.fn()
            };
        });

        try{
            await sut.getById(mockArtist.id);
        } catch(e){
            expect(e instanceof InternalServerError).toBe(true);
        }

    });
    
    test('should return a new Artist Object when save adds a new user to the db', async () => {

        //Arrange
        expect.hasAssertions();

        let mockArtist = new Artist(1, 'test', 'test', 'test');
        (mockMapper.mapArtistResultSet as jest.Mock).mockReturnValue(mockArtist);

        //Act
        let result = await sut.addNew(mockArtist);

        //Assert
        expect(result).toBeTruthy();
        expect(result instanceof Artist).toBeTruthy();        

    });

    test('should return InternalServerError when addNew runs into an error adding to the db', async () => {

        expect.hasAssertions();

        let mockArtist = new Artist(1, 'test', 'test', 'test');
        (mockConnect as jest.Mock).mockImplementation(() => {
            return {
                query: jest.fn().mockImplementation(() => {
                    return false;
                }),
                release: jest.fn()
            };
        });

        try{
            await sut.addNew(mockArtist);
        } catch(e){
            expect(e instanceof InternalServerError).toBe(true);
        }

    });

    test('should return the updated Artist when given a valid Artist to update', async() => {

        expect.hasAssertions();

        let mockArtist = new Artist(1, 'test', 'test', 'test');
        (mockConnect as jest.Mock).mockImplementation(() => {
            return {
                query: jest.fn().mockImplementation(() => {
                    return mockArtist;
                }),
                release: jest.fn()
            };
        });
        console.log(mockArtist);
        

        let result = await sut.update(mockArtist);

        console.log(result);
        

        expect(result).toBeTruthy();
        expect(result instanceof Artist).toBe(true);

    });

    test('should return InternalServerError when update is given a invalid artist to update', async() => {

        expect.hasAssertions();

        let mockArtist = new Artist(1, 'test', 'test', 'test');
        (mockConnect as jest.Mock).mockImplementation(() => {
            return {
                query: jest.fn().mockImplementation(() => {
                    throw new Error();
                }),
                release: jest.fn()
            };
        });

        try{
            await sut.update(mockArtist);
        } catch (e){
            expect(e instanceof InternalServerError).toBe(true);
        }

    });

    test('should return true when deleteById is given a valid id to delete', async() => {

        expect.hasAssertions();

        let mockArtist = new Artist(1, 'test', 'test', 'test');
        (mockConnect as jest.Mock).mockImplementation(() => {
            return {
                query: jest.fn().mockImplementation(() => {
                    return true;
                }),
                release: jest.fn()
            };
        });

        let result = await sut.deleteById(mockArtist.id);
        

        expect(result).toBeTruthy();
        expect(result).toBe(true);

    });

    test('should return InternalServerError when deleteById fails to delete an artist', async() => {

        expect.hasAssertions();

        let mockArtist = new Artist(1, 'test', 'test', 'test');
        (mockConnect as jest.Mock).mockImplementation(() => {
            return {
                query: jest.fn().mockImplementation(() => {
                    throw new Error;
                }),
                release: jest.fn()
            };
        });

        try{
            await sut.deleteById(mockArtist.id);
        } catch(e){
            expect( e instanceof InternalServerError).toBe(true);
        }

    });
});
