const express = require('express');
const helmet = require('helmet');
const rp = require('request-promise-native');
const bodyParser = require('body-parser');
const cors = require('cors');
const Twitter = require('twitter');
const Spotify = require('node-spotify-api');
const { Client } = require('pg');

const twitterClient = new Twitter({
    consumer_key: 'Fde9j0IWCCFZ3ug1reOTVeK5Y',
    consumer_secret: 'MLCqqos1I2y6hpDwXSsstRsdSI573xmVHxXSikcPltL6f8PotR',
    access_token_key: '1248300974122373120-mvh1REba3cQrMn9YmBpCqRlLYX0vab',
    access_token_secret: 'hpPAaq9CoB9prMGqDma14TBdgy93Tx03ChSyDEGb1dB9I'
})

twitterClient.post('/webhooks.json?url=https://iam-boredme.herokuapp.com/new-tweet').then((data) => {
    console.log(data)
    console.log(data.id)
});

const spotifyClient = new Spotify({
    id: '7b169740043b4f6f8cc394283f1968c3',
    secret: '99d2499887054e85be6ca4e16f9948b8'
})

// process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

const dbClient = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
})

dbClient.connect();

const app = express();

app.use(helmet());
app.options('*', cors());
app.use(cors())

// route is declare here because of its specific use of bodyParser
app.post('/new-tweet', bodyParser.json({verify: (req, res, buf) => {req.rawBody = buf}}),  async (req, res) => {
    // verify twitter provenance
    const hash = crypto.createHmac('sha256', 'MLCqqos1I2y6hpDwXSsstRsdSI573xmVHxXSikcPltL6f8PotR').update(req.rawBody).digest('base64')
    if (req.headers['x-twitter-webhooks-signature'] !== 'sha256=' + hash) {
        console.log('wrong checksum')
        return res.status(401).send();
    }
    // parse its data
    const tweet = req.body.tweet_create_events[0].text;
    const tweetId = req.body.tweet_create_events[0].id_str;
    const user = req.body.tweet_create_events[0].user;
    const userId = user.screen_name;
    // check data integrity
    const spotifyURIindex = tweet.search(/https:\/\/open\.spotify\.com\/track\/[a-bA-B0-9]{22}/g);

    const text = tweet.substring(0, spotifyURIindex);

    if (spotifyURIindex === - 1) {
        // answer to user his tweet is uncorrect
        twitterClient.post('statuses/update', {
            status: 'Tu t\'es trompé dans ta saisie !',
            in_reply_to_status_id: tweetId
        })
        return res.status(200).send();
    }
    if (text.length > 60) {
        // answer to user his tweet is uncorrect
        twitterClient.post('statuses/update', {
            status: 'Ton texte est trop long !',
            in_reply_to_status_id: tweetId
        })
        return res.status(200).send();
    }

    // answer to user
    twitterClient.post('statuses/update', {
        status: 'Ton titre a été publié ! Viens le voir sur iam-bored.me/' + userId,
        in_reply_to_status_id: tweetId
    })

    // get neccessary spotify data
    const spotifyTrackId = tweet.substring(spotifyURIindex + 31, spotifyURIindex + 53)
    const data = await spotifyClient.request(`https://api.spotify.com/v1/tracks/${spotifyTrackId}`).catch(err => console.log('spotify error', err))

    // store in database
    await dbClient.query(
        'INSERT INTO user_infos(twitter_name, spotify_title, spotify_link, spotify_image, spotify_preview, text) VALUES ($1, $2, $3, $4, $5, $6)',
        [
            userId,
            data.name,
            data.external_urls.spotify,
            data.album.images[0],
            data.preview_url,
            text
        ]
    );
})

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('wesh');
})

// ROUTE ONLY HERE TO REGISTER TWITTER WEBHOOKS
app.get('/new-tweet', async(req, res) => {
        // twitter authentication
        hmac = crypto.createHmac('sha256', 'MLCqqos1I2y6hpDwXSsstRsdSI573xmVHxXSikcPltL6f8PotR').update(req.query.crc_token).digest('base64')

        res.json({
            response_token: 'sha256' + hmac
        });
})

app.post('/user/:id', async (req, res) => {
    // fetch data from database
    // return data
})

app.listen(process.env.PORT, () => {
    console.log('app listening on port' + process.env.PORT)
})
