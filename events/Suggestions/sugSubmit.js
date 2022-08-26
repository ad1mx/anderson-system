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
                    name: modal.member.displayName,
                    iconURL: modal.member.displayAvatarURL()
                })
                .setTitle('<:sug:1012553940560252959>・' + sugTitleUpper)
                .setDescription(sugDesUpper)
                .setFooter({
                    text: modal.guild.name,
                    iconURL: modal.guild.iconURL()
                })
                .setTimestamp()
                .setColor(0xff1111)

            await modal.guild.channels.cache.get(process.env.sugsChannelId).send({
                embeds: [sugEmbed]
            })
                .then(msg => {
                    msg.react('<:664250091762221091:997007876881137764>');
                    msg.react('<:664250092005359656:997007883529097366>');
                })

            await modal.reply({
                content: 'تم رفع اقتراحك بنجاح , انتضر الموافقة عليه.',
                ephemeral: true
            })
        }
    }
}
