import mongoose from 'mongoose';
import { env } from '../env.js';
async function initMongoConnection() {
  try {

    const user = env('MONGODB_USER');
    const pwd = env('MONGODB_PASSWORD');
    const url = env('MONGODB_URL');
    const db = env('MONGODB_DB');
    await mongoose.connect(
      `mongodb+srv://${user}:${pwd}@${url}/${db}?retryWrites=true&w=majority`,
    );
    
    console.log('MongoDB connection established');
  } catch (error) {
    console.error(error);
  }
}

export { initMongoConnection };
