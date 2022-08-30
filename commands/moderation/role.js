const { SlashCommandBuilder, EmbedBuilder } = require("@discordjs/builders");
const { PermissionFlagsBits, ChatInputCommandInteraction, CommandInteraction } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('role')
        .setDescription('Add a role for a user')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
        .addUserOption(option => option
            .setName('user')
            .setDescription('add a user to give them a role')
        )
        .addRoleOption(option => option
            .setName('role')
            .setDescription('the role to give for this user')
        )

    ,
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async run(interaction) {
        const userId = interaction.options.getUser('user').id
        const roleId = interaction.options.getRole('role').id

        interaction.guild.members.cache.get(userId).roles.add(roleId)

        const embed = new EmbedBuilder()
            .setColor()

        interaction.reply({ content: 'Done', ephemeral: 'true' })
    }
}