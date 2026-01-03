const {
    ApplicationCommandType,
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle,
    ActionRowBuilder,
    EmbedBuilder
} = require("discord.js");

const Produto = require("../../models/CadastroBOT");

module.exports = {
    name: "bot-cadastrar",
    description: "Cadastrar um novo modelo de bot",
    type: ApplicationCommandType.ChatInput,

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

        const modal = new ModalBuilder()
            .setCustomId("modal_cadastrar_produto")
            .setTitle("Informações para Cadastro de Bot");

        const nome = new TextInputBuilder()
            .setCustomId("nome")
            .setLabel("Qual modelo desse bot?")
            .setPlaceholder("Moderação, administração, registro, etc.")
            .setStyle(TextInputStyle.Short)
            .setRequired(true);

        const idProduto = new TextInputBuilder()
            .setCustomId("produtoId")
            .setLabel("Qual ID deseja fornecer a esse bot?")
            .setStyle(TextInputStyle.Short)
            .setRequired(true);

        const descricao = new TextInputBuilder()
            .setCustomId("descricao")
            .setLabel("Fale um pouco sobre ele.")
            .setStyle(TextInputStyle.Paragraph)
            .setRequired(true);

        const preco = new TextInputBuilder()
            .setCustomId("preco")
            .setLabel("Preço (em reais)")
            .setPlaceholder("Exemplo: 10 = R$10,00")
            .setStyle(TextInputStyle.Short)
            .setRequired(true);

        const imagem = new TextInputBuilder()
            .setCustomId("imagem")
            .setLabel("URL da imagem (opcional)")
            .setStyle(TextInputStyle.Short)
            .setRequired(false);

        modal.addComponents(
        
            new ActionRowBuilder().addComponents(nome),
            new ActionRowBuilder().addComponents(idProduto),
            new ActionRowBuilder().addComponents(descricao),
            new ActionRowBuilder().addComponents(preco),
            new ActionRowBuilder().addComponents(imagem)
        );

        await interaction.showModal(modal);
    }
};
