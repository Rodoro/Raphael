const { ContextMenuCommandBuilder, ApplicationCommandType, EmbedBuilder } = require("discord.js");
const  Guild  = require('../../schemas/guild.js');

module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName('Avatar')
        .setType(ApplicationCommandType.User),
    async execute(interaction) {
        let data = await Guild.findOne({ guildID: interaction.guild.id });

        const Embed = new EmbedBuilder()
                .setColor(data.embedColor)
                .setTitle(`👤 | Аватар пользователя ${interaction.targetUser.username}`)
                .setImage(interaction.targetUser.displayAvatarURL({dynamic: true, size: 1024}))
        await interaction.reply({embeds: [Embed], ephemeral: true})
    }
}