const mongoose = require('mongoose'); 

const arrival = mongoose.Schema({
    municipalityName:{
        type: String
    },
    scheduledTimeLocal:{
        type:String
    },
});

module.exports = mongoose.model('arrival', arrival, 'Arrivals');