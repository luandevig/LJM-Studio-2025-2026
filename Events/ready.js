const client = require('..');
const chalk = require('chalk');
const ms = require('ms');
const mongoose = require("mongoose");
const { Events, ActivityType } = require("discord.js");

/* =========================
   LISTAS DE ATIVIDADES
========================= */

// 🎮 Jogando
const jogando = [
    "Roblox",
    "Valorant",
    "CS2",
    "Fortnite",
    "Sons of The Forest",
    "Blood Strike",
    "Assassin's Creed",
    "GTA V",
    "Red Dead Redemption 2",
    "Minecraft",
    "League of Legends"
];

// 💻 Programando (aparece como Jogando)
const programando = [
    "Visual Studio Code",
    "IntelliJ IDEA",
    "Replit",
    "Python",
    "JavaScript",
    "Java",
    "Node.js",
    "TypeScript",
    "Discord Bots"
];

// 🎧 Escutando
const escutando = [
    "The Weeknd",
    "Funk 2026 Atualizado",
    "Melhores Funks Brasileiros",
    "DJ Arana",
    "MC Pedrinho",
    "MC Ryan SP",
    "MC IG",
    "Trap Nacional",
    "Phonk",
    "Lo-fi"
];

// 📺 Assistindo
const assistindo = [
    "It: A Coisa",
    "Stranger Things",
    "TikTok",
    "Instagram",
    "YouTube",
    "Netflix",
    "Lives na Twitch"
];

// junta tudo
const atividades = [
    ...jogando.map(j => ({ name: j, type: ActivityType.Playing })),
    ...programando.map(p => ({ name: p, type: ActivityType.Playing })),
    ...escutando.map(e => ({ name: e, type: ActivityType.Listening })),
    ...assistindo.map(a => ({ name: a, type: ActivityType.Watching }))
];

let index = 0;

function atualizarStatus() {
    client.user.setPresence({
        activities: [atividades[index]],
        status: "online"
    });

    index++;
    if (index >= atividades.length) index = 0;
}

/* =========================
   READY
========================= */

client.on(Events.ClientReady, async () => {

    try {
        await mongoose.connect(process.env.MONGO_DB);
        console.log(chalk.greenBright("[Banco de Dados] • conectado com sucesso!"));
    } catch (err) {
        console.log(chalk.redBright("🔴[ERRO] • Erro ao conectar no Banco de Dados"));
        console.error(err);
    }

    // seta o primeiro status ao ligar
    atualizarStatus();

    // troca o status a cada 2 horas
    setInterval(atualizarStatus, ms("2h"));

    console.log(chalk.cyanBright(`${client.user.username} • Pronto pra uso!`));
});
