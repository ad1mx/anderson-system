const { readdirSync } = require('fs')
const asciiTable = require('ascii-table')
const { CENTER } = require('ascii-table');
const { Client } = require('discord.js');

/**
 * 
 * @param {Client} client 
 */
const loadEvents = (client) => {

    const table = new asciiTable()
        .setTitle('Loaded Events')
        .setHeading('Event', 'Status')
        .setAlign(1, CENTER);

    const eventsFolder = readdirSync('./events')
    for (const eventsFolders of eventsFolder) {
        const eventsFiles = readdirSync(`./events/${eventsFolders}`).filter(file => file.endsWith('.js'))
        for (const eventFile of eventsFiles) {
            const event = require(`../events/${eventsFolders}/${eventFile}`)
            table.addRow(event.name, '🟢')

            if (event.rest) {
                event.once ? client.rest.once(event.name, (...args) => event.run(...args, client)) : client.rest.on(event.name, (...args) => event.run(...args, client))
            }
            else {
                event.once ? client.once(event.name, (...args) => event.run(...args, client)) : client.on(event.name, (...args) => event.run(...args, client))
            }


        }
    }
    console.log(table.toString())
}

module.exports = { loadEvents }
