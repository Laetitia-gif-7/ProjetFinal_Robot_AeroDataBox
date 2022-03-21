const express = require('express')
const https = require('https')
const app = express()
const request = require('request')
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose')
const cron = require('node-cron')
const urlocal='mongodb://localhost:27017'
const url= process.env.URL_MONGO || urlocal;
var MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');

async function getDataByFlightNumberAndDate(){



const options = {
  method: 'GET',
  url: 'https://aerodatabox.p.rapidapi.com/flights/number/to3478/',
  headers: {
    'x-rapidapi-host': 'aerodatabox.p.rapidapi.com',
    'x-rapidapi-key': '23b9099b79msh277c86c75b82b22p1e0baajsn08a4c566898e',
    useQueryString: true
  }
};

request(options, function (error, response, body) {
	if (error) throw new Error(error);

	console.log(body);

    let List = JSON.parse(body)['results'];
    MongoClient.connect(url + '/AeroDataBoxProject4', function (err, db) {
        if (err) throw err;
        else {
            const dbo = db.db("AeroDataBoxProject4");
            console.log("Connexion à MongoDB établie");

            {

                dbo.collection("Flight").insertOne({
                    "departure" : {
                        "airport" : {
                            "icao" : String,
                            "municipalityName" : String, 
                        "scheduledTimeLocal" : Date
                        }
                    },
                    "arrival" : {
                        "airport" : {
                            "icao" : String, 
                            "municipalytyName" : String, 
                            "scheduledTimeLocal": Date

                        } 
                    },
                    "number" : String,
                    "airline" : {
                        "name" : String
                    }

                });
            }

            
        }
        console.log(body);
    });
})
}

app.listen(PORT, () => {
    console.log('Server connected')
})

getDataByFlightNumberAndDate(); 


