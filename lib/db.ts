import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI as string;

if (!MONGO_URI) {
  // console.error('Please define the MONGO_URI environment variable inside .env.local');
  throw new Error('Please define the MONGO_URI environment variable');
}

// Type casting globalThis to an object that can hold mongoose
let cached = (globalThis as any).mongoose;

if (!cached) {
  // console.log('catched ni hua')
  cached = (globalThis as any).mongoose = { conn: null, promise: null };
}

// async function connectDB() {
//   if (cached.conn) {
//     console.log('MONGODB CONNECTED')
//     return cached.conn;
//   }

//   if (!cached.promise) {
//     cached.promise = mongoose.connect(MONGO_URI).then((mongoose) => {
//       return mongoose;
//     });
//   }
//   cached.conn = await cached.promise;
//   return cached.conn;
// }

async function connectDB() {
  console.log('Connecting to database...')
  if (cached.conn) {
    console.log('Database Connected!');
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI).then(
      (mongoose) => {
        // console.log('Mongoose connected successfully');
        return mongoose;
      },
      (err) => {
        console.error('Mongoose connection failed:', err); // Log connection errors
        throw err; // Rethrow the error so it can be handled
      }
    );
  }
  cached.conn = await cached.promise;
  return cached.conn;
}


export default connectDB;
