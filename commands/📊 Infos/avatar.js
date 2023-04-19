const {  EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const  Guild  = require('../../schemas/guild.js');

module.exports = {
    data : new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Аватарка пользователя')
        .addUserOption(options =>
            options.setName('target')
                .setDescription('Пользоваватель')
                .setRequired(false)),
    async execute(interaction) {
        let data = await Guild.findOne({ guildID: interaction.guild.id });
        const target = interaction.options.getMember("target");

        if (!target) { 
            const Embed = new EmbedBuilder()
                .setColor(data.embedColor)
                .setTitle('🗿 | Твой аватар')
                .setImage(interaction.user.displayAvatarURL({dynamic: true, size: 1024}))
            await interaction.reply({embeds: [Embed]})
        } else {
            const Embed = new EmbedBuilder()
                .setColor(data.embedColor)
                .setTitle(`👤 | Аватар пользователя ${target.user.username}`)
                .setImage(target.displayAvatarURL({dynamic: true, size: 1024}))
            await interaction.reply({embeds: [Embed]})
        }
    }
}