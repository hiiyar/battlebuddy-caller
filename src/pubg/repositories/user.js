const apiInstances = require('../../config/api');

const userModel = require('../models/user');

module.exports.getUserDetailsFromApi = async (playerName, region) => {

    try {

        return await apiInstances.pubg.get('/'+ region +'/players?filter[playerNames]=' + playerName);

    } catch (e) {

        console.log(e);
        return false;

    }
}

module.exports.getMultipleUserDetailsFromApi = async (playerNames, region) => {

    try {

        return await apiInstances.pubg.get('/'+ region +'/players?filter[playerNames]=' + playerNames.join(','));

    } catch (e) {

        console.log(e);
        return false;

    }
}

module.exports.updateUserDetailsOnDatabase = async (player) => {

    const updated = await userModel.findByIdAndUpdate(player.id, player);

    console.log(updated);

    return updated;

}

module.exports.getUsersThatNeedsUpdate = async () => {

    const listUsers = userModel.find({
        "integrations.pubg.playerName": { $exists: true, $ne: null }
    });

    return listUsers;

}