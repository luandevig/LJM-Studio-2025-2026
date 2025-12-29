const {
    ApplicationCommandType,
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle,
    ActionRowBuilder
} = require("discord.js");

const Produto = require("../../models/CadastroDESIGN");

module.exports = {
    name: "design-cadastrar",
    description: "Cadastrar um novo design",
    type: ApplicationCommandType.ChatInput,

    run: async (client, interaction) => {

        const modal_d = new ModalBuilder()
            .setCustomId("modal_cadastrar_design")
            .setTitle("Informações para Cadastrar Design");

        const nome_d = new TextInputBuilder()
            .setCustomId("nome_design")
            .setLabel("Que tipo de design você está cadastrando?")
            .setPlaceholder('banner, icon, gif, etc.')
            .setStyle(TextInputStyle.Short)
            .setRequired(true);

        const idProduto_d = new TextInputBuilder()
            .setCustomId("produtoId_design")
            .setLabel("Qual ID deseja fornecer a esse design?")
            .setStyle(TextInputStyle.Short)
            .setRequired(true);

        const descricao_d = new TextInputBuilder()
            .setCustomId("descricao_design")
            .setLabel("Descrição para esse design.")
            .setPlaceholder("Fale sobre, mostre medidas")
            .setStyle(TextInputStyle.Paragraph)
            .setRequired(true);

        const preco_d = new TextInputBuilder()
            .setCustomId("preco_design")
            .setLabel("Preço (em reais)")
            .setPlaceholder("Exemplo: 10 = R$10,00")
            .setStyle(TextInputStyle.Short)
            .setRequired(true);

        const imagem_d = new TextInputBuilder()
            .setCustomId("imagem_exemplo")
            .setLabel("URL da imagem (opcional)")
            .setPlaceholder("Link de um exemplo (use exemplos LJM de preferência)")
            .setStyle(TextInputStyle.Short)
            .setRequired(false);

        modal_d.addComponents(
            new ActionRowBuilder().addComponents(nome_d),
            new ActionRowBuilder().addComponents(idProduto_d),
            new ActionRowBuilder().addComponents(descricao_d),
            new ActionRowBuilder().addComponents(preco_d),
            new ActionRowBuilder().addComponents(imagem_d)
        );

        await interaction.showModal(modal_d);
    }
};
