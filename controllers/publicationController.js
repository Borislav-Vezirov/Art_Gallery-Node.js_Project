const { isUser } = require('../middlewares/guards.js');
const { createPost, getOneById, getOneAndUpdate, deletePost, share } = require('../services/publicationServices.js');
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
        
        await createPost(post, req.session.user.username);

        res.redirect('/gallery');

    } catch (error) {
        
        const errors = mapErrors(error);
        res.render('create', { title: 'Create Page', errors , data: post});

    }
});

router.get('/edit/:id', isUser(), async (req, res) => {
    
    const id = req.params.id;

    const post = await getOneById(id);

    if(req.session.user._id != post.author._id){

        return res.redirect('/login');
    };
 

    res.render('edit', { title: 'Edit Page', post })
});

router.post('/edit/:id', isUser(), async (req, res) => {
    
    const id = req.params.id;

    const existing = await getOneById(id);

    if(req.session.user._id != existing.author._id){

        return res.redirect('/login');
    };

    try {
        const post = await getOneAndUpdate(id, req.body);
        res.redirect('/details/' + id);
        
    } catch (error) {
        const errors = mapErrors(error);
        res.render('edit', { title: 'Edit Page', errors});
        
    }
});

router.get('/delete/:id', isUser(), async (req, res) => {

    const id = req.params.id;

    const existing = await getOneById(id);

    if(req.session.user._id != existing.author._id){

        return res.redirect('/login');
    };
   
    try {
        
        await deletePost(id);

        res.redirect('/gallery');

    } catch (error) {
        const errors = mapErrors(error);
        res.render('details', { errors });
    }
});

router.get('/share/:id', isUser(), async (req, res) => {
    
    const id    = req.params.id;

    try {
        
        await share(id, req.session.user._id);

        res.redirect('/details/' + id);

    } catch (error) {

        const errors = mapErrors(error);
        res.render('details', { errors });

    };
});



module.exports = router; 
