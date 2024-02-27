
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    number: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        default: 'sample.jpg', // You might want to handle image uploads differently
    },
    otp: {
        code: {
            type: String,
        },
    },
     
    
},
{
    timestamps: { currentTime: ()=> Date.now() },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
