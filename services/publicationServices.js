const Publication = require("../models/Publication.js");

async function createPost(post){

    const result = new Publication(post);

    await result.save();

    return result;
};

async function getAllPost(){

    return await Publication.find({}).lean();
};





module.exports = {
    createPost,
    getAllPost
};