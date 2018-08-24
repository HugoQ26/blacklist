const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const engines = require('consolidate');
const MongoClient = require('mongodb').MongoClient;

app.use(bodyParser.urlencoded({extended: true}));
app.engine('html', engines.ejs);
app.set('view engine', 'ejs');
app.use(express.static('public'));


MongoClient.connect('mongodb://localhost:27017', (err, client)=>{
    console.log('Successfully connected to MongoDB.');
    const db = client.db('apteka');
    var osobwypoz;

    db.collection('klienci').countDocuments((err, doc)=>{
        osobwypoz = doc;         
    });

app.get('/', (req, res)=>{
    
    db.collection('klienci').countDocuments((err, doc)=>{
        osobwypoz = doc;         
    
        res.render('home',{
            osobwypoz
        });
    
    });


})

app.get('/addpatient', (req,res)=>{
    var datacala = new Date();
    var data = `${datacala.toLocaleDateString()} o godz. ${datacala.toLocaleTimeString()}`;
    res.render('addpatient', {
        osobwypoz,
        data: data
    })
})

app.get('/listalekow', (req,res)=>{    
    
    db.collection('klienci').find({}).project({lekipoz: 1, _id: 0}).toArray((err, doc)=>{
        console.log(doc[0].lekipoz[0].nazwaleku);        
        console.log(doc[0]);
        var numercol = 1;        
        
        res.render('listalekow', {
            osobwypoz,
            doc,
            numercol        
        })
    
    })
    
})

app.post('/addosoba', (req, res)=>{
    console.log(req.body);
    var name = req.body.name;
    var lekipoz = req.body.lekipoz;
    var ilosc = req.body.ilosc;
    var datawyp = new Date();
    var wydajacy = req.body.wydajacy;
    var uwagi = req.body.uwagi;
    var ko = req.body;

    db.collection('klienci').update({name: name},{$push: {lekipoz: {$each: lekipoz}}},{upsert: true});

    res.redirect('/');    
})



}); //end of mongoclient



app.listen(process.env.PORT || 3000, ()=>{
    console.log('Server is runing..');
})

