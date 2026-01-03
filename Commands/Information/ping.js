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
    if (ping < 100) return "<a:Green_Loading:1456901277245116572> Excelente";
    if (ping < 220) return "<a:Orange_Loading:1456901701146775675>";
    return "<a:Red_Loading:1456901917006368829> Instável";
}



      const ping = Math.round(client.ws.ping)
      const gateway = Date.now() - interaction.createdTimestamp
        const msg = await interaction.reply({embeds: [
            new Discord.EmbedBuilder()
            .setColor("DarkGreen")
            .setDescription(`<a:Green_Loading:1456901277245116572> **Estou calculando o ping, aguarde.**`)
        ]})
        setTimeout(() => {
            interaction.editReply({embeds: [
                new Discord.EmbedBuilder()
                .setColor("DarkGreen")
                .setDescription(`<a:Green_Loading:1456901277245116572> **Estou calculando o ping, aguarde..**`)
            ]})
        }, 2000)
    
        setTimeout(() => {
            interaction.editReply({embeds: [
                new Discord.EmbedBuilder()
                .setColor("DarkOrange")
                .setDescription(`<a:Orange_Loading:1456901701146775675> **Estou calculando o ping, aguarde...**`)
            ]})
        }, 4000)
        setTimeout(() => {
            interaction.editReply({embeds: [
                new Discord.EmbedBuilder()
                .setColor("DarkGreen")
                .setDescription(`<a:Green_Loading:1456901277245116572> **Estou calculando o ping, aguarde....**`)
            ]})
        }, 6000)
        setTimeout(() => {
          interaction.editReply({embeds: [
            new Discord.EmbedBuilder()
              .setColor("DarkOrange")
              .setDescription(`<a:Orange_Loading:1456901701146775675> **Estou calculando o ping, aguarde.....**`)
          ]})
      }, 8000)
      setTimeout(() => {
        interaction.editReply({embeds: [
            new Discord.EmbedBuilder()
            .setColor("DarkRed")
            .setDescription(`<a:Red_Loading:1456901917006368829> **Estou calculando o ping, aguarde......**`)
        ]})
    }, 10000)
    setTimeout(() => {
      interaction.editReply({embeds: [
        new Discord.EmbedBuilder()
          .setColor("DarkRed")
          .setDescription(`<a:Red_Loading:1456901917006368829> **Estou calculando o ping, aguarde.......**`)
      ]})
  }, 12000)
    setTimeout(() => {
        interaction.editReply({embeds: [
            new Discord.EmbedBuilder()
            .setColor("DarkGreen")
            .setDescription(`<a:Green_Loading:1456901277245116572> **Estou calculando o ping, aguarde........**`)
        ]})
    }, 14000)
        setTimeout(() => {
            interaction.editReply({embeds: [
                new Discord.EmbedBuilder()
                .setColor("DarkGrey")
                .setDescription(`**<:seta1:1203254495803478036> Ping (latência):** \`${ping}\` ms\n\n**<:seta1:1203254495803478036> Gateway Ping:** \`${gateway}\` ms`)
            ]})
        }, 16000)
		setTimeout(() => {
			interaction.editReply({embeds: [
				new Discord.EmbedBuilder()
				.setColor("Random")
				.setDescription("<a:8104LoadingEmote:1456902658467303567> **Coletando outras informações, aguarde!**")
			]})
		}, 20000)
		setTimeout(() => {
			interaction.editReply({embeds: [
				new Discord.EmbedBuilder()
				.setColor("DarkGrey")
				.setDescription("<:CameramanLike:1456903302791823372> **Confirmando meu uso de CPU, aguarde..**")
			]})
		}, 24000)
		setTimeout(() => {
			interaction.editReply({embeds: [
				new Discord.EmbedBuilder()
				.setColor("DarkGrey")
				.setDescription("<:CameramanLike:1456903302791823372> **Confirmando meu uso de CPU, aguarde...**")
			]})
		}, 26000)
		setTimeout(() => {
			interaction.editReply({embeds: [
				new Discord.EmbedBuilder()
				.setColor("DarkGrey")
				.setDescription("<:CameramanLike:1456903302791823372> **Confirmando meu uso de CPU, aguarde....**")
			]})
		}, 28000)
		setTimeout(() => {
			interaction.editReply({embeds: [
				new Discord.EmbedBuilder()
				.setColor("DarkNavy")
				.setDescription("<:ram_pc:1456904010706714624> **Confirmando o consumo de RAM, aguarde..**")
			]})
		}, 30000)
		setTimeout(() => {
			interaction.editReply({embeds: [
				new Discord.EmbedBuilder()
				.setColor("DarkNavy")
				.setDescription("<:ram_pc:1456904010706714624> **Confirmando o consumo de RAM, aguarde...**")
			]})
		}, 32000)
		setTimeout(() => {
			interaction.editReply({embeds: [
				new Discord.EmbedBuilder()
				.setColor("DarkNavy")
				.setDescription("<:ram_pc:1456904010706714624> **Confirmando o consumo de RAM, aguarde....**")
			]})
		}, 34000)
		setTimeout(() => {
			interaction.editReply({embeds: [
				new Discord.EmbedBuilder()
				.setColor("Random")
				.setDescription("**<a:MarioSpin:1456904576413208730> Confirmando as informações...**")
			]})
		}, 36000)
setTimeout(() => {
    interaction.editReply({
        embeds: [
            new Discord.EmbedBuilder()
                .setColor("00ff00")
                .setTitle("<a:verification_icon:1456905011446415374> Sistema Verificado com Sucesso! ")
                .setDescription("**Todas as análises foram concluídas. Status geral do bot abaixo:**")
                .addFields(
                    { name: "<a:discordchristmas:1456905535164252297> Ping Discord", value: `\`${pingDiscord} ms\`\n${getStatus(pingDiscord)}`, inline: true },
                    { name: "<:Vee_plush:1456906011565756518> Gateway", value: `\`${pingGateway} ms\``, inline: true },
                    { name: "<:Database:1456906174380249181> Database", value: `\`${pingDatabase} ms\``, inline: true },

                    { name: "<:emojigg_Ram:1456906374473711754> Uso de RAM", value: `\`${ram.used} MB / ${ram.total} GB\``, inline: true },
                    { name: "<:microchip_c:1456906510444789941>  Uso de CPU", value: `\`${cpu}%\``, inline: true },
                    { name: "<a:pixel_clock:1456906809481625672> Tempo de Execução", value: `\`${Date.now() - startTime} ms\``, inline: true },

                    { name: "<:MochaClock:1456907031809232927>  Uptime", value: `\`${formatUptime(uptime)}\``, inline: true },
                    { name: "<:Stats:1456907159903273075>  Status Geral", value: "<a:LinkCheerleaderGreen:1456907527319978056> `Online e Operacional`", inline: true }
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
