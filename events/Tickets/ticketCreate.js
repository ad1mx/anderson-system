const { ButtonInteraction } = require("discord.js");

module.exports = {
    name: 'interactionCreate',
    /**
     * 
     * @param {ButtonInteraction} interaction 
     */
    async run(interaction, client) {
        if (interaction.customId === 'activ-btn') {
            await interaction.deferReply({ ephemeral: true })
            await interaction.followUp({ content: 'hyy', fetchReply: true })
        }
    }
}