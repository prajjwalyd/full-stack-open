import express from 'express';
const app = express()

import { bmiCalculator } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator'

app.use(express.json());
// eslint-disable-next-line @typescript-eslint/no-explicit-any

app.get('/hello',(_req, res) =>  {
    res.send('Hello Full Stack!');
})

app.get('/bmi', (req, res) => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);

    if (isNaN(weight) || isNaN(height)) {
        res.send({ error: 'malformatted parameters' }).status(400)
    }

    const bmi = bmiCalculator(height, weight);

    const bmiData = {
        weight, 
        height, 
        bmi
    }
    res.send(bmiData).status(200);
})

app.post('/exercises', (req, res) => {
   
    const body = req.body;

    const dailyExercises: number[] = body.daily_exercises;

    const target: number = body.target;

    if(!target || !dailyExercises){
        res.status(400).send({ error: 'Parameters missing' })
    }

    if(isNaN(target) || dailyExercises.some(isNaN)){
        res.status(400).send({ error: 'Malformatted parameters' })
    }

    try{
        const result = calculateExercises(target, dailyExercises);

        res.send({result}).status(200);
    }catch(error){
        if(error instanceof Error){
           res.status(400).send({ error: error.message })
        }

        res.status(400).send({ error: 'Something went wrong' });
    }
        
})

const PORT = 3003

app.listen(PORT, ()=> {
    console.log(`Server running on port ${PORT}`)
})