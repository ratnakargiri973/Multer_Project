import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import router from './Route/userRoutes.js';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs'; 
import { fileURLToPath } from 'url';

dotenv.config();

// Get __dirname in ES Module context
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;
const hostname = "127.0.0.1";
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017";
const DB = process.env.DB;

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir); // Create the uploads directory if it doesn't exist
}

// Serve uploaded files statically
app.use('/uploads', express.static(uploadsDir));

// Use the upload route
app.use('/api', router);

mongoose
  .connect(MONGO_URI, { dbName: DB })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });
