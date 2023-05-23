const { EmbedBuilder, SlashCommandBuilder, PermissionFlagsBits, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const Guild = require('../../schemas/guild.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Бан-хаммер')
        .addUserOption(options =>
            options.setName('user')
                .setDescription('Пользователь, которого требуется забанить')
                .setRequired(true))
        .addStringOption(options =>
            options.setName('reason')
                .setDescription('Причина')
                .setRequired(false))
        .addIntegerOption(options =>
            options.setName('message_delete_time')
                .setDescription('Удалять сообщения за <...> дней (не указывать чтобы не удалять)')
                .setRequired(false))
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
    async execute(interaction, client) {
        const BanMessageDeleteTime = interaction.options.getInteger('message_delete_time')
        const BanReason = interaction.options.getString('reason')
        const BanUser = interaction.options.getMember('user')
        const BanUserUser = interaction.options.getUser('user')
        let XZ = '';
        if (BanMessageDeleteTime) {
            if (BanMessageDeleteTime == 1) {
                XZ = "день"
            }
            if (BanMessageDeleteTime >= 2 && BanMessageDeleteTime <= 4) {
                XZ = "дня"
            } else {
                XZ = "дней"
            }
        }
        if (BanUserUser.bannable === false) {
            const MyBeautifulEmbed = new EmbedBuilder()
                .setTitle('⛔ | Не удалось забанить участника!')
                .setDescription('Похоже, роль участника которого вы пытались забанить выше роли бота')
                .setColor('#ff3660')
            return interaction.reply({ embeds: [MyBeautifulEmbed] })
        }
        if ((BanMessageDeleteTime && BanMessageDeleteTime <= 0) || (BanMessageDeleteTime && BanMessageDeleteTime > 7)) {
            const ErrorEpta = new EmbedBuilder()
                .setTitle('⚠️ | Ошибка при попытке забанить участника')
                .setDescription('Количество дней на удаление сообщений **не должно меньше нуля / больше 7**')
                .setColor('#ff3660')
            return interaction.reply({ embeds: [ErrorEpta] })
        }
        if (!BanMessageDeleteTime && !BanReason) {
            await BanUser.ban({ reason: `Был забанен модератором ${interaction.user.username}. Причина: <не указано>` })
            const BanEpta = new EmbedBuilder()
                .setTitle(`✅ | Успешно забанил ${BanUser.user.username}`)
                .setDescription('Правосудие восторжествовало!')
                .addFields(
                    { name: 'Причина бана', value: '<не указано>' },
                    { name: 'Модератор', value: interaction.user.username }
                )
                .setColor('#8bff00')
            return interaction.reply({ embeds: [BanEpta] })
        }
        if (!BanMessageDeleteTime && BanReason) {
            await BanUser.ban({ reason: `Был забанен модератором ${interaction.user.username}. Причина: ${BanReason}` })
            const BanEpta = new EmbedBuilder()
                .setTitle(`✅ | Успешно забанил ${BanUser.user.username}`)
                .setDescription('Правосудие восторжествовало!')
                .addFields(
                    { name: 'Причина бана', value: BanReason },
                    { name: 'Модератор', value: interaction.user.username }
                )
                .setColor('#8bff00')
            return interaction.reply({ embeds: [BanEpta] })
        }
        if (BanMessageDeleteTime && !BanReason) {
            await BanUser.ban({ reason: `Был забанен модератором ${interaction.user.username}. Причина: <не указано>`, days: BanMessageDeleteTime })
            const BanEpta = new EmbedBuilder()
                .setTitle(`✅ | Успешно забанил ${BanUser.user.username}`)
                .setDescription('Правосудие восторжествовало!')
                .addFields(
                    { name: 'Причина бана', value: '<не указано>' },
                    { name: 'Модератор', value: interaction.user.username },
                    { name: 'Удаление сообщений', value: `${BanMessageDeleteTime} ${XZ}` }
                )
                .setColor('#8bff00')
            return interaction.reply({ embeds: [BanEpta] })
        }
        if (BanMessageDeleteTime && BanReason) {
            await BanUser.ban({ reason: `Был забанен модератором ${interaction.user.username}. Причина: ${BanReason}`, days: BanMessageDeleteTime })
            const BanEpta = new EmbedBuilder()
                .setTitle(`✅ | Успешно забанил ${BanUser.user.username}`)
                .setDescription('Правосудие восторжествовало!')
                .addFields(
                    { name: 'Причина бана', value: BanReason },
                    { name: 'Модератор', value: interaction.user.username },
                    { name: 'Удаление сообщений', value: `${BanMessageDeleteTime} ${XZ}` }
                )
                .setColor('#8bff00')
            return interaction.reply({ embeds: [BanEpta] })
        }
    }
}