import express from 'express';
import {artistService} from '../config/app';

export const ArtistRouter = express.Router();

const ArtistService = artistService;

ArtistRouter.get('', async (req, res) => {
    try {
        let payload = await ArtistService.getAllArtists();
        res.status(200).json(payload);        
    }catch (e) {
        res.status(e.statusCode).json(e);
    }
});

ArtistRouter.get('/:id', async (req, res) => {
    const id = +req.params.id;
    try {
        let payload = await ArtistService.getArtistsById(id);
        return res.status(200).json(payload);
    } catch (e) {
        return res.status(e.statusCode).json(e);
    }
});

ArtistRouter.post('', async (req, res) => {
    console.log('POST REQUEST RECIEVED AT /artists');
    console.log(req.body);

    try {
        let newArtist = await ArtistService.addNewArtist(req.body);
        return res.status(200).json(newArtist);
    } catch (e) {
        return res.status(e.statusCode).json(e);
    }  
});

ArtistRouter.put('', async (req, res) => {
    console.log('PUT REQUEST RECEIVED AT /artists');
    console.log(req.body);
    try {
        let updatedArtist = await ArtistService.updateArtistById(req.body);
        res.status(200).json(updatedArtist);
    } catch (e) {
        res.status(e.statusCode).json(e);
    }
});

ArtistRouter.delete('', async (req, res) => {
    console.log('DELETE REQUEST RECEIVED AT /artists');
    console.log(req.body);

    try {
        let deletedArtirst = await ArtistService.deleteArtistById(req.body);
        res.status(200).json(deletedArtirst);
    } catch (e) {
        res.status(e.statusCode).json(e);
    }  
});

