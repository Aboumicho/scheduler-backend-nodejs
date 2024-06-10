import express from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import bodyParser from 'body-parser';
import userRouter from "./routes/user";
import businessRouter from "./routes/business";
import serviceRouter from "./routes/service";
import appointmentRouter from "./routes/appointment";
import availabilityRouter from "./routes/availability";

const app = express();

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mydatabase');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Routes
app.use('/user', userRouter);
app.use('/business', businessRouter);
app.use('/service', serviceRouter);
app.use('/appointment', appointmentRouter);
app.use('/availability', availabilityRouter);
export default app;