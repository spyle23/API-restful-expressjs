
const User = require('../model/user');
const bcrypt = require('bcrypt');
const token = require('jsonwebtoken');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)          //utilisation de bcrypt pour créer un hash du mot de passe
        .then(hash => {
            const newUser = new User({          
                email: req.body.email,
                password: hash
            });
            newUser.save()
                .then(()=> res.status(201).json({message:'user crée!'}))
                .catch(error => res.status(400).json({error}));
        })
        .catch(error => res.status(500).json({error}));
};

exports.login = (req, res, next) => {
    User.findOne({email: req.body.email})                   //on cherche l'utilisateur avec le bon email
        .then(user => {
            if (!user) {                                    //si jamais on ne le trouve pas
                return res.status(401).json({message: 'user non trouvé'});
            }
            bcrypt.compare(req.body.password, user.password)            //si on le trouve, on compare le mot de passe qu'il a entré avec celui stocké dans la base(oui avec le hash)
                .then(valid => {                    // on récupère la promise et on vérifie si les mot de passes correspondent 
                    if (!valid) {
                        return res.status(401).json({message: 'mot de passe incorrect'});
                    }
                    res.status(201).json({                  //si l'utilisateur s'est bien connécté, on lui renvoi un token pour qu'il puisse naviger sur le site
                        userId: user._id,
                        token: token.sign(                  //on utilise une méthode de jsonwebtoken
                            {userId: user._id},             //bien verifier le id
                            'RANDOM_TOKEN_SECRET',          //une chaine de charactère pour le token
                            {expiresIn: '24h'}              //la duré de vie du token
                        )
                    });
                })
                .catch(error => res.status(500).json({error}));
        })
        .catch(error => res.status(500).json({error}));

};