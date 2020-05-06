import express from 'express';
import AppConfig from '../config/app';

export const PlaylistRouter = express.Router();

const PlaylistService = AppConfig.playlistService;

PlaylistRouter.get('', async (req, res) => {
    try {
        let payload = await PlaylistService.getAllPlaylists();
        res.status(200).json(payload);        
    }catch (e) {
        res.status(e.statusCode).json(e);
    }
});

PlaylistRouter.get('/:id', async (req, res) => {
    const id = +req.params.id;
    try {
        let payload = await PlaylistService.getPlaylistById(id);
        return res.status(200).json(payload);
    } catch (e) {
        return res.status(e.statusCode).json(e);
    }
});

PlaylistRouter.post('', async (req, res) => {
    console.log('POST REQUEST RECIEVED AT /playlists');
    console.log(req.body);

    try {
        let newPlaylist = await PlaylistService.addNewPlaylist(req.body);
        return res.status(200).json(newPlaylist);
    } catch (e) {
        return res.status(e.statusCode).json(e);
    }  
});

PlaylistRouter.post('/addSong', async (req, res) => {
    console.log('POST REQUEST RECIEVED AT /playlists/addSong');
    console.log(req.body);

    try {
        let addSong = await PlaylistService.addSongToPlaylist(req.body);
        return res.status(200).json(addSong);
    } catch (e) {
        return res.status(e.statusCode).json(e);
    }  
});

PlaylistRouter.put('', async (req, res) => {
    console.log('PUT REQUEST RECEIVED AT /playlists');
    console.log(req.body);
    try {
        let updatedPlaylist = await PlaylistService.updatePlaylistById(req.body);
        res.status(200).json(updatedPlaylist);
    } catch (e) {
        res.status(e.statusCode).json(e);
    }
});

PlaylistRouter.delete('', async (req, res) => {
    console.log('DELETE REQUEST RECEIVED AT /playlists');
    console.log(req.body);

    try {
        let deletedPlaylist = await PlaylistService.deletePlaylistById(req.body);
        res.status(200).json(deletedPlaylist);
    } catch (e) {
        res.status(e.statusCode).json(e);
    }  
});

PlaylistRouter.delete('/delete', async (req, res) => {
    console.log('DELETE REQUEST RECEIVED AT /playlists/delete');
    console.log(req.body);

    try {
        let deletedSong = await PlaylistService.deleteSongFromPlaylist(req.body);
        res.status(200).json(deletedSong);
    } catch (e) {
        res.status(e.statusCode).json(e);
    }  
});