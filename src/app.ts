// import packages
import express from 'express';
import cors from 'cors';
import routes from './routes';

// initialize the express app
const app = express();


// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes


app.use('/', routes)

app.use('/home', async function(req, res){
    res.status(200).json({
        status: 'success',
        message: 'welcome to commerce tools server app'
    })
})

export default app



