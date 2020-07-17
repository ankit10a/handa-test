import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema= new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    dob:{
        type:Date
    },
    profilePic:{
        type:String
    },
    createdAt:{
        type:Date,
        default: Date.now()
    }
})

const userModel = mongoose.model('user',userSchema);

export default userModel;
