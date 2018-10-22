const mongoose = require('../../config/mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    email: String,
    password: String,
    status: String,
    integrations: {
        pubg: {
            playerName: String,
            accountId: String,
            createdAt: String,
            updatedAt: String,
            version: String,
            regions: [
                {
                    shardId: String,
                    lastMatch: String,
                    totalKills: Number,
                    totalWins: Number,
                    lastMatch: String
                }
            ]
        }
    }
}, { collection: 'users' });

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;