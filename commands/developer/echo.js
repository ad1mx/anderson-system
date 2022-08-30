const { SlashCommandBuilder } = require("@discordjs/builders");
const { ChatInputCommandInteraction } = require("discord.js");

module.exports = {
    dev: true,
    data: new SlashCommandBuilder()
        .setName('echo')
        .setDescription('Send a message by me')
        .addStringOption(option => option
            .setName('message')
            .setDescription('The message to sent')
            .setRequired(true)
        ),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    async run(interaction) {
        interaction.channel.send(interaction.options.getString('message'))
        interaction.reply({
            content: 'Done',
            ephemeral: true
        })
    }
}