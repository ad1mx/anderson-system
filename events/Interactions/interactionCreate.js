const { EmbedBuilder } = require("@discordjs/builders");
const { CommandInteraction, Client } = require("discord.js");
const ErrorEmbed = require("../../components/Embeds/ErrorEmbed");

module.exports = {
    name: 'interactionCreate',
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client
     */
    async run(interaction, client) {

        if (interaction.isChatInputCommand() || interaction.isContextMenuCommand() || interaction.isButton()) {

            const command = await client.commands.get(interaction.commandName)

            if (!command) return await interaction.reply({
                embeds: [new ErrorEmbed('هذا الامر لم يعد متوفرا بعد!')],
                ephemeral: true
            });
            if (command.dev) {
                const developers = process.env.DEVELOPERS_IDS.split(',')
                const isDeveloper = developers.includes(interaction.user.id)
                if (!isDeveloper) {
                    return await interaction.reply({
                        embeds: [new ErrorEmbed('اسف, فقط مبرمجي من يستطيع استخدام هذا الامر.')],
                        ephemeral: true
                    })
                }
            }

            try {
                await command.run(interaction, client)
            } catch (err) {
                console.log(err)
                return await interaction.reply({
                    embeds: [new ErrorEmbed('There was an error while runing this command!')],
                    ephemeral: true
                })
            }
        }
    }
}