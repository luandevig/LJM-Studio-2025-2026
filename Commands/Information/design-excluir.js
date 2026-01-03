const {
    ApplicationCommandType,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    EmbedBuilder
} = require("discord.js");

const Produto_Design = require("../../models/CadastroDESIGN");

module.exports = {
    name: "design-excluir",
    description: "Excluir um design cadastrado",
    type: ApplicationCommandType.ChatInput,

    options: [
        {
            name: "id",
            description: "ID do design que deseja excluir.",
            type: 4,
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
        const produto = await Produto_Design.findOne({ produtoId });

        if (!produto) {
        const n_a_design = new EmbedBuilder()
            .setDescription(`<:ljm_x:1454957350250217474> Nenhum design com esse ID foi encontrado.`)
            .setColor("DarkRed")
            .setFooter({text:`Se isso for um erro entre em contato com um desenvolvedor.`})
            return interaction.reply({
                embeds: [n_a_design],
                flags: 64
            });
        }

        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId(`confirmar_excluir_design_${produtoId}`)
                .setLabel("Confirmar Exclusão")
                .setStyle(ButtonStyle.Danger),
            new ButtonBuilder()
                .setCustomId("cancelar_exclusao")
                .setLabel("Cancelar")
                .setStyle(ButtonStyle.Secondary)
        );
        const confirmando_bd = new EmbedBuilder()
            .setDescription(`<:l_danger:1455824766920425544> **Você tem certeza que deseja excluir esse design?**`)
            .addFields({name: `<:seta1:1203254495803478036> Nome: \`${produto.nome}\``, value: `<:lapisl:1202532853490122763> **ID: \`${produtoId}\`**`})
            .setColor(`DarkNavy`)
        await interaction.reply({
            embeds: [confirmando_bd],
            components: [row],
            flags: 64
        });
    }
};
