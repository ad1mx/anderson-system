const { SlashCommandBuilder } = require('@discordjs/builders')
const { CommandInteraction, Client, Message } = require('discord.js');
const { Modal, TextInputComponent, showModal } = require('discord-modals');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('sug')
        .setDescription('اقتراح بخصوص السيرفر او البوت')
    ,
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     * @param {Message} message
     */
    async run(interaction, client, message) {
        const modal = new Modal()
            .setCustomId('sug-modal')
            .setTitle('Suggestions')
            .setComponents([
                new TextInputComponent()
                    .setCustomId('sug-title')
                    .setLabel('Suggestion Title')
                    .setRequired(true)
                    .setStyle('SHORT')
                    .setPlaceholder('Enter your suggestion title'),
                new TextInputComponent()
                    .setCustomId('sug-description')
                    .setLabel('Suggestion Description')
                    .setRequired(true)
                    .setStyle('LONG')
                    .setPlaceholder('Enter your suggestion description'),

            ])

        if (interaction.channelId === '1012548382725771295') {
            await showModal(modal, { client: client, interaction: interaction });
        } else {
            return await interaction.reply({
                content: `لتقديم اقتراحك يجب ان تكتب هذا الامر ب <#${process.env.sugsChannelId}>`,
            })
        }

    }
}