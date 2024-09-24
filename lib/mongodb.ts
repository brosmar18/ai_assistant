import mongoose, { ConnectOptions } from 'mongoose';

const uri = process.env.MONGODB_URI!;
const options: ConnectOptions = {
  serverSelectionTimeoutMS: 5000, 
  serverApi: {
    version: '1',
    strict: true,
    deprecationErrors: true,
  },
};

let isConnected: boolean = false;

export async function connectToDatabase() {
  if (isConnected) {
    console.log('=> Using existing database connection');
    return;
  }

  try {
    // Connect to MongoDB
    await mongoose.connect(uri, options);
    isConnected = true;
    console.log('=> Successfully connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}
