const { isUser } = require('../middlewares/guards.js');
const { createPost } = require('../services/publicationServices.js');
const mapErrors = require('../utils/mappers.js');

const router = require('express').Router();


router.get('/create', isUser(), (req, res) => {

    res.render('create', { title: 'Create Page' });
});


router.post('/create', isUser(), async (req, res) => {
    
    const userId = req.session.user._id;
    
    const post = {
        title : req.body.title,
        paintingTechnique : req.body.paintingTechnique,
        image : req.body.image,
        certificate : req.body.certificate,
        author: userId
    };

    try {
        
        await createPost(post);

        res.redirect('/gallery');

    } catch (error) {
        
        const errors = mapErrors(error);
        res.render('create', { title: 'Create Page', errors , data: post});

    }
});


module.exports = router; 
