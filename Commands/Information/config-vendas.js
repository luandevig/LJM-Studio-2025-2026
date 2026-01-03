const { 
    ApplicationCommandType,
    ChannelType,
    EmbedBuilder
} = require("discord.js");

const ConfigVendas = require("../../models/ConfigVendas");

module.exports = {
    name: "config-vendas",
    description: "Configurar sistema de vendas (categoria, emoji e cargo de vendedor)",
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: "categoria",
            description: "Categoria onde os tickets serão criados",
            type: 7, // CHANNEL
            channel_types: [ChannelType.GuildCategory],
            required: true
        },
        {
            name: "emoji",
            description: "Emoji do canal (ex: 🎩)",
            type: 3,
            required: true
        },
        {
            name: "cargo_vendedor",
            description: "Cargo que terá acesso aos tickets",
            type: 8, // ROLE
            required: true
        }
    ],

    run: async (client, interaction) => {
        const categoria = interaction.options.getChannel("categoria");
        const emoji = interaction.options.getString("emoji");
        const cargo = interaction.options.getRole("cargo_vendedor");

        await ConfigVendas.deleteMany();
        await ConfigVendas.create({
            categoriaId: categoria.id,
            emoji,
            cargoVendedorId: cargo.id
        });
        const embed_vendas = new EmbedBuilder()
            .setTitle(`Configurado com Sucesso! <:checkmark_IDS:1456900169508585494>`)
            .addFields({
                name: `<:termos:1202530924726849566> Categoria:`, value: `${categoria.name}`,
                name: `<:outros_game:1203714501451587625> Emoji:`, value: `${emoji}`,
                name: `<:verificado_ljm:1454959063518412993> Cargo de Vendedor:`, value: `${cargo.name}`
            })
        return interaction.reply({
            embeds: [embed_vendas],
            flags: 64
        });
    }
};
