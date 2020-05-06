import { PlaylistService } from '../services/playlist-service';
import { PlaylistRepository } from '../repos/playlist-repo';
import { Playlist } from '../models/playlist';
import Validator from '../util/validator';
import { ResourceNotFoundError, BadRequestError } from '../errors/errors';

jest.mock('../repos/playlist-repo', () => {
    
    return new class PlaylistRepository {
            getAll = jest.fn();
            getById = jest.fn();
            addNew = jest.fn();
            addSong = jest.fn();
            removeSong = jest.fn();
            update = jest.fn();
            deleteById = jest.fn();
    }

});
describe('playlistService', () => {

    let sut: PlaylistService;
    let mockRepo;

    let mockSongs = [
        new Playlist(1, 'Gym playlist'),
        new Playlist(2, 'Rap playlist'),
        new Playlist(3, 'Romantic playlist'),
        new Playlist(4, 'Beach playlist'),
        new Playlist(5, 'Winter playlist'),
    ];

    beforeEach(() => {

        mockRepo = jest.fn(() => {
            return {
                getAll: jest.fn(),
                getById: jest.fn(),
                addNew: jest.fn(),
                addSong: jest.fn(),
                removeSong: jest.fn(),
                update: jest.fn(),
                deleteById: jest.fn()
            }
        });

        // @ts-ignore
        sut = new PlaylistService(mockRepo);
    
    });

    test('should resolve to Playlists[] when getAllUsers() successfully retrieves playlists from the data source', async () => {

        // Arrange
        expect.hasAssertions();
        mockRepo.getAll = jest.fn().mockReturnValue(mockSongs);

        // Act
        let result = await sut.getAllPlaylists();

        // Assert
        expect(result).toBeTruthy();
        expect(result.length).toBe(5);
    });

    test('should reject with ResourceNotFoundError when getAllUsers fails to get any playlists from the data source', async () => {

        // Arrange
        expect.assertions(1);
        mockRepo.getAll = jest.fn().mockReturnValue([]);

        // Act
        try {
            await sut.getAllPlaylists();
        } catch (e) {

            // Assert
            expect(e instanceof ResourceNotFoundError).toBe(true);
        }

    });

    test('should resolve to playlist[] when getPlaylistById is given a valid and known id', async () => {

        // Arrange
        expect.assertions(1);
        
        Validator.isValidId = jest.fn().mockReturnValue(true);

        mockRepo.getById = jest.fn().mockImplementation((id: number) => {
            return new Promise<Playlist>((resolve) => resolve(mockSongs[id - 1]));
        });


        // Act
        let result = await sut.getPlaylistById(1);

        // Assert
        expect(result).toBeTruthy();

    });

    test('should reject with BadRequestError when getPlaylistById is given a invalid value as an id (decimal)', async () => {

        // Arrange
        expect.hasAssertions();
        mockRepo.getById = jest.fn().mockReturnValue(false);

        // Act
        try {
            await sut.getPlaylistById(3.14);
        } catch (e) {

            // Assert
            expect(e instanceof BadRequestError).toBe(true);
        }

    });

    test('should reject with BadRequestError when getPlaylistById is given an invalid value as an id (zero)', async () => {

        // Arrange
        expect.hasAssertions();
        mockRepo.getById = jest.fn().mockReturnValue(false);

        // Act
        try {
            await sut.getPlaylistById(0);
        } catch (e) {

            // Assert
            expect(e instanceof BadRequestError).toBe(true);
        }

    });

    test('should reject with BadRequestError when getPlaylistById is given an invalid value as an id (NaN)', async () => {

        // Arrange
        expect.hasAssertions();
        mockRepo.getById = jest.fn().mockReturnValue(false);

        // Act
        try {
            await sut.getPlaylistById(NaN);
        } catch (e) {

            // Assert
            expect(e instanceof BadRequestError).toBe(true);
        }

    });

    test('should reject with BadRequestError when getPlaylistById is given an invalid value as an id (negative)', async () => {

        // Arrange
        expect.hasAssertions();
        mockRepo.getById = jest.fn().mockReturnValue(false);

        // Act
        try {
            await sut.getPlaylistById(-2);
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
            await sut.getPlaylistById(9999);
        } catch (e) {

            // Assert
            expect(e instanceof ResourceNotFoundError).toBe(true);
        }

    });

});