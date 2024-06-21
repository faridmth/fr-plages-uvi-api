import fs from 'fs/promises';
import { data } from './functions.js';

// Schedule the cron job to run every minute
export const updateDt = async()=>{
        try {
            let dt = await data()
            dt = JSON.stringify(dt, null, 2);
            await fs.writeFile('data.json', dt);
        } catch (err) {
            console.error('Error writing file:', err);
        }
} 
