import express from 'express';
import AppConfig from '../config/app';

export const AlbumRouter = express.Router();

const albumService = AppConfig.albumService;

AlbumRouter.get('', async (req, res) => {
    try {
        let payload = await albumService.getAllAlbums();
        res.status(200).json(payload);        
    }catch (e) {
        res.status(e.statusCode).json(e);
    }
});

AlbumRouter.get('/:id', async (req, res) => {
    const id = +req.params.id;
    try {
        let payload = await albumService.getAlbumsById(id);
        return res.status(200).json(payload);
    } catch (e) {
        return res.status(e.statusCode).json(e);
    }
});

AlbumRouter.post('', async (req, res) => {
    console.log('POST REQUEST RECIEVED AT /albums');
    console.log(req.body);

    try {
        let newAlbum = await albumService.addNewAlbum(req.body);
        return res.status(200).json(newAlbum);
    } catch (e) {
        return res.status(e.statusCode).json(e);
    }  
});

AlbumRouter.put('', async (req, res) => {
    console.log('PUT REQUEST RECEIVED AT /albums');
    console.log(req.body);
    try {
        let updatedAlbum = await albumService.updateAlbumById(req.body);
        res.status(200).json(updatedAlbum);
    } catch (e) {
        res.status(e.statusCode).json(e);
    }
});

AlbumRouter.delete('', async (req, res) => {
    console.log('DELETE REQUEST RECEIVED AT /albums');
    console.log(req.body);

    try {
        let deletedAlbum = await albumService.deleteAlbumById(+req.body);
        res.status(200).json(deletedAlbum);
    } catch (e) {
        res.status(e.statusCode).json(e);
    }  
});
