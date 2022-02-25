const Publication = require("../models/Publication.js");
const { getUserByUsername } = require("./userServices.js");


async function createPost(post, username){

    const createdPost = new Publication(post);

    const user = await getUserByUsername(username);

    user.publications.push(createdPost._id);

    await user.save();

    await createdPost.save();

    return createdPost;
};

async function getAllPost(){

    return await Publication.find({}).lean();
};

async function getOneById(id){

    return await Publication.findById(id).populate('author', 'username').lean();
};

async function getOneAndUpdate(id, post){

    return await Publication.findByIdAndUpdate(id, post);

};

async function deletePost(id){

    return await Publication.findOneAndDelete({_id: id});
};

async function share(postId, userId){

    const post = await Publication.findById(postId);
    
    if(post !== undefined && post.shared.includes(userId)){
        throw new Error('You already share!')
    };

    post.shared.push(userId);

    await post.save();
};


async function getPostsByAuthor(userId){

    return Publication.find({author: userId}).lean();
};

async function getSharedPosts(userId){

    return Publication.find({shared: userId}).lean();
};


module.exports = {
    createPost,
    getAllPost,
    getOneById,
    getOneAndUpdate,
    deletePost,
    share,
    getPostsByAuthor,
    getSharedPosts
};