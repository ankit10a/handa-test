import express from 'express';
import http from 'http';
import { PORT,client } from './config/key';
import { mongoConnect } from './config/mongo';
import cors from 'cors';


const app = express();
const server = http.createServer(app);
mongoConnect();


app.use(express.json());
// app.use(express.cookiePareser());
app.use(
    cors({
      origin: [client, 'http://localhost:3000'],
      credentials: true
    })
  );

const userRouter = require('./routes/user')();
// const adminRouter = require('./routes/admin')();


app.use('/user',userRouter);
// app.use('/admin',adminRouter);


server.listen(PORT,()=>{
    console.log(`server is running at ${PORT}`);
})