
const mongoose = require('mongoose');

const mongooseValidator = require('mongoose-unique-validator');         //utilisation de mongoose-unique-validator

const userSchema = mongoose.Schema({
    email:{type: String, required: true, unique: true},                 //on indique que ce champ est unique
    password:{type: String, required: true}
});

userSchema.plugin(mongooseValidator);               //on utilise la méthode plugin de mongoose-unique-validator pour empécher de créer plusieurs compte avec un seul adresse mail

module.exports = mongoose.model('User', userSchema);