import url from 'url';
import express from 'express';
import AppConfig from '../config/app';
import { isEmptyObject } from '../util/validator';


export const ArtistRouter = express.Router();

const artistService = AppConfig.artistService;

ArtistRouter.get('', async (req, res) => {
    try {
        let payload = await artistService.getAllArtists();
        res.status(200).json(payload);        
    }catch (e) {
        res.status(e.statusCode).json(e);
    }
});