const { Schema, model } = require('mongoose');
const guildSchemas = new Schema({ 
    guildId: String,
    guildName: String,

    embedColor: { type: String, default: '#9966CC'},
})
module.exports = model("Guild", guildSchemas, "guilds")