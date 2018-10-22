const repoUser = require('../repositories/user');
const configApp = require('../../config/app');
const regions = ["pc-na", "pc-sa"];

updateSingleUserDetails = async (player) => {

    try {

        regions.forEach(async function(region, index){

            let response = await repoUser.getUserDetailsFromApi(player.integrations.pubg.playerName, region);

            const data = response.data.data[0];

            player.integrations.pubg.shardId = data.attributes.shardId;
            player.integrations.pubg.accountId = data.id;
            player.integrations.pubg.createdAt = data.attributes.createdAt;
            player.integrations.pubg.updatedAt = data.attributes.updatedAt;
            player.integrations.pubg.version = data.attributes.patchVersion;

            let regionIndex = player.integrations.pubg.regions.findIndex(k => k.shardId === region);

            let regionObject = {
                shardId: data.attributes.shardId,
                totalKills: 0,
                totalWins: 0,
                lastMatch: (data.relationships.matches.data[0]) ? data.relationships.matches.data[0].id : null
            };

            (regionIndex > -1) ?
                player.integrations.pubg.regions[regionIndex] = regionObject :
                player.integrations.pubg.regions.push(regionObject);


            await repoUser.updateUserDetailsOnDatabase(player);
        });

        return true;

    } catch (error) {

        console.log(error);

        return false;
    }
}


updateMultipleUserDetails = async (players) => {

    try {

        let playerNames = [];
        players.forEach(function(element, index){
            playerNames.push(element.integrations.pubg.playerName);
        });

        regions.forEach(async function(region, index){

            const response = await repoUser.getMultipleUserDetailsFromApi(playerNames, region);

            const data = response.data.data;

            data.forEach(async function(data, index) {

                let player = players.find(k => k.integrations.pubg.playerName === data.attributes.name);

                player.integrations.pubg.shardId = data.attributes.shardId;
                player.integrations.pubg.accountId = data.id;
                player.integrations.pubg.createdAt = data.attributes.createdAt;
                player.integrations.pubg.updatedAt = data.attributes.updatedAt;
                player.integrations.pubg.version = data.attributes.patchVersion;

                let regionIndex = player.integrations.pubg.regions.findIndex(k => k.shardId === region);

                let regionObject = {
                    shardId: data.attributes.shardId,
                    totalKills: 0,
                    totalWins: 0,
                    lastMatch: (data.relationships.matches.data[0]) ? data.relationships.matches.data[0].id : null
                };

                (regionIndex > -1) ?
                    player.integrations.pubg.regions[regionIndex] = regionObject :
                    player.integrations.pubg.regions.push(regionObject);

                await repoUser.updateUserDetailsOnDatabase(player);

            });

        });

        return true;

    } catch (error) {

        console.log(error);

        return false;
    }
}

module.exports = updateSingleUserDetails;

module.exports.updateAllUserDetails = async () => {

    try {

        let listAllPlayers = await repoUser.getUsersThatNeedsUpdate();
        let listPlayersToUpdate = [];

        if (listAllPlayers) {

            listAllPlayers.forEach(function(player, index) {

                listPlayersToUpdate.push(player);
                if (listPlayersToUpdate.length % configApp.pubg.maxPlayersToCallAPI === 0){
                    updateMultipleUserDetails(listPlayersToUpdate);
                    listPlayersToUpdate = [];
                }
            });
            updateMultipleUserDetails(listPlayersToUpdate);

        }

        return listAllPlayers;

    } catch (e) {

        console.log(e.toString());

    }

}