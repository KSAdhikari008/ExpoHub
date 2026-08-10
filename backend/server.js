import app from './src/app.js';
import { connectDB } from './src/db/db.js';
import dotenv from 'dotenv/config';

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 5000, ()=>{
        console.log("Server is live at port: ",process.env.PORT || 5000);
    })
})
.catch(err => {
    console.log("Server connection error: ",err);
})