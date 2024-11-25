import express from 'express';
import crudRoute from './crudRoute';
import connectDB from './config/db';


const app = express();

connectDB();


app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/',(req,res) => {
    res.json({msg : "hello express js"});
});

app.use('/crud',crudRoute);

app.listen(process.env.PORT, () => {
    console.log(`prot is running on ${process.env.PORT}`);
});

export default app;

