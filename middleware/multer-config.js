const multer = require('multer');       //on a besoin de multer pour l'importation de fichier
//on construit un dictionnaire pour la gestion des extensions des fichiers envoyés sur le serveur
const MINE_STYPES = {
    'image/jpg' : 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};
//on créer un objet de configuration pour multer (cela permet de définir la destination ainsi que le nom du fichier finale lorsque celui ci sera sur le serveur)
const storage = multer.diskStorage({
    destination: (req, file, calback) => {
        calback(null, 'images');
    },
    filename: (req, file, calback) =>{
        const name = file.originalname.split(' ').join('_');
        const extension = MINE_STYPES[file.mimetype];  //on récupère l'extension du fichier et on le traduit suivant le dictionnaire construit
        calback(null, name+Date.now()+'.'+extension);     // on modifie enfin le nom du fichier final (c'est le nom du fichier qui sera utilisé sur le serveur)
    }
});

module.exports = multer({storage:storage}).single('image');         //exportation de multer avec la constante storage configurée et indiquation des fichiers images uniquement