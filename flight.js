//mongoose permet de créer des collections facilement directement depuis nodejs, pour cela on importe le package mongoose
const mongoose = require('mongoose'); 



//Un model est considéré comme une collection mongodb (collection events avec plusieur event)
//on creer dans une constante notre schema
const flight = mongoose.Schema({
    departure_municipalityName:{
        type : String
    },
    departure_scheduledTimeLocal:{
        type : Date
    },
    arrival_municipalityName:{
        type : String
    },
    arrival_scheduledTimeLocal:{
        type : Date
    },
    number:{
        type: String
    },
    name:{
        type: String
    }
});

module.exports = mongoose.model('flight', flight, 'Flights');
//nous l’exportons afin que nous puissions l’utiliser dans app.js.