
import express from 'express';
import * as data from './data.json' assert { type: "json" };
import { updateCron } from './updateData.js';
import cors from 'cors';

const app = express();
const port = 3000;
app.use(cors());
updateCron()
// Middleware to explicitly deny cross-origin requests
app.get('/fr-plages-uvi', async (req, res) => {
    try {
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
