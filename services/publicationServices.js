const Publication = require("../models/Publication.js");
const { getUserByUsername } = require("./userServices.js");

async function createPost(post){

    const result = new Publication(post);
async function createPost(post, username){

    await result.save();
    const createdPost = new Publication(post);

    return result;
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




module.exports = {
    createPost,
    getAllPost
    getAllPost,
    getOneById,
    getOneAndUpdate,
};