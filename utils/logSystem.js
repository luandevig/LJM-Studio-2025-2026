const { EmbedBuilder } = require("discord.js");

module.exports = async (client, dados) => {
  try {
    const channel = await client.channels.fetch(process.env.LOGS_CHANNEL_ID);
    if (!channel) return;

    const embed = new EmbedBuilder()
      .setColor(dados.color || "Blue")
      .setTitle(dados.title)
      .addFields(
        { name: "<:esstoque:1202527604410941470> Produto", value: dados.nome, inline: true },
        { name: "<:lapisl:1202532853490122763> ID", value: String(dados.id), inline: true },
        { name: "<:menu_mmy:1198033505687437482> Preço", value: dados.preco || "N/A", inline: true },
        { name: "<:quantimais:1202531709564882974> Ação por", value: dados.autor },
        { name: "<:send_dm:1202530548342456332> Data", value: `<t:${Math.floor(Date.now() / 1000)}:F>` }
      )
      .setFooter({ text: "LJM Studio • Logs" });

    await channel.send({ embeds: [embed] });

  } catch (err) {
    console.error("[🔴] ERRO AO ENVIAR LOGS:", err);
  }
};
