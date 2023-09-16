import express from "express"

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required:true
    }
})

const User = mongose.model('user',UserSchema)
export default User