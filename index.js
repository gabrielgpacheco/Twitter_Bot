var twit = require("twit");

require("dotenv").config();

const Bot = new twit({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
    timeout_ms: 60 * 1000,
});

console.log('Este bot está rodando...');

function BotInit() {
    let query = {
        q: "#javascript",
        result_type: "recent"
    }

    Bot.get('search/tweets', query, BotGotLatestTweet);

    function BotGotLatestTweet(error, data, response) {
        if (error) {
            console.log('Bot não achou os últimos Tweets:', + error);
        } else {
            let id = {
                id: data.statuses[0].id_str
            }


            Bot.post('statuses/retweet/:id', id, BotRetweeted);

            function BotRetweeted(error, response) {
                if (error) {
                    console.log('Bot não pode retuitar, :' + error);
                } else {
                    console.log('Bot retweetou, :' + id.id);
                }
            }
        }

    }
}

setInterval(BotInit, 30 * 60 * 1000);

BotInit();