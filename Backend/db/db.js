import moongoose from 'mongoose';
import dotenv from 'dotenv';


dotenv.config({ path: './.env' });

const db = async () => {
    try {
        await moongoose.connect(process.env.MONGO_URI);
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Database connection failed:', error);
        process.exit(1); // Exit the process with failure
    }
    
}

export default db;