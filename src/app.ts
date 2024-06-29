import express from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import bodyParser from 'body-parser';
import userRouter from "./routes/user/user";
import customerUserRouter from "./routes/user/customerUser";
import businessRouter from "./routes/business";
import serviceRouter from "./routes/service";
import appointmentRouter from "./routes/appointment";
import availabilityRouter from "./routes/availability";
require("dotenv").config();

const app = express();

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
try{

    mongoose.connect(process.env.MONGO_DB_URL);
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => {
        console.log('Connected to MongoDB');
    });
}catch(error){
    console.log("Error connecting to MongoDB: ", error.message)
}

// Routes
app.use('/user', userRouter);
app.use('/business', businessRouter);
app.use('/service', serviceRouter);
app.use('/appointment', appointmentRouter);
app.use('/availability', availabilityRouter);
app.use('/customerUser', customerUserRouter);
export default app;