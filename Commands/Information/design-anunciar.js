const {
    ApplicationCommandType,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    StringSelectMenuBuilder
} = require("discord.js");

const Produto_Design = require("../../models/CadastroDESIGN");

module.exports = {
    name: "design-anunciar",
    description: "Anunciar designs selecionados",
    type: ApplicationCommandType.ChatInput,

    options: [
        {
            name: "ids",
            description: "IDs separados por vírgula (ex: 1,2,3) ou 'all'",
            type: 3, // STRING
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
        const idsInput = interaction.options.getString("ids").toLowerCase();

        const canal = await client.channels.fetch(
            process.env.ANUNCIOS_DESIGN_CHANNEL_ID
        );

        if (!canal) {
            const embed_reply_d = new EmbedBuilder()
                .setDescription(`<:ljm_x:1454957350250217474> Canal de anúncios para designers não foi encontrado.`)
                .setColor('ff0000')
                .setFooter({text:`Entre em contato com o desenvolvedor.`})
            return interaction.reply({
                embeds: [embed_reply_d],
                flags: 64
            });
        }

        let produtos = [];

        // 🔹 ALL
        if (idsInput === "all") {
            produtos = await Produto_Design.find();
        } 
        // 🔹 IDs específicos
        else {
            const ids = idsInput
                .split(",")
                .map(id => Number(id.trim()))
                .filter(id => !isNaN(id));

            if (!ids.length) {
                const embed_id_b = new EmbedBuilder()
                    .setDescription(`<:ljm_x:1454957350250217474> IDs inválidos, por favor verifique se os IDs existem.`)
                    .setFooter({text:`Se achar que isso é um erro, entre em contato com um desenvolvedor.`})
                    .setColor("FF0000")
                return interaction.reply({
                    embeds: [embed_id_b],
                    flags: 64
                });
            }

            produtos = await Produto_Design.find({
                produtoId: { $in: ids }
            });
        }

        if (!produtos.length) {
            const embed_design = new EmbedBuilder()
                .setDescription(`<:ljm_x:1454957350250217474> Nenhum design foi encontrado no banco de dados.`)
                .setFooter({text:`Tente novamente mais tarde ou entre em contato com um desenvolvedor.`})
                .setColor("FF0000")
            return interaction.reply({
                embeds: [embed_design],
                flags: 64
            });
        }

        const usarMenu = produtos.length > 1;

        // 🔁 Envio das embeds
        for (let i = 0; i < produtos.length; i++) {
            const produto = produtos[i];
            const isLast = i === produtos.length - 1;

            const embed = new EmbedBuilder()
                .setColor("Green")
                .setTitle(produto.nome + `<:sem_estoque:1202526592367333387>`)
                .setDescription(produto.descricao)
                .addFields(
                    { name: "<:Produto:1454769779364597802> Tipo", value: produto.categoria || "Design", inline: true },
                    { name: "<:lapisl:1202532853490122763> ID", value: String(produto.produtoId), inline: true },
                    { name: "<a:money_ljm_g:1454959397112516834> Preço", value: `R$ ${produto.preco}`, inline: true }
                )
                .setImage(produto.imagem)
                .setFooter({ text: "LJM Studio • A melhor escolha para seu servidor!" });

            let components = [];

            // 🔹 Apenas 1 produto → botão
            if (!usarMenu) {
                components.push(
                    new ActionRowBuilder().addComponents(
                        new ButtonBuilder()
                            .setCustomId(`comprar_design_${produto.produtoId}`)
                            .setLabel("Comprar")
                            .setEmoji(`<:esstoque:1202527604410941470>`)
                            .setStyle(ButtonStyle.Secondary)
                    )
                );
            }

            // 🔹 2 ou mais → menu só na última embed
            if (usarMenu && isLast) {
                components.push(
                    new ActionRowBuilder().addComponents(
                        new StringSelectMenuBuilder()
                            .setCustomId("menu_comprar_design")
                            .setPlaceholder("🎨 Escolha um design para comprar")
                            .addOptions(
                                produtos.map(p => ({
                                    label: `${p.nome}`,
                                    description: `💰 R$ ${p.preco}`,
                                    emoji: `<:esstoque:1202527604410941470>`,
                                    value: `comprar_design_${p.produtoId}`
                                }))
                            )
                    )
                );
            }

            await canal.send({
                embeds: [embed],
                components
            });
        }

        const embed_sucesso_design = new EmbedBuilder()
            .setDescription(`<:checkmark_IDS:1456900169508585494> Anúncio(s) enviados com sucesso!`)
            .setColor("Green")
        await interaction.reply({
            embeds: [embed_sucesso_design],
            flags: 64
        });
    }
};
