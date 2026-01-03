const {
    ApplicationCommandType,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    EmbedBuilder,
} = require("discord.js");

const Produto = require("../../models/CadastroBOT");

module.exports = {
    name: "bot-excluir",
    description: "Excluir um bot cadastrado no banco de dados.",
    type: ApplicationCommandType.ChatInput,

    options: [
        {
            name: "id",
            description: "ID do bot que deseja excluir.",
            type: 4, // INTEGER
            required: true
        }
    ],

    run: async (client, interaction) => {
    const cargosPermitidos = ["1203263257540821033", "1189904400584556599", "1455821825291325451"];
    const temPermissao = interaction.member.roles.cache.some(role =>
    cargosPermitidos.includes(role.id));
            if (!temPermissao) {
                const sem_perm_b = new EmbedBuilder()
                   .setDescription(`<:ljm_x:1454957350250217474> Apenas cargos autorizados podem usar este comando!`)
                   .setColor(`#FF0000`)
            return interaction.reply({
                embeds: [sem_perm_b],
                flags: 64});
}

        const produtoId = interaction.options.getInteger("id");
        const produto = await Produto.findOne({ produtoId });

        if (!produto) {
        const n_a_bot = new EmbedBuilder()
            .setDescription(`<:ljm_x:1454957350250217474> Nenhum BOT com esse ID foi encontrado.`)
            .setColor("DarkRed")
            .setFooter(`Se isso for um erro entre em contato com um desenvolvedor.`)
            return interaction.reply({
                embeds: [n_a_bot],
                flags: 64
            });
        }

        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId(`confirmar_excluir_bot_${produtoId}`)
                .setLabel("Confirmar")
                .setEmoji(`<:menos1:1202532546798293023>`)
                .setStyle(ButtonStyle.Danger),
            new ButtonBuilder()
                .setCustomId("cancelar_exclusao")
                .setLabel("Cancelar")
                .setEmoji(`<:ljm_x:1454957350250217474> `)
                .setStyle(ButtonStyle.Secondary)
        );
        const confirmando_b = new EmbedBuilder()
            .setDescription(`<:l_danger:1455824766920425544> **Você tem certeza que deseja excluir esse bot?**`)
            .addFields({name: `<:seta1:1203254495803478036> Nome: \`${produto.nome}\``, value: `<:lapisl:1202532853490122763> **ID: \`${produtoId}\`**`})
            .setColor(`DarkNavy`)
        await interaction.reply({
            embeds: [confirmando_b],
            components: [row],
            flags: 64
        });
    }
};
