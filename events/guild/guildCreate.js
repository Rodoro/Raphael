const  Guild  = require('../../schemas/guild.js');

module.exports = {
    name: 'guildCreate',
    async execute(guild) {
        let data = await Guild.findOne({
            guildId: guild.id,
        });

        if (!data) {
            Guild.create({
                guildId: guild.id,
                guildName: guild.name,
            })
        }
    }
}