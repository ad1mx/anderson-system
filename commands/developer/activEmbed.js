const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("@discordjs/builders");
const { ChatInputCommandInteraction, ButtonStyle, } = require("discord.js");

module.exports = {
    dev: true,
    data: new SlashCommandBuilder()
        .setName('activation')
        .setDescription('Create activation embed')
        .addSubcommand(sub => sub
            .setName('embed')
            .setDescription('Create activation embed')
        ),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    async run(interaction) {
        const activEmbed = new EmbedBuilder()
            .setAuthor({
                name: interaction.guild.name,
                iconURL: interaction.guild.iconURL()
            })
            .setTitle('◈・Family Apply')
            .setDescription("**◈** | **مرحباَ بك في __عائلة اندرسون__\r\nمن هُنا يمكنك __التقديم__ للعائلة وتفعيل حسابك داخل السيرفر\r\n، من خلال الضغط علي الزر اسفل هذه الرسالة**\r\n--------------------------------------------\r\n**◈** |  **Welcome to __Anderson Family__\r\nFrom here, you can join the family and Activate your account in the server,\r\nby clicking on the button below this message ,**\r\n\r\n• **__A__nderson  __H__igh__S__taff**")
            .setImage('https://cdn.discordapp.com/attachments/998397742038654997/1012591582458941511/activ.png?size=4096')
            .setFooter({
                text: interaction.guild.name,
                iconURL: interaction.guild.iconURL()
            })
            .setTimestamp()
            .setColor(0xff1e1e)

        const activBtn = new ActionRowBuilder()
            .setComponents(
                new ButtonBuilder()
                    .setCustomId('activ-btn')
                    .setLabel('Activation')
                    .setStyle(ButtonStyle.Primary)
                    .setEmoji({ id: '996941474782515221', name: '796079226531872798' })
            )

        await interaction.channel.send({
            embeds: [activEmbed],
            components: [activBtn]
        })
            .finally(() => interaction.reply({
                content: 'Done',
                ephemeral: true
            }))

        const collector = interaction.channel.createMessageComponentCollector()

        collector.on('collect', async i => {
            await i.reply('you clicked a btn')
        })

    }
}