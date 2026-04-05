const { Schema, model } = require("mongoose");


const commentSchema = new Schema({
    user:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    connection:{
        type:String,
        required:true
    }
})

commentSchema.statics.publish = async(data) =>{
    const newComment = new Comment({
        user:data.user,
        content:data.content,
        connection: data.connection
    })
    await newComment.save();
    return;
}


const Comment = model("Comments", commentSchema);

module.exports = Comment;