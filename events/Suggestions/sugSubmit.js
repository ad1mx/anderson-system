const { EmbedBuilder } = require('@discordjs/builders');
const { ModalSubmitInteraction } = require('discord-modals');

module.exports = {
    name: 'modalSubmit',
    /**
     * 
     * @param {ModalSubmitInteraction} modal 
    */
    async run(modal) {
        if (modal.customId === 'sug-modal') {

            const sugTitle = modal.getTextInputValue('sug-title')
            const sugTitleUpper = sugTitle.replace(sugTitle[0], sugTitle[0].toUpperCase())

            const sugDes = modal.getTextInputValue('sug-description')
            const sugDesUpper = sugDes.replace(sugDes[0], sugDes[0].toUpperCase())


            const sugEmbed = new EmbedBuilder()
                .setAuthor({
                    name: modal.guild.name,
                    iconURL: modal.guild.iconURL()
                })
                .setTitle('<:sug2:1013859955692011551>・Suggestion')
                .setFields([
                    {
                        name: 'Title',
                        value: sugTitleUpper
                    },
                    {
                        name: 'Description',
                        value: sugDesUpper
                    }
                ])
                .setFooter({
                    text: `By: ${modal.member.displayName}`,
                    iconURL: modal.member.displayAvatarURL()
                })
                .setTimestamp()
                .setColor(0x00ceff)

            await modal.guild.channels.cache.get(process.env.sugsChannelId).send({
                embeds: [sugEmbed]
            })
                .then(msg => {
                    msg.react('<a:980424049714946048:997969027475456020>');
                    msg.react('<a:980424085202935808:997970964732182558>');
                })

            await modal.reply({
                content: 'تم رفع اقتراحك بنجاح , انتضر الموافقة عليه.',
                ephemeral: true
            })
        }
    }
}
