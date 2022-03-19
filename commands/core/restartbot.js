const { MessageEmbed } = require("discord.js");

module.exports = {
	name: "restartbot",
	aliases: [],
	showHelp: false,
	utilisation: "{prefix}restartbot",

	async execute(bot, message, args) {
		const adminembed = new MessageEmbed()
			.setColor(bot.config.embedColor)
			.setTitle("Missing Privileges")
			.setDescription(
				`Only <@${bot.config.IDs.creatorId}> can run this command!`
			);

		const restartembed = new MessageEmbed()
			.setColor(bot.config.embedColor)
			.setTitle("Salvo Grotto")
			.setDescription(`---------- RESTARTING BOT ----------`)
			.setFooter({
				text: `Please wait for a while!`,
			})
			.setTimestamp();

		if (message.author.id != bot.config.IDs.creatorId)
			return message.channel
				.send({
					embeds: [adminembed],
				})
				.then((msg) => {
					setTimeout(() => msg.delete(), 25000);
				})
				.catch();

		message.channel
			.send({
				embeds: [restartembed],
			})
			.then((msg) => {
				setTimeout(() => msg.delete(), 2500);
				setTimeout(() => sendError(), 3000);
			})
			.catch();

		function sendError() {
			throw new Error("Restarting Bot!");
		}
	},
};
