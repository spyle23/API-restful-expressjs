
const express =  require('express');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');      //on importe le middleware ici pour modifier les routes concernées

const stuffCtrl = require('../controller/stuff');

const router = express.Router();


router.post('/', auth, multer ,stuffCtrl.newThing);
router.get('/:id',auth ,stuffCtrl.getOneThing);
router.put('/:id', auth, multer,stuffCtrl.modifyThing);
router.delete('/:id',auth ,stuffCtrl.deleteThing)
router.get('/',auth ,stuffCtrl.getAllThing);



module.exports = router;