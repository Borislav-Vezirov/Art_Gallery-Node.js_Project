const { isUser } = require('../middlewares/guards.js');
const { getAllPost, getOneById, getPostsByAuthor, getSharedPosts } = require('../services/publicationServices.js');

const router = require('express').Router();

router.get('/', async (req, res) => {

    const posts = await getAllPost();

    posts.forEach(x => {
        
        x.numberOfShared = x.shared.length
    });

    res.render('home', { title: 'Home Page' , posts});
});

router.get('/gallery', async (req, res) => {

    const posts = await getAllPost();

    res.render('gallery', { title: 'Catalog Page' , posts});
});


router.get('/details/:id', async (req, res) => {

    const id = req.params.id;

    const post = await getOneById(id);

    if(req.session.user){

        post.hasUser = true;

        if(req.session.user._id == post.author._id){

            post.isAuthor = true;
        }else{

            post.isShared = post.shared.find(x => x._id == req.session.user._id) != undefined;

        };
    };

    res.render('details', { title: 'Details Page', post });
});


router.get('/profile', isUser(), async (req, res) => {
    
    const user = req.session.user;

    const posts = (await getPostsByAuthor(user._id)).map(x => x.title).join(', ');

    const sharedPostTitles = (await getSharedPosts(user._id)).map(x => x.title).join(', ');

    res.render('profile', { title: 'Profile Page' , posts, user, sharedPostTitles});
});



module.exports = router;