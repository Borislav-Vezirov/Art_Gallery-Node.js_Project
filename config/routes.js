const router = require('express').Router();
const homeController = require('../controllers/homeController.js');
const authController = require('../controllers/authController.js');
const publicationController = require('../controllers/publicationController.js');


router.use(homeController);
router.use(authController);
router.use(publicationController);

router.use('*', (req, res) => {
    
    res.render('404');
});


module.exports = router;