const express = require('express')
const https = require('https')
const app = express()
const request = require('request')
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose')
const cron = require('node-cron')
const cors = require('cors');
const urlocal='mongodb://localhost:27017'
const url= process.env.URL_MONGO || urlocal;
var MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const Flight = require("./flight");


const options = {
    method: 'GET',
    url: 'https://aerodatabox.p.rapidapi.com/flights/number/to3478/',
    headers: {
      'x-rapidapi-host': 'aerodatabox.p.rapidapi.com',
      'x-rapidapi-key': '23b9099b79msh277c86c75b82b22p1e0baajsn08a4c566898e',
      useQueryString: true
    }
  };

//let options = {json: true};
app.use(bodyParser.json());
app.use(cors({origin: '*'}))
app.get('/', (req, res) => { 
    res.send('Robot is running')
});
app.listen(process.env.PORT);

//connection à MongoDB
mongoose.connect("mongodb+srv://laetitia:laetitia@aerodataboxproject4.ezdkr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
 {   //pour recuperer le 1er paramètre, aller sur mongodb, cliquer sur connect > connect your application
     useNewUrlParser: true, useUnifiedTopology:true
    }).then(()=>{
        console.log("connexion success !");//si ça fonctionne on affiche cela dans la console
    }).catch((error) =>{
        console.log(error); //sinon on affiche l'erreur
    });


    async function getDataByFlightNumberAndDate(){
    
        request(options, function (error, response, body) {
            console.log("je suis dans le request");
            //console.log(JSON.parse(body));
            const bodyResponse = JSON.parse(body);
            console.log(bodyResponse[0].departure.airport.municipalityName);
            console.log(bodyResponse[0].departure.scheduledTimeLocal);
            console.log(bodyResponse[0].arrival.airport.municipalityName);
            console.log(bodyResponse[0].arrival.scheduledTimeLocal);
            console.log(bodyResponse[0].number);
            console.log(bodyResponse[0].airline.name);


            

            const vol = new Flight({
                departure_municipalityName: bodyResponse[0].departure.airport.municipalityName,
                departure_scheduledTimeLocal: new Date (bodyResponse[0].departure.scheduledTimeLocal),
                arrival_municipalityName: bodyResponse[0].arrival.airport.municipalityName,
                arrival_scheduledTimeLocal: new Date (bodyResponse[0].arrival.scheduledTimeLocal),
                number : bodyResponse[0].number,
                name : bodyResponse[0].airline.name
            })
            vol.save();

           

        });
           
    }



           
getDataByFlightNumberAndDate();    
        