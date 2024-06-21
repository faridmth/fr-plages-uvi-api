import fs from 'fs/promises';
import express from 'express';
import { updateDt } from './updateData.js';
import cors from 'cors';
import { formatDate } from './functions.js';

const app = express();
const port = 3000;
app.use(cors());

// Middleware to explicitly deny cross-origin requests
app.get('/fr-plages-uvi', async (req, res) => {
    try {
        let data = JSON.parse(await fs.readFile('./data.json', 'utf8'));
        let date = new Date()
        let unxiDate = Math.floor(date.getTime() / 1000);
        let firstkey = Object.keys(data)[0]
        if(formatDate(unxiDate)!==firstkey){
            await updateDt()
            data = JSON.parse(await fs.readFile('./data.json', 'utf8'));
            console.log("data is updated :)")
        }
        res.json(data);
    
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
