const dotenv = require('dotenv').config();
const { Client, GatewayIntentBits, Collection, } = require('discord.js')
const discordMdals = require('discord-modals')

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessageReactions
    ]
})

discordMdals(client)

client.commands = new Collection()

const { loadEvents } = require('./handlers/eventsHandler.js')
const { loadCommands } = require('./handlers/commandsHandler.js');
const dbConn = require('./db/connection.js');

client.login(process.env.TOKEN).then(() => {
    loadEvents(client)
    loadCommands(client)
    dbConn()
}).catch(err => console.log(err))

