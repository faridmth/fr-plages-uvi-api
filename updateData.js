import cron from 'node-cron';
import fs from 'fs/promises';
import { data } from './functions.js';

// Schedule the cron job to run every minute
export const updateCron = ()=>{
    cron.schedule('0 6 * * *', async () => {
        try {
            let dt = await data()
            dt = JSON.stringify(dt, null, 2); // `null, 2` adds indentation for readability
    
            await fs.writeFile('data.json', dt);
            console.log('Replaced!');
        } catch (err) {
            console.error('Error writing file:', err);
        }
    });
} 
