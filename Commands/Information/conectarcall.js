const Discord = require("discord.js");
const { joinVoiceChannel } = require("@discordjs/voice");

module.exports = {
    name: "conectarcall",
    description: "Me faça conectar em algum canal de voz do servidor",
    options: [
        {
            name: "canal",
            description: "Em qual canal deseja que o bot se conecte ?",
            type: Discord.ApplicationCommandOptionType.Channel,
            channelTypes: [
                Discord.ChannelType.GuildVoice,
            ],
            required: true
        }
    ],

    run: async (client, interaction) => {
        arr = ["1189904400584556599", "1034153099973111882", "1044714371814785124"];
        if(!interaction.member.roles.cache.has(arr[0]) === !interaction.member.roles.cache.has(arr[1]) === !interaction.member.roles.cache.has(arr[2]))
        { return interaction.reply(interaction.reply({embeds: [ new Discord.EmbedBuilder()
            .setDescription(`:x: Você não possui permissão para utilizar este comando.`)
            .setColor(`ff00ff`)]}))}

        let canal = interaction.options.getChannel('canal');
        joinVoiceChannel({
            channelId: canal.id,
            guildId: canal.guild.id,
            adapterCreator: canal.guild.voiceAdapterCreator
        })

        const embeda = new Discord.EmbedBuilder()
        .setColor('FF00FF')
        .setDescription(`<:verify:1454936247532257294> **Agora estou conectado no canal ${canal}.**`)
        .addFields({name: `Fui conectado por:`, value: `${interaction.user}`})
        interaction.reply({ embeds: [embeda] })
    }
}