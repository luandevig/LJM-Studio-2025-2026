const {
    EmbedBuilder,
    PermissionsBitField,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    ChannelType,
    StringSelectMenuBuilder
} = require("discord.js");

const client = require("..");
const Discord = require("discord.js");
const Produto = require("../models/CadastroBOT");
const Produto_Design = require("../models/CadastroDESIGN");
const ConfigVendas = require("../models/ConfigVendas");
const CompraAtiva = require("../models/CompraAtiva");
const logSystem = require("../utils/logSystem");
const discordTranscripts = require("discord-html-transcripts");

/* ===========================
   🚨 ERROS
===========================*/
process.on("unhandledRejection", console.error);
process.on("uncaughtException", console.error);

/* ===========================
   🧠 FUNÇÃO DE COMPRA
===========================*/
async function processarCompra(interaction, tipo, id) {
    const compraExistente = await CompraAtiva.findOne({ userId: interaction.user.id });
    if (compraExistente) {
        const ticket_a = new EmbedBuilder()
            .setDescription(`**<:ljm_x:1454957350250217474> Você já possui um ticket aberto.**`)
            .setColor("Red");

        return interaction.followUp({ embeds: [ticket_a], flags: 64 });
    }

    let produto;
    if (tipo === "bot") produto = await Produto.findOne({ produtoId: Number(id) });
    if (tipo === "design") produto = await Produto_Design.findOne({ produtoId: Number(id) });

    if (!produto) {
        const n_encontrado = new EmbedBuilder()
            .setDescription(`<:ljm_x:1454957350250217474> **Produto não encontrado.**`)
            .setColor("DarkRed");
        return interaction.followUp({ embeds: [n_encontrado], flags: 64 });
    }

    const config = await ConfigVendas.findOne();
    if (!config) {
        const n_a_system = new EmbedBuilder()
            .setDescription(`<:ljm_x:1454957350250217474> **Sistema não configurado.**`)
            .setColor("DarkRed");
        return interaction.followUp({ embeds: [n_a_system], flags: 64 });
    }

    const categoria = interaction.guild.channels.cache.get(config.categoriaId);
    const cargoVendedor = interaction.guild.roles.cache.get(config.cargoVendedorId);

    if (!categoria || !cargoVendedor) {
        const n_a_config = new EmbedBuilder()
            .setDescription(`<:ljm_x:1454957350250217474> **Configuração inválida.**`)
            .setColor("DarkRed");
        return interaction.followUp({ embeds: [n_a_config], flags: 64 });
    }

    const nomeCanal = `${config.emoji}┃${interaction.user.username}`;

    const canal = await interaction.guild.channels.create({
        name: nomeCanal,
        type: ChannelType.GuildText,
        parent: categoria.id,
        permissionOverwrites: [
            { id: interaction.guild.id, deny: [PermissionsBitField.Flags.ViewChannel] },
            {
                id: interaction.user.id,
                allow: [
                    PermissionsBitField.Flags.ViewChannel,
                    PermissionsBitField.Flags.SendMessages,
                    PermissionsBitField.Flags.ReadMessageHistory
                ]
            },
            {
                id: cargoVendedor.id,
                allow: [
                    PermissionsBitField.Flags.ViewChannel,
                    PermissionsBitField.Flags.SendMessages,
                    PermissionsBitField.Flags.ReadMessageHistory
                ]
            }
        ]
    });

    await CompraAtiva.create({
        userId: interaction.user.id,
        canalId: canal.id,
        tipo
    });

    // Envia ticket no canal
    await canal.send({
        embeds: [
            new EmbedBuilder()
                .setTitle("<:carrinho:1202525985149550592> Ticket de Compra")
                .addFields(
                    { name: "<:user:1456874170183847937> Cliente:", value: `${interaction.user}`, inline: false },
                    { name: "<:Produto:1454769779364597802> Produto:", value: produto.nome, inline: false },
                    { name: "<a:Dollar_2:1456874856258998378> Valor:", value: `R$ ${produto.preco}`, inline: false }
                )
                .setColor("Green")
        ],
        components: [
            new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setCustomId("ticket_finalizar")
                    .setLabel("Finalizar")
                    .setEmoji("<:comprar:1202527131842777099>")
                    .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                    .setCustomId("ticket_notificar")
                    .setLabel("Notificar")
                    .setEmoji("<:send_dm:1202530548342456332>")
                    .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                    .setCustomId("ticket_cancelar")
                    .setLabel("Cancelar")
                    .setEmoji("<:ljm_x:1454957350250217474>")
                    .setStyle(ButtonStyle.Secondary)
            )
        ]
    });

    // Resposta pro usuário
    return interaction.followUp({
        embeds: [
            new EmbedBuilder()
                .setTitle("<:NewTicket:1456875620591206533> Ticket criado")
                .addFields(
                    { name: "<:Produto:1454769779364597802> Produto", value: produto.nome, inline: false },
                    { name: "<a:Dollar_2:1456874856258998378> Valor", value: `R$ ${produto.preco}`, inline: false }
                )
                .setColor("Green")
        ],
        components: [
            new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setLabel("Acessar Ticket")
                    .setEmoji("<:Link:1456875913689174122>")
                    .setStyle(ButtonStyle.Link)
                    .setURL(`https://discord.com/channels/${interaction.guild.id}/${canal.id}`)
            )
        ],
        flags: 64
    });
}

