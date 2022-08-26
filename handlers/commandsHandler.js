const { CENTER } = require('ascii-table')
const asciiTable = require('ascii-table')
const { Routes, Client } = require('discord.js')
const { REST } = require('@discordjs/rest')
const { readdirSync } = require('fs')
const colors = require('colors')

/**
 * 
 * @param {Client} client 
 */
const loadCommands = async (client) => {
    const table = new asciiTable()
        .setTitle('Loaded Commands')
        .setHeading('Command', 'Stauts')
        .setAlign(1, CENTER)

    const commandsArray = []

    const categoryes = readdirSync('./commands')
    for (const category of categoryes) {
        const commandsFiles = readdirSync(`./commands/${category}`).filter(files => files.endsWith('.js'))

        for (const commandFile of commandsFiles) {
            const command = require(`../commands/${category}/${commandFile}`)

            table.addRow(command.data.name, '🟢')

            await client.commands.set(command.data.name, command)

            commandsArray.push(command.data.toJSON())
        }
    }

    console.log(table.toString())

    const { TOKEN, GUILDS, CLIENT_ID } = process.env

    const rest = new REST({ version: '10' }).setToken(TOKEN)

    for (const GUILD of GUILDS.split(',')) {
        await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD), { body: commandsArray }).then(console.log(`${colors.yellow('Commands >')} Successfuly reloaded guilds (/) commands `))
    }
}

module.exports = { loadCommands }