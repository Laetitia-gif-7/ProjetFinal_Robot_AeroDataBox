const mongoose = require('mongoose'); 

//Un model est considéré comme une collection mongodb (collection events avec plusieur event)
//on creer dans une constante notre schema
const departure = mongoose.Schema({
    municipalityName:{
        type: String
    },
    scheduledTimeLocal:{
        type:String
    },
});

module.exports = mongoose.model('departure', departure, 'Departures');