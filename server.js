/**
 * Skal till ett REST-API med Nodejs och Express
 * Av Mattias Dahlgren, mattias.dahlgren@miun.se
 * Vidareutvecklat med router och databaskopplingar
 * Torbjörn Lundberg */
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
// const dotenv = require('dotenv');

const app = express();
const port = 3000;

// Använd JSON-data i anropen
app.use(express.json());

// Aktivera CORS middleware för alla rutter
app.use(cors());

//Connect to mongoDB
mongoose.connect("mongodb://localhost:27017/books").then(() => {
    console.log('MongoDB connected successfully');
}).catch((err) => {
    console.error('MongoDB connection error:', err);
}) 

//Schema för en bok 
const bookSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: [true , "Du måste skriva bokens titel"] 
    },    
    author: { 
        type: [String], 
        required: [true, "Du måste skriva bokens författare"] 
    },
    rating: { 
        type: Number, 
        min: 1, 
        max: 5,  
        required: [true, "Du måste ge boken ett betyg"] 
    },
    review: {
        type: String, 
        required: [true , "Du måste skriva en recension"]  
    }

});

const Review = mongoose.model('review', bookSchema); 

/** ------ Rutter (Routes) ------ */

// GET /api
app.get('/api', (req, res) => {
    res.json({ message: 'Välkommen' });
});

app.get('/reviews', async (req, res) => {
    try {
        let results = await Review.find({});
        return res.status(200).json(results);
    } catch (error) {
        return res.status(500).json({ message: "Error fetching reviews", error });
    }    
});

app.post('/reviews', async (req, res) => {
    try {  
        let result = await Review.create(req.body);
        return res.status(201).json(result);
    } catch (error) {
        return res.status(400).json({ message: "Der gick inte att skapa bokrecensionen", error });
    }
});        

app.delete('/reviews/:id', async (req, res) => {
    try {
        let result = await Review.findByIdAndDelete(req.params.id);
        if (!result) {
            return res.status(404).json({ message: "Posten hittades inte" });
        }
        return res.status(200).json({ message: "Posten radarades" });
    } catch (error) {
        return res.status(500).json({ message: "Det gick inte att ta bort recensionen", error });
    }
}); 

app.put('/reviews/:id', async (req, res) => {
    try {
        let result = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!result) {
            return res.status(404).json({ message: "Bokrecensionen du sökte hittades inte" });
        }           
        return res.status(200).json(result);
    } catch (error) {
        return res.status(400).json({ message: "Det gick inte att uppdatera posten", error });
    }
});

app.all('*', (req, res) => {
    res.status(404).json({ message: 'Routen hittades inte' });
});


// Starta servern
app.listen(port, () => {
    console.log('Server is running on port: ' + port);
});