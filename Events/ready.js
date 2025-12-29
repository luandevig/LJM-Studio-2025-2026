const client = require('..');
const chalk = require('chalk');
const ms = require('ms');
const mongoose = require("mongoose");
const { Events } = require("discord.js");

client.on(Events.ClientReady, async () => {

    try {
        await mongoose.connect(process.env.MONGO_DB);
        console.log(chalk.green("🟢 MongoDB conectado com sucesso"));
    } catch (err) {
        console.log(chalk.red("🔴 Erro ao conectar no MongoDB"));
        console.error(err);
    }

    const { user, ws } = client;

    setInterval(() => {
        user.setActivity({ name: `Ping Atual: ${ws.ping} ms` });
    }, ms("5s"));

    console.log(chalk.red(`${client.user.username} online!`));
});
