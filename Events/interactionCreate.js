const { EmbedBuilder, PermissionsBitField } = require('discord.js');
const client = require('..');

process.on('unhandRejection', (reason, promise) => {
	console.log(`🚨 | [Erro]\n\n` + reason, promise);
  });
  process.on('uncaughtException', (error, origin) => {
	console.log(`🚨 | [Erro]\n\n` + error, origin);
  });
  process.on('uncaughtExceptionMonitor', (error, origin) => {
	console.log(`🚨 | [Erro]\n\n` + error, origin);
  });

client.on('interactionCreate', async interaction => {
	const slashCommand = client.slashCommands.get(interaction.commandName);
	if (interaction.type == 4) {
		if (slashCommand.autocomplete) {
			const choices = [];
			await slashCommand.autocomplete(interaction, choices)
		}
	}
	if (!interaction.type == 2) return;
	if (!interaction.guild) return;
	if (!slashCommand) return client.slashCommands.delete(interaction.commandName);
	try {
		if (slashCommand.userPerms || slashCommand.botPerms) {
			if (!interaction.memberPermissions.has(PermissionsBitField.resolve(slashCommand.userPerms || []))) {
				const userPerms = new EmbedBuilder()
					.setDescription(`Você não possui a permissão \`${slashCommand.userPerms}\``)
					.setColor('Red')
				return interaction.reply({ embeds: [userPerms], ephemeral: true })
			}
			if (!interaction.guild.members.cache.get(client.user.id).permissions.has(PermissionsBitField.resolve(slashCommand.botPerms || []))) {
				const botPerms = new EmbedBuilder()
					.setDescription(`Eu não possuo a permissão \`${slashCommand.botPerms}\``)
					.setColor('Red')
				return interaction.reply({ embeds: [botPerms], ephemeral: true })
			}

		}
		if (slashCommand.ownerOnly) {
			if (!process.env.OWNER.includes(interaction.user.id)) {

				return interaction.reply({
					content: `Apenas meu dono pode executar esse comando!`,
					ephemeral: true
				});
			}
		}
		await slashCommand.run(client, interaction);
	} catch (error) {
		console.log(error);
	}
});




const Produto = require("../models/CadastroBOT");
const Produto_Design = require("../models/CadastroDESIGN")

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isModalSubmit()) return;
    if (interaction.customId !== "modal_cadastrar_produto") return;

    const produtoId = Number(interaction.fields.getTextInputValue("produtoId"));

    // Validação básica
    if (isNaN(produtoId)) {
        return interaction.reply({
            content: "❌ O ID do produto precisa ser um número válido.",
            ephemeral: true
        });
    }

    // Verificar se o ID já existe
    const produtoExistente = await Produto.findOne({ produtoId });

    if (produtoExistente) {
        return interaction.reply({
            content: "❌ Já existe um bot cadastrado com esse ID.\n💡 Escolha outro ID para continuar.",
            ephemeral: true
        });
    }

    const produto = {
        nome: interaction.fields.getTextInputValue("nome"),
        produtoId,
        descricao: interaction.fields.getTextInputValue("descricao"),
        preco: Number(interaction.fields.getTextInputValue("preco")),
        imagem: interaction.fields.getTextInputValue("imagem") || null
    };

    await Produto.create(produto);

    interaction.reply({
        content: "✅ **Bot cadastrado com sucesso!**",
        ephemeral: true
    });
});


client.on("interactionCreate", async (interaction) => {
    if (!interaction.isModalSubmit()) return;
    if (interaction.customId !== "modal_cadastrar_design") return;

	    const produtoId = Number(interaction.fields.getTextInputValue("produtoId_design"));

    // Validação básica
    if (isNaN(produtoId)) {
        return interaction.reply({
            content: "❌ O ID do produto precisa ser um número válido.",
            ephemeral: true
        });
    }

    // Verificar se o ID já existe
    const produtoExistente_d = await Produto_Design.findOne({ produtoId });

    if (produtoExistente_d) {
        return interaction.reply({
            content: "❌ Já existe um bot cadastrado com esse ID.\n💡 Escolha outro ID para continuar.",
            ephemeral: true
        });
    }

    const produto_d = {
        nome: interaction.fields.getTextInputValue("nome_design"),
        produtoId: Number(interaction.fields.getTextInputValue("produtoId_design")),
        descricao: interaction.fields.getTextInputValue("descricao_design"),
        preco: Number(interaction.fields.getTextInputValue("preco_design")),
        imagem: interaction.fields.getTextInputValue("imagem_exemplo") || null
    };

    await Produto_Design.create(produto_d);

    interaction.reply({
        content: "✅ Produto cadastrado com sucesso!",
        ephemeral: true
    });
});
