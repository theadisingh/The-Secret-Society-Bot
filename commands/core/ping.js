const { EmbedBuilder } = require("discord.js");

module.exports = {
	name: "ping",
	aliases: [],
	utilisation: "{prefix}ping",

	async execute(bot, message) {
		const embed = new EmbedBuilder()
			.setColor(bot.config.embedColor)
			.setTitle("Ping")
			.setDescription(
				`Last Connection to Illuminati was **${bot.ws.ping}ms** ago! 🧿`
			)
			.setFooter({
				text: `Requested By: ${message.author.username}`,
			})
			.setTimestamp();
		message.channel
			.send({
				embeds: [embed],
			})
			.then((msg) => {
				setTimeout(() => msg.delete(), 10000);
			})
			.catch();
	},
};
