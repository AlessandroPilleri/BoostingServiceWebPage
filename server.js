/**
 * Setup and imports
 */
const fs = require('fs');
const express = require('express');
const app = express();
app.use(express.static(__dirname + '/public'));
app.use(express.json());

require('dotenv').config();

const { Client, Intents } = require('discord.js');
const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
//const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;
const port = process.env.PORT || 8080

const Checkout = require('./checkout.js');
var check = new Checkout();

/**
 * Server callbacks
 */
app.post('/checkout', (req, res) => {
    console.log(req.body);
    res.sendStatus(200);
    bot.channels.cache.get('906565943650570260').send(check.parseMessage(req.body));
})
app.post('/message', (req, res) => {
    console.log(req.body);
    res.sendStatus(200);
    bot.channels.cache.get('913099957123297322').send(check.parseMessage(req.body));
})

/**
 * Bot callbacks
 */
bot.on('ready', () => {
    console.info('Logged in as ' + bot.user.tag);

})

/**
 * Bot and webpage start
 */
bot.login(TOKEN);
app.listen(port, () => {
    console.log('Webapp running.');
})