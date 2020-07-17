import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const adminSchema = new Schema({
    username:{
        type:String,
        required:[true,"Name is required"],
        unique:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
});

const adminModel = mongoose.model('admin',adminSchema);

module.exports = adminModel;