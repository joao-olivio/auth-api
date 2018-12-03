const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

// Define our model
const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: true
    },
    password: {
        type:String,
        required: true
    },
});

// On save Hook, encrypt password
userSchema.pre('save', function (next) {
    const user = this;
    // Creates the salt
    bcrypt.genSalt(10, function (err, salt) {
        if(err) return next(err);
        // Hash the password using the salt
        bcrypt.hash(user.password, salt, null, function(err, hash) {
            if(err) return next(err);
            // Overwrite the current password with the encryted one
            user.password = hash;
            next();
        })
    })
})
// Create the model class
const exportModel = mongoose.model('user', userSchema);

// Export the model
module.exports = exportModel;