import dotenv from "dotenv";
import db from './db/db.js';
import { app } from './app.js';


dotenv.config({
    path: './.env',
});

db()
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });  
    })
    .catch((err) => {
        console.error('Failed to start the server:', err);
        process.exit(1);
    });