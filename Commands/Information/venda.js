const Discord = require("discord.js")
module.exports = {
	name: 'venda',
	description: "Use meu sistema de ticket.",
	cooldown: 3000,
	type: 1,
    options: [
        {
            name: "produto",
            description: "Qual produto deseja anúnciar a venda ?",
            type: Discord.ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: "preço",
            description: "Qual o preço desse produto ?",
            type: Discord.ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: "estoque",
            description: "Qual quantidade tem no estoque desse produto ?",
            type: Discord.ApplicationCommandOptionType.String,
            required: true  
    
        },
        {
            name: "image",
            description: "Anexe um arquivo.",
            type: Discord.ApplicationCommandOptionType.String,
            required: true
        },
      ],
      
	run: async (client, interaction) => {
    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.Administrator)) return interaction.reply({content: `❌ **Calma! Você precisar ser um admin para usar o meu sistema!**`, ephemeral: true}).then(() => {
            setTimeout(() => {
                interaction.deleteReply()
            }, 11000)
        })

        const nome = interaction.options.getString("produto")
        const preco = interaction.options.getString("preço")
        const estoque = interaction.options.getString("estoque")
        const image = interaction.options.getString("image")
            let embed = new Discord.EmbedBuilder()
.setColor('Random')
.setDescription(`<:Produto:1454769779364597802> **Produto:**\n${nome}\n <:Pix:1454769991097516187> **Preço:**\n${preco}\n**<:esstoque:1202527604410941470> **Estoque:**\n${estoque}\n`)
.setImage(`${image}`)
            let bortao = new Discord.ActionRowBuilder()
            .addComponents(
                new Discord.ButtonBuilder()
                .setCustomId("venda")
                .setEmoji("🛒")
                .setLabel("Comprar")
                .setStyle(3)
            );
            interaction.channel.send({ embeds: [embed], components: [bortao] })
            interaction.reply({ content: '✅ Sistema de venda adicionado com sucesso', ephemeral: true })
    }
}