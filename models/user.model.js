const mongoose = require('mongoose')

const UserSchema = mongoose.Schema(
    {
        name: {
            type:String,
        },
        email:{
            type:String,
            required:true,
            unique: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
        },
        password: {
            type:String,
            required:true
        }
    }
)

const User = mongoose.model("User", UserSchema)
module.exports = User