import dotenv from 'dotenv';
import express from 'express';

import { ArtistRouter } from './routers/artist-router';
import { SongRouter } from './routers/song-router';
import { PlaylistRouter } from './routers/playlist-router';
import {Pool} from 'pg';

// environment configuration
dotenv.config();

// database configuration
export const connectionPool: Pool = new Pool({
    host: process.env['DB_HOST'],
    port: +process.env['DB_PORT'],
    database: process.env['DB_NAME'],
    user: process.env['DB_USERNAME'],
    password: process.env['DB_PASSWORD'],
    max: 5
});

// Web server configuration 
const app = express();
app.use('/', express.json());
app.use('/artists', ArtistRouter);
app.use('/songs', SongRouter);
app.use('/playlists', PlaylistRouter);

app.listen(8080, () => {
    console.log('Project0 running and listening at http://localhost:8080');  
})