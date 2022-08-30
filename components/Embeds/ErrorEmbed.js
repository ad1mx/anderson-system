const { EmbedBuilder } = require("@discordjs/builders")

module.exports = class ErrorEmbed {
    constructor(message) {
        return new EmbedBuilder()
            .setTitle('Error :')
            .setDescription(`> ${message}`)
            .setColor(0xff2d2d)
    }
}