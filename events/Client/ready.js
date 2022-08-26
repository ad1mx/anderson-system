const { Client } = require("discord.js")
const colors = require('colors')

module.exports = {
    name: 'ready',
    once: true,
    /**
     * 
     * @param {Client} client 
     */
    run(client) {
        console.log(`${colors.blue('Client >')} Loginin as: ${(client.user.username)}`)
    }
}