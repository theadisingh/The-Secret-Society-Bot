// Imports
const discord = require("discord.js");
const chalk = require("chalk");
const { REST } = require("@discordjs/rest");
const { Player } = require("discord-player");
require("dotenv").config();

// Bot Intents
global.bot = new discord.Client({
	intents: [
		discord.Intents.FLAGS.GUILDS,
		discord.Intents.FLAGS.GUILD_PRESENCES,
		discord.Intents.FLAGS.GUILD_MESSAGES,
		discord.Intents.FLAGS.GUILD_MEMBERS,
		discord.Intents.FLAGS.GUILD_VOICE_STATES,
		discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
	],
	partials: ["MESSAGE", "CHANNEL", "REACTION"],
});

// Music Player
global.player = new Player(bot, {
	ytdlOptions: {
		quality: "highestaudio",
		highWaterMark: 1 << 25,
		dlChunkSize: 0,
	},
});

// Some more Imports
bot.config = require("./config.json");
bot.package = require("./package.json");
require("./handlers/loader");
require("./handlers/event");

// Register Slash Commands
const rest = new REST({
	version: "9",
}).setToken(process.env.TOKEN);

bot.login(process.env.TOKEN).catch((reason) => {
	console.log(chalk`{redBright [LOGIN-ERROR]} Code: {grey ${reason.code}}`);
	if (reason.code == "DISALLOWED_INTENTS") {
		console.log(chalk.red("\nPlease Enable Intents\n"));
	}

	if (reason.code == "TOKEN_INVALID") {
		console.log(chalk.red("\n!! Invalid Token !!\n"));
	}
});
