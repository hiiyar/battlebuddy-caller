const repoUser = require('../repositories/user');

updateSingleUserDetails = async (player) => {

    try {

        let response = await repoUser.getUserDetailsFromApi(player._source.integrations.pubg.playerName);

        const data = response.data.data[0];

        player._source.integrations.pubg.accountid = data.id;
        player._source.integrations.pubg.region = data.attributes.shardId;
        player._source.integrations.pubg.createdAt = data.attributes.createdAt;
        player._source.integrations.pubg.updatedAt = data.attributes.updatedAt;
        player._source.integrations.pubg.version = data.attributes.patchVersion;

        return await repoUser.updateUserDetailsOnDatabase(player);

    } catch (error) {

        console.log(error);

        return false;
    }

}

module.exports = updateSingleUserDetails;

module.exports.updateAllUserDetails = async () => {

    try {

        let listPlayers = await repoUser.listUsersThatNeedsUpdate();

        if (listPlayers) {
            listPlayers.forEach(function (player, index, array) {
                updateSingleUserDetails(player);
            });
        }

        console.log('Updated all users');

    } catch (e) {

        console.log(e.toString());

    }

}