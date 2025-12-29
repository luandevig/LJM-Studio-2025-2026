const { ApplicationCommandType, EmbedBuilder } = require("discord.js");
const Produto = require("../../models/CadastroBOT");

module.exports = {
    name: "bot-cadastros",
    description: "Buscar um produto pelo ID ou listar todos",
    type: ApplicationCommandType.ChatInput,

    options: [
        {
            name: "id",
            description: "ID do design(opcional)",
            type: 4, // INTEGER
            required: false
        }
    ],

    run: async (client, interaction) => {

        const id = interaction.options.getInteger("id");

        if (id !== null) {
            const produto = await Produto.findOne({ produtoId: id });
            if (!produto) {
            const produto_nao_encontrado = new EmbedBuilder()
                    .setDescription(`<:ljm_x:1454957350250217474> Produto não encontrado.`)
                    .setColor("FF0000")
                return interaction.reply({ embeds: [produto_nao_encontrado], ephemeral: true });
            }

            const embed = new EmbedBuilder()
                .setTitle(`${produto.nome} <:verificado_ljm:1454959063518412993>`)
                .setDescription(produto.descricao)
                .addFields(
                    { name: "<:lapisl:1202532853490122763> ID de Cadastro:", value: `${produto.produtoId}`, inline: true },
                    { name: "<a:money_ljm_g:1454959397112516834> Preço:", value: `R$ ${produto.preco}`, inline: true }
                )
                .setColor("Green");

            if (produto.imagem) embed.setImage(produto.imagem);

            return interaction.reply({ embeds: [embed] });
        }

        // Mostrar todos
        const produtos = await Produto.find();
        if (produtos.length === 0) {
            const nenhum_produto = new EmbedBuilder()
                .setDescription(`<:ljm_x:1454957350250217474> Nenhum produto cadastrado.`)
                .setColor("FF0000")
            return interaction.reply({ embeds: [nenhum_produto], ephemeral: true });
        }

        const lista = produtos.map(p =>
            `**<:quantimais:1202531709564882974> ${p.produtoId} | ${p.nome}** — <a:money_ljm_g:1454959397112516834> R$ ${p.preco}`
        ).join("\n");

        interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setTitle("<:sem_estoque:1202526592367333387> Produtos Cadastrados")
                    .setDescription(lista)
                    .setColor("Green")
            ]
        });
    }
};
