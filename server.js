const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/spatiu");

const ObiectSchema = new mongoose.Schema({

    nume: String,
    descriere: String,
    imagine: String,
    categorie: String,
    galaxie: String

});

const Obiect = mongoose.model("Obiect", ObiectSchema);


// GET toate obiectele după categorie
app.get("/obiecte/:categorie", async (req, res) => {

    const data = await Obiect.find({
        categorie: req.params.categorie
    });

    res.json(data);
});


// POST adăugare obiect nou
app.post("/obiecte", async (req, res) => {

    const nou = new Obiect(req.body);

    await nou.save();

    res.json(nou);
});

app.listen(3000, () => {
    console.log("Server pornit pe http://localhost:3000");
});