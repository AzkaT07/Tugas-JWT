import express from 'express'
const app = express();
const port = 3000;
import userRoute from '../src/routes/userRoute.js';
import authRoute from '../src/routes/authRoute.js';
import dotenv from 'dotenv';
dotenv.config();

app.use(express.json());

app.use('/auth', authRoute);
app.use('/users', userRoute);
app.get('/', (req,res) => {
    res.send('Hello World');
})

app.listen(port, () => {
    console.log(`Example app listening at ${port}`);
})