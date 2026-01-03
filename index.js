require('dotenv').config();
const fs = require('fs');
const { QuickDB } = require('quick.db')
const db = new QuickDB()
const { Events } = require("discord.js");
const Discord = require('discord.js')
const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildMessageReactions,
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.MessageContent
	],
	partials: [Partials.Channel, Partials.Message, Partials.User, Partials.GuildMember, Partials.Reaction]
});
process.on('unhandRejection', (reason, promise) => {
  console.log(`🚨 | [Erro]\n\n` + reason, promise);
});
process.on('uncaughtException', (error, origin) => {
  console.log(`🚨 | [Erro]\n\n` + error, origin);
});
process.on('uncaughtExceptionMonitor', (error, origin) => {
  console.log(`🚨 | [Erro]\n\n` + error, origin);
});
client.slashCommands = new Collection();
module.exports = client;
fs.readdirSync('./Handlers').forEach((handler) => {
	require(`./Handlers/${handler}`)(client)
});


// ┌───────────────────────────────────────────────────────────────────────────────────────────────────┐
// └───────────────────────────────────────────────────────────────────────────────────────────────────┘

client.on(Events.GuildMemberAdd, async (member) => {
    try {
        const canalId = "1208209173557542943";
        const canal = member.guild.channels.cache.get(canalId);
        if (!canal) return;
        const embed_bv = new Discord.EmbedBuilder()
            .setDescription(`**O usuário ${member} entrou no servidor!**`)
            .addFields({
              name: `ID do Usuário:`, value: `${member.id}`
            })
            .setColor("Random")
        await canal.send({embeds: [embed_bv]}
        );

    } catch (err) {
        console.error("Erro ao enviar mensagem de boas-vindas:", err);
    }
});


client.login(process.env.TOKEN);