/* ===========================
   🎯 INTERACTIONS
===========================*/
client.on("interactionCreate", async (interaction) => {

    /* ===========================
       📝 MODAIS
    ============================*/ 
    if (interaction.isModalSubmit()) {

        /* CADASTRO BOT */
        if (interaction.customId === "modal_cadastrar_produto") { 
            const produtoId = Number(interaction.fields.getTextInputValue("produtoId"));
            if (isNaN(produtoId)) return interaction.reply({
                embeds: [new EmbedBuilder()
                    .setDescription("<:ljm_x:1454957350250217474> **O ID fornecido é inválido.**")
                    .setColor("Red")],
                flags: 64
            });
            if (await Produto.findOne({ produtoId })) return interaction.reply({
                embeds: [new EmbedBuilder()
                    .setDescription("<:ljm_x:1454957350250217474> **Já existe um bot com esse ID.**")
                    .setColor("Red")],
                flags: 64
            });

            const produto = {
                nome: interaction.fields.getTextInputValue("nome"),
                produtoId,
                descricao: interaction.fields.getTextInputValue("descricao"),
                preco: Number(interaction.fields.getTextInputValue("preco")),
                imagem: interaction.fields.getTextInputValue("imagem") || null
            };

            await Produto.create(produto);
            await logSystem(client, {
                title: "[<:emojigg_Bot:1456898008326082725>] Novo BOT Cadastrado. <a:Burst:1456896404332085362>",
                color: "Green",
                nome: produto.nome,
                id: produto.produtoId,
                preco: `R$ ${produto.preco}`,
                autor: interaction.user.tag
            });

            return interaction.reply({
                embeds: [new EmbedBuilder()
                    .setDescription("<a:Burst:1456896404332085362> **BOT cadastrado com sucesso!** <:emojigg_Bot:1456898008326082725>")
                    .setColor("Green")],
                flags: 64
            });
        }

        /* CADASTRO DESIGN */
        if (interaction.customId === "modal_cadastrar_design") {
            const produtoId = Number(interaction.fields.getTextInputValue("produtoId_design"));
            if (isNaN(produtoId)) return interaction.reply({
                embeds: [new EmbedBuilder()
                    .setDescription("<:ljm_x:1454957350250217474> **O ID fornecido é inválido.**")
                    .setColor("Red")],
                flags: 64
            });
            if (await Produto_Design.findOne({ produtoId })) return interaction.reply({
                embeds: [new EmbedBuilder()
                    .setDescription("<:ljm_x:1454957350250217474> **Já existe um design com esse ID.**")
                    .setColor("Red")],
                flags: 64
            });

            const produto = {
                nome: interaction.fields.getTextInputValue("nome_design"),
                produtoId,
                descricao: interaction.fields.getTextInputValue("descricao_design"),
                preco: Number(interaction.fields.getTextInputValue("preco_design")),
                imagem: interaction.fields.getTextInputValue("imagem_exemplo") || null
            };

            await Produto_Design.create(produto);
            await logSystem(client, {
                title: "<:Artist:1456898085887414496>] Novo DESIGN Cadastrado. <a:Burst:1456896404332085362>",
                color: "Green",
                nome: produto.nome,
                id: produto.produtoId,
                preco: `R$ ${produto.preco}`,
                autor: interaction.user.tag
            });

            return interaction.reply({
                embeds: [new EmbedBuilder()
                    .setDescription("<a:Burst:1456896404332085362> Design cadastrado com sucesso! <:Artist:1456898085887414496>")
                    .setColor("Green")],
                flags: 64
            });
        }

        return;
    }

    /* ===========================
       ⚡ SLASH COMMANDS
    ============================*/
    if (interaction.isChatInputCommand()) {
        const cmd = client.slashCommands.get(interaction.commandName);
        if (cmd) await cmd.run(client, interaction);
        return;
    }

    /* ===========================
       📝 SELECT MENU
    ============================*/
    if (interaction.isStringSelectMenu()) {
        const [, tipo, id] = interaction.values[0].split("_");

        // ACK correto
        await interaction.deferReply({ flags: 64 });

        await processarCompra(interaction, tipo, id);

        // RESET DO MENU
        const menuResetado = new StringSelectMenuBuilder()
            .setCustomId(interaction.customId)
            .setPlaceholder(interaction.component.placeholder || "Selecione uma opção")
            .addOptions(interaction.component.options.map(op => ({
                label: op.label,
                value: op.value,
                description: op.description,
                emoji: op.emoji
            })));

        await interaction.message.edit({
            components: [new ActionRowBuilder().addComponents(menuResetado)]
        });

        return;
    }

    /* ===========================
       🔘 BOTÕES
    ============================*/
    if (interaction.isButton()) {
        const { customId } = interaction; // define customId

        const config = await ConfigVendas.findOne();
        const cargoVendedor = config ? interaction.guild.roles.cache.get(config.cargoVendedorId) : null;

        // BOTÃO DE COMPRA
        if (customId.startsWith("comprar_")) {
            await interaction.deferReply({ flags: 64 });
            const [, tipo, id] = customId.split("_");
            return processarCompra(interaction, tipo, id);
        }

        // BOTÃO FINALIZAR / CANCELAR TICKET
        if (customId === "ticket_finalizar" || customId === "ticket_cancelar") {
            if (!interaction.member.roles.cache.has(cargoVendedor?.id)) {
                const not_permission = new EmbedBuilder()
                    .setDescription(`<:Admin:1456898717071184046> Apenas vendedores podem fazer isso.`)
                    .setColor("DarkRed");
                return interaction.reply({ embeds: [not_permission], flags: 64 });
            }

            return interaction.reply({
                embeds: [new EmbedBuilder()
                    .setTitle("<:alert:1456899231960010897> Atenção! <:alert:1456899231960010897>")
                    .setDescription("Essa ação excluirá o canal e não poderá ser desfeita! <a:warningg:1456899612781711539>")
                    .setColor("Red")],
                components: [
                    new ActionRowBuilder().addComponents(
                        new ButtonBuilder()
                            .setCustomId(`confirmar_${customId}`)
                            .setLabel("Confirmar")
                            .setEmoji("<:checkmark_IDS:1456900169508585494>")
                            .setStyle(ButtonStyle.Success),
                        new ButtonBuilder()
                            .setCustomId("cancelar_acao")
                            .setLabel("Cancelar")
                            .setEmoji("<:X_IDS:1456900283941654599>")
                            .setStyle(ButtonStyle.Danger)
                    )
                ],
                flags: 64
            });
        }

        // NOTIFICAR USUÁRIO
        if (customId === "ticket_notificar") {
            const compra = await CompraAtiva.findOne({ canalId: interaction.channel.id });
            if (!compra) return;

            const user = await client.users.fetch(compra.userId);
            const embed_user = new EmbedBuilder()
                .setDescription(`### O vendedor respondeu seu ticket! <a:LinkCheerleaderRed:1456892166805917809>\n-# [LJM Studio] Notificações.`)
                .setColor("Random");
            await user.send({ embeds: [embed_user] });

            const embed_suc = new EmbedBuilder()
                .setDescription(`<:checkmark_IDS:1456900169508585494> **O usuário ${user} foi notificado no DM!**`)
                .setColor("Green");
            return interaction.reply({ embeds: [embed_suc], flags: 64 });
        }

        // CONFIRMAR FINALIZAR/CANCELAR TICKET
if (customId.startsWith("confirmar_ticket_")) {
    await interaction.deferReply({ flags: 64 });

    const transcript = await discordTranscripts.createTranscript(interaction.channel, {
        limit: -1,
        returnBuffer: false,
        fileName: `transcript-${interaction.channel.id}.html`,
        saveImages: true
    });

    const canalLogs = interaction.guild.channels.cache.get(process.env.CANAL_LOGS_TRANSCRIPT);
    if (canalLogs) {

        // envia arquivo + embed
        const msg = await canalLogs.send({
            embeds: [
                new EmbedBuilder()
                    .setTitle("<:save:1456910200501047409> Transcript")
                    .setDescription(
                        `<:seta1:1203254495803478036> **Ticket:**\n${interaction.channel.name}\n<:seta_retorno:1198012174992420894>`
                    )
                    .setColor("Blue")
            ],
            files: [transcript]
        });

        // pega a URL real do attachment
        const url = msg.attachments.first()?.url;

        // só cria o botão se a URL existir
        if (url) {
            const row = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setLabel("Abrir Transcript")
                    .setStyle(ButtonStyle.Link)
                    .setURL(url)
            );

            // edita a mesma mensagem adicionando o botão
            await msg.edit({ components: [row] });
        }
    }

    await CompraAtiva.deleteOne({ canalId: interaction.channel.id });
    await interaction.channel.delete();
}

        // CANCELAR AÇÃO
        if (customId === "cancelar_acao") {
            return interaction.update({ content: "<:ljm_x:1454957350250217474> Ação cancelada.", components: [] });
        }

        // CANCELAR EXCLUSÃO
        if (customId === "cancelar_exclusao") {
            return interaction.update({
                embeds: [new EmbedBuilder().setDescription("<:ljm_x:1454957350250217474> Exclusão cancelada.").setColor("Red")],
                components: []
            });
        }

        // EXCLUIR BOT
        if (customId.startsWith("confirmar_excluir_bot_")) {
            const id = Number(customId.split("_").pop());
            const produto = await Produto.findOne({ produtoId: id });
            if (!produto) return interaction.reply({ content: "<:ljm_x:1454957350250217474> Bot não encontrado.", flags: 64 });

            await Produto.deleteOne({ produtoId: id });
            await logSystem(client, {
                title: "🧨 Bot Excluído",
                color: "Red",
                nome: produto.nome,
                id: produto.produtoId,
                autor: interaction.user.tag
            });

            return interaction.update({
                embeds: [new EmbedBuilder().setDescription("<:checkmark_IDS:1456900169508585494> Bot excluído com sucesso!").setColor("Green")],
                components: []
            });
        }

        // EXCLUIR DESIGN
        if (customId.startsWith("confirmar_excluir_design_")) {
            const id = Number(customId.split("_").pop());
            const produto = await Produto_Design.findOne({ produtoId: id });
            if (!produto) return interaction.reply({ content: "<:ljm_x:1454957350250217474> Design não encontrado.", flags: 64 });

            await Produto_Design.deleteOne({ produtoId: id });
            await logSystem(client, {
                title: "🧨 Design Excluído",
                color: "Red",
                nome: produto.nome,
                id: produto.produtoId,
                autor: interaction.user.tag
            });

            return interaction.update({
                embeds: [new EmbedBuilder().setDescription("<:checkmark_IDS:1456900169508585494> Design excluído com sucesso!").setColor("Green")],
                components: []
            });
        }
    }
});
