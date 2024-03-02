import app from './app';

//enveroment global
import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

//capture errors
process.on('uncaughtException', err =>{
    console.log(err.name, err.message);
    console.log("UNCAUGHT EXCEPTION :( shutting down...");
    console.log(err.name, err.message);
});

//connect server
const port = process.env.PORT || '5000';
app.listen(port, ()=>{
    console.log(`server connect success in port:${port}`);
    console.log(`mode: ${process.env.NODE_ENV}`);
});

//capture errors
process.on('unhandledRejection', (err: any) =>{
    console.log('UNHANDLE REJECTION :( shutting down...');
    console.log(err.name, err.message);
});