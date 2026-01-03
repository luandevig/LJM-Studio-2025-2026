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
    const cargosPermitidos = ["1203263257540821033", "1189904400584556599", "1455821825291325451"];
    const temPermissao = interaction.member.roles.cache.some(role =>
    cargosPermitidos.includes(role.id));
            if (!temPermissao) {
                const sem_perm_b = new Discord.EmbedBuilder()
                   .setDescription(`<:ljm_x:1454957350250217474> Apenas cargos autorizados podem usar este comando!`)
                   .setColor(`#FF0000`)
            return interaction.reply({
                embeds: [sem_perm_b],
                flags: 64});
}

        let canal = interaction.options.getChannel('canal');
        joinVoiceChannel({
            channelId: canal.id,
            guildId: canal.guild.id,
            adapterCreator: canal.guild.voiceAdapterCreator
        })

        const embeda = new Discord.EmbedBuilder()
        .setColor('FF00FF')
        .setDescription(`<:checkmark_IDS:1456900169508585494> **Agora estou conectado no canal ${canal}.**`)
        .addFields({name: `Fui conectado por:`, value: `${interaction.user}`})
        interaction.reply({ embeds: [embeda] })
    }
}