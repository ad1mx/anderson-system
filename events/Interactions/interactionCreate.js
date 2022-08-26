const { CommandInteraction, Client } = require("discord.js")

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
                content: 'This command is not avaible!',
                ephemeral: true
            });

            if (command.dev) {
                const developers = process.env.DEVELOPERS_IDS.split(',')
                const isDeveloper = developers.includes(interaction.user.id)
                if (!isDeveloper) {
                    return await interaction.reply({
                        content: 'اسف, فقط مبرمجي من يستطيع استخدام هذا الامر.',
                        ephemeral: true
                    })
                }
            }

            try {
                await command.run(interaction, client)
            } catch (err) {
                console.log(err)
                return await interaction.reply({
                    content: 'There was an error while runing this command!',
                    ephemeral: true
                })
            }
        }
    }
}