import express from 'express'
import dotenv from 'dotenv'
import connectDB from './Config/dbconnection.js';
import authRoutes from './router/authRoutes.js'
import cors from 'cors'
import assetRoutes from './router/assetRoutes.js'
 import assignRoutes from './router/assignRoutes.js'
dotenv.config();
connectDB();
 
const app = express();
 
app.use(cors());
app.use(express.json());
 
app.use('/api/auth', authRoutes);
app.use('/api/assets',assetRoutes)
app.use('/api/assignment',assignRoutes) ;

const PORT = process.env.PORT || 5000;
 
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});