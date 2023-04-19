const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const config = require('../../json/config.json');
const  Guild  = require('../../schemas/guild.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('coin')
        .setDescription('Подкинуть монету')
        .addStringOption(option =>
            option.setName('side')
                .setDescription('Орёл или решка?')
                .addChoices(
                    { name: 'Орёл', value: 'eagle' },
                    { name: 'Решка', value: 'tails' },
                )),
    async execute(interaction) {

        let data = await Guild.findOne({ guildID: interaction.guild.id });

        const Embed1 = new EmbedBuilder()
            .setColor(data.embedColor)
            .setTitle('Монетка летит...')
        await interaction.reply({ embeds: [Embed1] });

        var Embed2;
        var result;
        if (Math.random() < 0.5) { result = 'орёл' } else { result = 'решка' }

        if (interaction.options.getString('side')) {

            if (interaction.user.id == config.developerID) {
                if (interaction.options.getString('side') == 'eagle') {
                    Embed2 = new EmbedBuilder()
                        .setColor('008000')
                        .setTitle(`📀 | Победа!`)
                        .setDescription(`**Ставка:** Орёл \nМонета упала орлом вверх.`)
                } else {
                    Embed2 = new EmbedBuilder()
                        .setColor('008000')
                        .setTitle(`📀 | Победа!`)
                        .setDescription(`**Ставка:** Решка \nМонета упала решкой вверх.`)
                }
            } else if (interaction.options.getString('side') == 'eagle') {
                if (result == 'орёл') {
                    Embed2 = new EmbedBuilder()
                        .setColor('008000')
                        .setTitle(`📀 | Победа!`)
                        .setDescription(`**Ставка:** Орёл \nМонета упала орлом вверх.`)
                } else {
                    Embed2 = new EmbedBuilder()
                        .setColor('B22222')
                        .setTitle(`📀 | Поражение`)
                        .setDescription('**Ставка:** Орёл \nМонета упала решкой вверх.')
                }
            } else {
                if (result == 'решка') {
                    Embed2 = new EmbedBuilder()
                        .setColor('008000')
                        .setTitle(`📀 | Победа!`)
                        .setDescription(`**Ставка:** Решка \nМонета упала решкой вверх.`)
                } else {
                    Embed2 = new EmbedBuilder()
                        .setColor('B22222')
                        .setTitle(`📀 | Поражение`)
                        .setDescription('**Ставка:** Решка \nМонета упала орлом вверх.')
                }
            }

        } else {
            Embed2 = new EmbedBuilder()
                .setColor(data.embedColor)
                .setTitle(`📀 | ${result.charAt(0).toUpperCase() + result.slice(1)}`)
        }

        setTimeout(() => { interaction.editReply({ embeds: [Embed2] }) }, 1000);
    }
}