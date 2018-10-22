const elastic = require('../../config/elasticsearch');
const apiInstances = require('../../config/api');

module.exports.getUserDetailsFromApi = async (playerName) => {

    try {

        return await apiInstances.pubg.get('/pc-na/players?filter[playerNames]=' + playerName);

    } catch (e) {

        console.log(e);
        return false;

    }


}

module.exports.updateUserDetailsOnDatabase = async (player) => {

    let updated = await elastic.update({
            index: 'pubg',
            type: '_doc',
            id: player._id,
            body: {
                doc: player._source
            }
        }
    );

}

module.exports.listUsersThatNeedsUpdate = async () => {

    let elasticUser = await elastic.search({
        index: 'pubg',
        type: '_doc',
        body: {
            query: {
                exists : { field : "integrations.pubg.playerName" }
            }
        }
    });

    return data = elasticUser.hits.hits;

}