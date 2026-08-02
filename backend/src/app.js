import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import boothRouter from './routes/booth.routes.js';
import eventRouter from './routes/event.routes.js';
import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js'


const app = express();

// Middleware configurations.
app.use(express.urlencoded({extended: true, limit: "20kb"}));
app.use(express.static("public")); // public folder available in request. 
app.use(express.json({limit: "20kb"}));
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true    
}));
app.use(cookieParser());


// API's
app.use('/api/user', userRouter); //(no post, user is created only with auth)
app.use('/api/booth', boothRouter);
app.use('/api/event', eventRouter);
app.use('/api/auth', authRouter);

export default app;