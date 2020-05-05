import express from 'express';
import AppConfig from '../config/app';

export const SongRouter = express.Router();

const SongService = AppConfig.songService;

SongRouter.get('', async (req, res) => {
    try {
        let payload = await SongService.getAllSongs();
        res.status(200).json(payload);        
    }catch (e) {
        res.status(e.statusCode).json(e);
    }
});

SongRouter.get('/:id', async (req, res) => {
    const id = +req.params.id;
    try {
        let payload = await SongService.getSongsById(id);
        return res.status(200).json(payload);
    } catch (e) {
        return res.status(e.statusCode).json(e);
    }
});

SongRouter.post('', async (req, res) => {
    console.log('POST REQUEST RECIEVED AT /songs');
    console.log(req.body);

    try {
        let newSong = await SongService.addNewSong(req.body);
        
        return res.status(200).json(newSong);
    } catch (e) {
        return res.status(e.statusCode).json(e);
    }  
});

SongRouter.put('', async (req, res) => {
    console.log('PUT REQUEST RECEIVED AT /songs');
    console.log(req.body);
    try {
        let updatedSong = await SongService.updateSongById(req.body);
        res.status(200).json(updatedSong);
    } catch (e) {
        res.status(e.statusCode).json(e);
    }
});

SongRouter.delete('', async (req, res) => {
    console.log('DELETE REQUEST RECEIVED AT /songs');
    console.log(req.body);

    try {
        let deletedSong = await SongService.deleteSongById(req.body);
        res.status(200).json(deletedSong);
    } catch (e) {
        res.status(e.statusCode).json(e);
    }  
});
