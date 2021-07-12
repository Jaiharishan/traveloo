const moongoose = require('mongoose');

const userSchema = new moongoose.Schema({
    
    username: {
        type: 'string',
        required: true
    },

    email: {
        type: 'string',
        required: true
    },

    country: {
        type: 'string',
        required: true
    },

    age: {
        type: 'string',
        required: true
    },

    gender: {
        type: 'string',
        required: true
    },

    password: {
        type: 'string',
        required: true
    },

    date: {
        type: Date,
        default: Date.now
      }

})


const User = moongoose.model('User', userSchema);

module.exports = User;

// console.log(User.find({});

