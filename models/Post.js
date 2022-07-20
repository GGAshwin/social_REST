const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    userId:{
        type:String,
        requireed:true,
    },
    desc:{
        type:String,
        max:500
    },
    img:{
        type:String
    },
    like:{
        type:Array,
        default:[]
    },
},
    { timestamps: true }
)

module.exports = mongoose.model("Post", PostSchema)