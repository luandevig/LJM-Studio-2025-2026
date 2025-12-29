require('dotenv').config();
const fs = require('fs');
const { QuickDB } = require('quick.db')
const db = new QuickDB()
const Discord = require('discord.js')
const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildPresences,
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


// ┌────────────────────────────┐
// │     SISTEMAS DE VENDAS     │
// └────────────────────────────┘
client.on("interactionCreate", (interaction) => {
  if (interaction.isButton()) {
      if (interaction.customId === "venda") {
          if (interaction.guild.channels.cache.find(ca => ca.name === `${interaction.user.id}-🎟`)) {

              const canal = interaction.guild.channels.cache.find(ca => ca.name === `${interaction.user.id}-🎟`);

              const jaTem = new Discord.EmbedBuilder()
                  .setDescription(`❌ **Calma! Você já tem um ticket criado em: ${canal}.**`)
                  .setColor('#ff0000')
              interaction.reply({ embeds: [jaTem], ephemeral: true })


          if (!interaction.guild.channels.cache.get(categoria)) categoria = null;
          } else {
              interaction.guild.channels.create({
                  name: `${interaction.user.username}-🎟`,
                  type: 0, //Canal de texto
                  permissionOverwrites: [
                    {
                      id: interaction.guild.id,
                      deny: [
                        Discord.PermissionFlagsBits.ViewChannel
                      ]
                    },
                    {
                      id: interaction.user.id,
                      allow: [
                        Discord.PermissionFlagsBits.ViewChannel,
                        Discord.PermissionFlagsBits.SendMessages,
                        Discord.PermissionFlagsBits.AttachFiles,
                        Discord.PermissionFlagsBits.EmbedLinks,
                        Discord.PermissionFlagsBits.AddReactions
                      ]
                    }
                  ]
              }).then(ca => {
                const ircomprar = new Discord.ActionRowBuilder().addComponents(
                      new Discord.ButtonBuilder()
                      .setLabel(`Ir para a compra`)
                      .setEmoji(`⭐🛒`)
                      .setStyle(5)
                      .setURL(`https://discord.com/channels/${interaction.guild.id}/${ca.id}`)
                    )
                const novaVenda = new Discord.EmbedBuilder()
                      .setDescription(`${interaction.user} **sua compra foi aberta no canal: ${ca}!**`)
                      .setColor('fff000')
                  interaction.reply({ embeds: [novaVenda], components: [ircomprar], ephemeral: true })

                const aberto = new Discord.EmbedBuilder()
                      .setAuthor({ name: `Sistema de Vendas・${interaction.guild.name}`, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                      .setDescription(`**Olá ${interaction.user} esse é o canal exclusivo para suas compras, por favor aguarde o contato de <@1006001345649713193> aqui nesse canal de ticket.**`)
                      .setColor("Random")

                const b1 = new Discord.ButtonBuilder()
                      .setCustomId("cancelar")
                      .setLabel(`Cancelar Compra`)
                      .setEmoji("❌🛒")
                      .setStyle(4)
                const bortao = new Discord.ActionRowBuilder().addComponents(b1);
                        
          ca.send({  embeds: [aberto], components: [bortao] }).then(msg => msg.pin())
          ca.send(`${interaction.user}`).then(msg => setTimeout(msg.delete.bind(msg), 5000)) 
              })
          }

      } else if (interaction.customId === "cancelar") {

                let bye = new Discord.EmbedBuilder()
                    .setDescription(`> **Essa compra foi cancelada por ${interaction.user}.**\nEsse ticket será fechado em 5 segundos.`)
                    .setColor('Random')
                interaction.reply({ embeds: [bye]}).then(() => {setTimeout(() => {interaction.channel.delete()}, 6000)
          })
      }
  }
}); 
// ┌───────────────────────────────────────────────────────────────────────────────────────────────────┐
// └───────────────────────────────────────────────────────────────────────────────────────────────────┘




client.login(process.env.TOKEN);
