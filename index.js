const { token, databaseToken } = require('./json/config.json');
const { Client, Collection } = require('discord.js');
const fs = require('fs');
const { connect } = require('mongoose');
const client = new Client({ intents: 131071 });


client.commands = new Collection();
client.buttons = new Collection();
client.selectMenus = new Collection();
client.modals = new Collection();
client.commandArray = [];


const functionFolders = fs.readdirSync(`./functions`);
for (const folder of functionFolders) {
    const functionFiles = fs
        .readdirSync(`./functions/${folder}`)
        .filter(file => file.endsWith('.js'));
    for (const file of functionFiles)
        require(`./functions/${folder}/${file}`)(client);
}


client.handleEvents();
client.handleCommands();
client.handleComponents();

(async () => {
    await connect(databaseToken, { useNewUrlParser: true, useUnifiedTopology: true }).catch(console.error);
})();

client.login(token);