const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const engines = require('consolidate');
const MongoClient = require('mongodb').MongoClient;

app.use(bodyParser.urlencoded({ extended: true }));
app.engine('html', engines.ejs);
app.set('view engine', 'ejs');
app.use(express.static('public'));




MongoClient.connect('mongodb://localhost:27017', (err, client) => {
    console.log('Successfully connected to MongoDB.');
    const db = client.db('apteka');
    var osobwypoz;

    db.collection('klienci').countDocuments((err, doc) => {
        osobwypoz = doc;
    });

    app.get('/', (req, res) => {

        db.collection('klienci').countDocuments((err, doc) => {
            osobwypoz = doc;

            res.render('home', {
                osobwypoz
            });
        });
    })

    app.get('/addpatient', (req, res) => {
        var datacala = new Date();
        var numercol = 0;
        var data = `${datacala.toLocaleDateString()} o godz. ${datacala.toLocaleTimeString()}`;
        res.render('addpatient', {
            osobwypoz,
            data,
            numercol
        })
    })


    app.get('/patientedit', (req, res) => {

        db.collection('klienci').find({}).toArray((err, doc) => {
            // console.log(doc);
            var numercol = 1;
            res.render('patientedit', {
                osobwypoz,
                doc,
                numercol
            })
            // console.log(doc);
        })
    })


    app.post('/patientedit', (req, res) => {
        var os = req.body.name;
        console.log(os);
        res.redirect(`/patientedit/${os}`);
    })


    app.get('/patientedit/:osoba', (req, res) => {
        var osoba = req.params.osoba;
        console.log(osoba);

        db.collection('klienci').find({ name: osoba }).toArray((err, doc) => {

            console.log(doc);
            var numercol = 1;

            res.render('patientelement', {
                osobwypoz,
                doc,
                numercol,
                osoba
            })
        })
    })





    app.get('/listalekow', (req, res) => {

        db.collection('klienci').find({}).project({ "lekipoz": 1, _id: 0 }).toArray((err, doc) => {

            console.log(doc);
            var numercol = 1;

            res.render('listalekow', {
                osobwypoz,
                doc,
                numercol
            })
        })
    })


    app.get('/listadluz', (req, res) => {

        db.collection('klienci').find({}).toArray((err, doc) => {

            console.log(doc);
            var numercol = 1;

            res.render('listadluz', {
                osobwypoz,
                doc,
                numercol
            })
        })
    })


    app.post('/addosoba', (req, res) => {
        var ko = req.body;

        console.log(ko);

        var name = req.body.name;
        var nazwaleku = req.body.lekipoz;
        // var ilosc = req.body.lekipoz;
        // var wydajacy = req.body.lekipoz[0].wydajacy;
        // var datawydania = req.body.lekipoz[0].datawydania;
        // var uwagi = req.body.lekipoz[0].uwagi;
        console.log(nazwaleku);
        


        db.collection('klienci')
            .updateOne({ name: name },
                { $push: { lekipoz: { $each: nazwaleku } } }, { upsert: true });
        res.redirect('/');
    })
    


}); //end of mongoclient



app.listen(process.env.PORT || 3000, () => {
    console.log('Server is runing..');
})

