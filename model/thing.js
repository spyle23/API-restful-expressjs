const mongoose = require('mongoose');

//construction d'un schema de donnée avec mongoose
const thingSchema = mongoose.Schema({
    title:{type: String, required:true},                //on informe les champs à recevoir(par le schéma qu'on a créer)
    description:{type: String, required:true},
    imageUrl:{type:String, required:true},
    userId:{type: String, required:true},
    price:{type: Number, required:true}
});

module.exports = mongoose.model('thing', thingSchema);