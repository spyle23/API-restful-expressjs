
const express = require('express');                 //importation d'expres pour créer une application express

const mongoose = require('mongoose');               //importation de mongoose pour la connection et la gestion d'erreur avec mongoDB

const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');

const path = require('path');         //pour la gestion des requetes sur les fichiers statiques

//connection à la base de donnée
mongoose.connect('mongodb+srv://jean:jean@cluster0.d3pjr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();


//CORS (cross Origin Resource Sharing: erreur de connection à l'api ) on devra utiliser le middleware suivant pour permettre l'accès à l'api
//Ajout d'un Header de requête
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');          //pour le contrôle d'accès : tout le monde peut y accédé
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');    //les headers correspondants
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');        //les types de requêtes qui peuvent être effectuées 
    next();
  });

  app.use(express.json());        //pour intercepter les données envoyées par le client et le mettre sous format json
  
  app.use('/api/stuff', stuffRoutes);
  app.use('/api/auth', userRoutes);
  app.use('/images', express.static(path.join(__dirname, 'images')));     //on construit le middleware qui s'occupe de la requète lié au fichier
 
module.exports = app;