const { EmbedBuilder, SlashCommandBuilder, PermissionFlagsBits, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const Guild = require('../../schemas/guild.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Удаляет сообщения')
        .addIntegerOption(options =>
            options.setName('amount')
                .setDescription('Количество сообщений которых нужно удалить')
                .setRequired(true))
        .addUserOption(options =>
            options.setName('target')
                .setDescription('Сообщение каво нужно удалить?')
                .setRequired(false))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
    async execute(interaction, client) {
        let data = await Guild.findOne({ guildID: interaction.guild.id });
        const { channel, options } = interaction;

        const Amount = options.getInteger("amount");
        const Target = options.getUser("target");
        const Messages = await channel.messages.fetch();

        const button = new ButtonBuilder()
            .setCustomId('deleteMessage')
            .setLabel('Удалить')
            .setStyle(ButtonStyle.Danger);

        if (options.getInteger("amount") > 100) {
            const response = new EmbedBuilder()
                .setColor(data.embedColor)
                .setTitle('❌ | Ошибка')
                .setDescription(`Выбранно слишком большое число для удаления. Максемальное допустимое 100.`);
            return interaction.reply({ embeds: [response] });
        } else if (Target) {
            let i = 0;
            const filtered = [];
            (await Messages).filter((m) => {
                if (m.author.id === Target.id && Amount > i) {
                    filtered.push(m);
                    i++;
                }
            })

            await channel.bulkDelete(filtered, true).then(messages => {
                const response = new EmbedBuilder()
                    .setColor(data.embedColor)
                    .setTitle('🧹 | Очистка')
                    .setDescription(`Очищено ${messages.size} сообщений от ${Target}.`);
                return interaction.reply({ embeds: [response], components: [new ActionRowBuilder().addComponents(button)]});
            })
        } else {
            await channel.bulkDelete(Amount, true).then(messages => {
                const response = new EmbedBuilder()
                    .setColor(data.embedColor)
                    .setTitle('🧹 | Очистка')
                    .setDescription(`Очищено ${messages.size} сообщений.`);
                return interaction.reply({ embeds: [response], components: [new ActionRowBuilder().addComponents(button)] });
            })
        }
    }
}