// Imports
//const discord = require("discord.js");
const { Client, GatewayIntentBits } = require("discord.js");
const chalk = require("chalk");
const { Player } = require("discord-player");
require("dotenv").config();

// Bot Intents
global.bot = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildVoiceStates,
		GatewayIntentBits.GuildPresences,
		GatewayIntentBits.GuildIntegrations,
		GatewayIntentBits.GuildMessageReactions,
		GatewayIntentBits.MessageContent,
	],
	partials: ["MESSAGE", "CHANNEL", "REACTION"],
	disableMentions: "everyone",
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

bot.login(process.env.TOKEN).catch((reason) => {
	console.log(chalk`{redBright [LOGIN-ERROR]} Code: {grey ${reason.code}}`);
	if (reason.code == "DISALLOWED_INTENTS") {
		console.log(chalk.red("\nPlease Enable Intents\n"));
	}

	if (reason.code == "TOKEN_INVALID") {
		console.log(chalk.red("\n!! Invalid Token !!\n"));
	}
});
