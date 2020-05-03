import url from 'url';
import express from 'express';

export const ArtistRouter = express.Router();


ArtistRouter.get('', async (req, res) => {
    try {
        let reqURL = url.parse(req.url, true);
        
    }catch (e) {

    }
});