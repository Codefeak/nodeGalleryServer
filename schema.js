const mongoose = require('mongoose');

const schema = {
    username: {
        type: String,
    },
    password: {
        type: String,
    }
};

const schema1 = {
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    title: {
        type: String,
    },
    nationality: {
        type: String,
    },
    src: {
        type: String,
    },
    alt: {
        type: String,
    },
    skills: {
        type: Array,
    },
    whySofterDeveloper: {
        type: String,
    },
    longTermVision: {
        type: String,
    },
    motivatesMe: {
        type: String,
    },
    favoriteQuote: {
        type: String,
    },
    joinedOn: {
        type: String,
    }
}

const User = mongoose.model('User', schema);
const Informations = mongoose.model('Informations', schema1);

exports.User = User;
exports.Informations = Informations;