
const Thing = require('../model/thing');
const fs = require('fs');

exports.newThing = (req, res, next) => {
    const thingObject = JSON.parse(req.body.thing);         //on parse le string en json 
    delete thingObject._id;
    const thing = new Thing({
      ...thingObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`    //on indique de manière dynamique où le fichier sera importé 
    });
    thing.save()
        .then(() => res.status(201).json({message:'Objet enregistré'}))
        .catch((error) => res.status(400).json({error}));
};

exports.getOneThing = (req, res, next) => {
    Thing.findOne({_id : req.params.id})
          .then(thing => res.status(200).json(thing))
          .catch(error => res.status(404).json({error}));
};

exports.modifyThing = (req, res, next) => {
    const thingObject = req.file?{
        ...JSON.parse(req.body.thing),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    }:{...req.body};
    Thing.updateOne({_id:req.params.id}, {...thingObject, _id:req.params.id})
          .then(() => res.status(200).json({message: 'objet modifié'}))
          .catch(error => res.status(400).json({error}));
}

exports.deleteThing = (req, res, next) =>{
    Thing.findOne({_id:req.params.id})
        .then((thing) => {
            // if (!thing) {
            //     res.status(404).json({error: new Error('objet non trouvé')});
            // }
            // if(thing.userId !== req.userId){
            //     res.status(400).json({error: new Error('Unauthorised request')});
            // }
            console.log(thing.imageUrl);
            const filename = thing.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, ()=>{
                Thing.deleteOne({_id:req.params.id})
                .then(()=> res.status(200).json({message:'objet supprimé!'}))
                .catch(error => res.status(400).json({error}));
            })
        } )
}


exports.getAllThing = (req, res, next) => {             //midleware qui permet de créer une route get pour récuperer les infos
    Thing.find()
        .then(things => res.status(200).json(things))
        .catch(error => res.status(400).json({error}))
}

