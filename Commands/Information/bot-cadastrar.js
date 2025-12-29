const {
    ApplicationCommandType,
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle,
    ActionRowBuilder
} = require("discord.js");

const Produto = require("../../models/CadastroBOT");

module.exports = {
    name: "bot-cadastrar",
    description: "Cadastrar um novo modelo de bot",
    type: ApplicationCommandType.ChatInput,

    run: async (client, interaction) => {

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
