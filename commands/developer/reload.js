const { SlashCommandBuilder } = require("@discordjs/builders");
const { ChatInputCommandInteraction } = require("discord.js");
const { loadCommands } = require('../../handlers/commandsHandler.js')

module.exports = {
    dev: true,
    data: new SlashCommandBuilder()
        .setName('reload')
        .setDescription('Reload client (/) commands')
        .addSubcommand(sub => sub
            .setName('commands')
            .setDescription('Reload client (/) commands')
        ),

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    async run(interaction, client) {

        loadCommands(client)

        return await interaction.reply({
            content: '```yaml\nClient (/) Commands reloaded successfuly\n```',
            ephemeral: true
        })
    }
}