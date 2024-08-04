import { initMongoConnection } from './db/initMongoConnection.js';
import { setupServer } from './server.js';

const app = async () => {
  try {
    await initMongoConnection();
    setupServer();
  } catch (error) {
    console.error(error);
  }
};

app();
