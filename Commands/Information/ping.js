const Discord = require(`discord.js`)
const os = require("os");
const mongoose = require("mongoose");
async function getDatabasePing() {
    const start = Date.now();
    await mongoose.connection.db.command({ ping: 1 });
    return Date.now() - start;
}
function formatUptime(ms) {
    const s = Math.floor(ms / 1000) % 60;
    const m = Math.floor(ms / (1000 * 60)) % 60;
    const h = Math.floor(ms / (1000 * 60 * 60)) % 24;
    const d = Math.floor(ms / (1000 * 60 * 60 * 24));
    return `${d}d ${h}h ${m}m ${s}s`;
}
function getRAM() {
    const used = process.memoryUsage().rss / 1024 / 1024;
    const total = os.totalmem() / 1024 / 1024 / 1024;
    return {
        used: used.toFixed(1),
        total: total.toFixed(1)
    };
}
function getCPU() {
    const cpus = os.cpus();
    let idle = 0, total = 0;

    for (const cpu of cpus) {
        for (const type in cpu.times) {
            total += cpu.times[type];
        }
        idle += cpu.times.idle;
    }

    const usage = 100 - Math.floor((idle / total) * 100);
    return usage;
}

module.exports = {
    name: "ping",
    description: "Veja o ping do bot !",
    type: Discord.ApplicationCommandType.ChatInput,
    /**
     * 
     * @param {Discord.Client} client 
     * @param {Discord.Message} interaction
     */

    run: async(client, interaction, args) => {

const startTime = Date.now();

const pingDiscord = Math.round(client.ws.ping);
const pingGateway = Date.now() - interaction.createdTimestamp;
const pingDatabase = await getDatabasePing();

const uptime = client.uptime;
const ram = getRAM();
const cpu = getCPU();
function getStatus(ping) {
    if (ping < 100) return "🟢 Excelente";
    if (ping < 250) return "🟡 Estável";
    return "🔴 Instável";
}



      const ping = Math.round(client.ws.ping)
      const gateway = Date.now() - interaction.createdTimestamp
        const msg = await interaction.reply({embeds: [
            new Discord.EmbedBuilder()
            .setColor("Random")
            .setDescription(`<a:loading_ljm:1454965074962944144> **Estou calculando o ping, aguarde.**`)
        ]})
        setTimeout(() => {
            interaction.editReply({embeds: [
                new Discord.EmbedBuilder()
                .setColor("Random")
                .setDescription(`<a:loading_ljm:1454965074962944144> **Estou calculando o ping, aguarde..**`)
            ]})
        }, 2000)
    
        setTimeout(() => {
            interaction.editReply({embeds: [
                new Discord.EmbedBuilder()
                .setColor("Random")
                .setDescription(`<a:loading_ljm:1454965074962944144> **Estou calculando o ping, aguarde...**`)
            ]})
        }, 4000)
        setTimeout(() => {
            interaction.editReply({embeds: [
                new Discord.EmbedBuilder()
                .setColor("Random")
                .setDescription(`<a:loading_ljm:1454965074962944144> **Estou calculando o ping, aguarde....**`)
            ]})
        }, 6000)
        setTimeout(() => {
          interaction.editReply({embeds: [
            new Discord.EmbedBuilder()
              .setColor("Random")
              .setDescription(`<a:loading_ljm:1454965074962944144> **Estou calculando o ping, aguarde.....**`)
          ]})
      }, 8000)
      setTimeout(() => {
        interaction.editReply({embeds: [
            new Discord.EmbedBuilder()
            .setColor("Random")
            .setDescription(`<a:loading_ljm:1454965074962944144> **Estou calculando o ping, aguarde......**`)
        ]})
    }, 10000)
    setTimeout(() => {
      interaction.editReply({embeds: [
        new Discord.EmbedBuilder()
          .setColor("Random")
          .setDescription(`<a:loading_ljm:1454965074962944144> **Estou calculando o ping, aguarde.......**`)
      ]})
  }, 12000)
    setTimeout(() => {
        interaction.editReply({embeds: [
            new Discord.EmbedBuilder()
            .setColor("Random")
            .setDescription(`<a:loading_ljm:1454965074962944144> **Estou calculando o ping, aguarde........**`)
        ]})
    }, 14000)
        setTimeout(() => {
            interaction.editReply({embeds: [
                new Discord.EmbedBuilder()
                .setColor("Random")
                .setDescription(`**<:seta1:1203254495803478036> Ping (latência):** \`${ping}\` ms\n\n**<:seta1:1203254495803478036> Gateway Ping:** \`${gateway}\` ms`)
            ]})
        }, 16000)
		setTimeout(() => {
			interaction.editReply({embeds: [
				new Discord.EmbedBuilder()
				.setColor("Random")
				.setDescription("<:send_dm:1202530548342456332> **Vou confirmar meu ping na DataBase, aguarde!**")
			]})
		}, 20000)
		setTimeout(() => {
			interaction.editReply({embeds: [
				new Discord.EmbedBuilder()
				.setColor("Random")
				.setDescription("<a:loading_ljm:1454965074962944144> **Confirmando meu ping na Database, aguarde.**")
			]})
		}, 24000)
		setTimeout(() => {
			interaction.editReply({embeds: [
				new Discord.EmbedBuilder()
				.setColor("Random")
				.setDescription("<a:loading_ljm:1454965074962944144> **Confirmando meu ping na Database, aguarde..**")
			]})
		}, 26000)
		setTimeout(() => {
			interaction.editReply({embeds: [
				new Discord.EmbedBuilder()
				.setColor("Random")
				.setDescription("<a:loading_ljm:1454965074962944144> **Confirmando meu ping na Database, aguarde...**")
			]})
		}, 28000)
		setTimeout(() => {
			interaction.editReply({embeds: [
				new Discord.EmbedBuilder()
				.setColor("Random")
				.setDescription("<a:loading_ljm:1454965074962944144> **Confirmando meu ping na Database, aguarde....**")
			]})
		}, 30000)
		setTimeout(() => {
			interaction.editReply({embeds: [
				new Discord.EmbedBuilder()
				.setColor("Random")
				.setDescription("**<:verify:1454936247532257294> Coletando as informações .<:verify:1454936247532257294>**")
			]})
		}, 32000)
		setTimeout(() => {
			interaction.editReply({embeds: [
				new Discord.EmbedBuilder()
				.setColor("Random")
				.setDescription("**<:verify:1454936247532257294> Coletando as informações..<:verify:1454936247532257294>**")
			]})
		}, 34000)
		setTimeout(() => {
			interaction.editReply({embeds: [
				new Discord.EmbedBuilder()
				.setColor("Random")
				.setDescription("**<:verify:1454936247532257294> Coletando as informações...<:verify:1454936247532257294>**")
			]})
		}, 36000)
		setTimeout(() => {
			interaction.editReply({embeds: [
				new Discord.EmbedBuilder()
				.setColor("Random")
				.setDescription("**<:verify:1454936247532257294> Coletando as informações....<:verify:1454936247532257294>**")
			]})
		}, 36500)
		setTimeout(() => {
			interaction.editReply({embeds: [
				new Discord.EmbedBuilder()
				.setColor("Random")
				.setDescription("**<:verify:1454936247532257294> Coletando as informações.....<:verify:1454936247532257294>**")
			]})
		}, 37000)
setTimeout(() => {
    interaction.editReply({
        embeds: [
            new Discord.EmbedBuilder()
                .setColor("00ff00")
                .setTitle("<:verify:1454936247532257294> Sistema Verificado com Sucesso")
                .setDescription("**Todas as análises foram concluídas. Status geral do bot abaixo:**")
                .addFields(
                    { name: "📡 Ping Discord", value: `\`${pingDiscord} ms\`\n${getStatus(pingDiscord)}`, inline: true },
                    { name: "🌐 Gateway", value: `\`${pingGateway} ms\``, inline: true },
                    { name: "🗄️ Database", value: `\`${pingDatabase} ms\``, inline: true },

                    { name: "🧠 Uso de RAM", value: `\`${ram.used} MB / ${ram.total} GB\``, inline: true },
                    { name: "⚙️ Uso de CPU", value: `\`${cpu}%\``, inline: true },
                    { name: "⏱️ Tempo de Execução", value: `\`${Date.now() - startTime} ms\``, inline: true },

                    { name: "🔁 Uptime", value: `\`${formatUptime(uptime)}\``, inline: true },
                    { name: "📊 Status Geral", value: "`🟢 Online e Operacional`", inline: true }
                )
                .setFooter({
                    text: `Solicitado por ${interaction.user.username}`,
                    iconURL: interaction.user.displayAvatarURL({ dynamic: true })
                })
                .setTimestamp()
        ]
    });
}, 40000);

}}
