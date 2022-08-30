const { Message, Client } = require("discord.js");

module.exports = {
    name: 'messageCreate',
    /**
     * 
     * @param {Message} message 
     * @param {Client} client
     */
    async run(message, client) {
        if (message.channelId === process.env.sugsChannelId && message.author.id !== client.user.id) {
            await message.delete()
        }
    }
}