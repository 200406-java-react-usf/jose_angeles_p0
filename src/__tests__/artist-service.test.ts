import { ArtistService } from '../services/artist-service';
import { ArtistRepository } from '../repos/artist-repo';
import { Artist } from '../models/artist';
import Validator from '../util/validator';
import { ResourceNotFoundError, BadRequestError } from '../errors/errors';

jest.mock('../repos/artist-repo', () => {
    
    return new class ArtistRepository {
            getAll = jest.fn();
            getById = jest.fn();
            addNew = jest.fn();
            update = jest.fn();
            deleteById = jest.fn();
    }

});
describe('artistService', () => {

    let sut: ArtistService;
    let mockRepo;

    let mockArtists = [
        new Artist(1, 'Drake', 'Canada', 'Rap'),
        new Artist(2, 'Eminem', 'US', 'Rap'),
        new Artist(3, 'Taylor Swift', 'US', 'Pop'),
        new Artist(4, 'Linkin Park', 'US', 'Rock'),
        new Artist(5, 'Ed Sheeran', 'England', 'Pop'),
    ];

    beforeEach(() => {

        mockRepo = jest.fn(() => {
            return {
                getAll: jest.fn(),
                getById: jest.fn(),
                addNew: jest.fn(),
                update: jest.fn(),
                deleteById: jest.fn()
            }
        });

        // @ts-ignore
        sut = new ArtistService(mockRepo);
    
    });

    test('should resolve to Artist[] when getAllUsers() successfully retrieves users from the data source', async () => {

        // Arrange
        expect.hasAssertions();
        mockRepo.getAll = jest.fn().mockReturnValue(mockArtists);

        // Act
        let result = await sut.getAllArtists();

        // Assert
        expect(result).toBeTruthy();
        expect(result.length).toBe(5);
    });

    test('should reject with ResourceNotFoundError when getAllUsers fails to get any artists from the data source', async () => {

        // Arrange
        expect.assertions(1);
        mockRepo.getAll = jest.fn().mockReturnValue([]);

        // Act
        try {
            await sut.getAllArtists();
        } catch (e) {

            // Assert
            expect(e instanceof ResourceNotFoundError).toBe(true);
        }

    });

    test('should resolve to Artist when getArtistById is given a valid an known id', async () => {

        // Arrange
        expect.assertions(2);
        
        Validator.isValidId = jest.fn().mockReturnValue(true);

        mockRepo.getById = jest.fn().mockImplementation((id: number) => {
            return new Promise<Artist>((resolve) => resolve(mockArtists[id - 1]));
        });


        // Act
        let result = await sut.getArtistsById(1);

        // Assert
        expect(result).toBeTruthy();
        expect(result.id).toBe(1);

    });

    test('should reject with BadRequestError when getArtistById is given a invalid value as an id (decimal)', async () => {

        // Arrange
        expect.hasAssertions();
        mockRepo.getById = jest.fn().mockReturnValue(false);

        // Act
        try {
            await sut.getArtistsById(3.14);
        } catch (e) {

            // Assert
            expect(e instanceof BadRequestError).toBe(true);
        }

    });

    test('should reject with BadRequestError when getArtistById is given an invalid value as an id (zero)', async () => {

        // Arrange
        expect.hasAssertions();
        mockRepo.getById = jest.fn().mockReturnValue(false);

        // Act
        try {
            await sut.getArtistsById(0);
        } catch (e) {

            // Assert
            expect(e instanceof BadRequestError).toBe(true);
        }

    });

    test('should reject with BadRequestError when getArtistById is given an invalid value as an id (NaN)', async () => {

        // Arrange
        expect.hasAssertions();
        mockRepo.getById = jest.fn().mockReturnValue(false);

        // Act
        try {
            await sut.getArtistsById(NaN);
        } catch (e) {

            // Assert
            expect(e instanceof BadRequestError).toBe(true);
        }

    });

    test('should reject with BadRequestError when getArtistById is given a invalid value as an id (negative)', async () => {

        // Arrange
        expect.hasAssertions();
        mockRepo.getById = jest.fn().mockReturnValue(false);

        // Act
        try {
            await sut.getArtistsById(-2);
        } catch (e) {

            // Assert
            expect(e instanceof BadRequestError).toBe(true);
        }

    });

    test('should reject with ResourceNotFoundError if getByid is given an unknown id', async () => {

        // Arrange
        expect.hasAssertions();
        mockRepo.getById = jest.fn().mockReturnValue(true);

        // Act
        try {
            await sut.getArtistsById(9999);
        } catch (e) {

            // Assert
            expect(e instanceof ResourceNotFoundError).toBe(true);
        }

    });

});