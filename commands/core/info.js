const { EmbedBuilder } = require("discord.js");
const prettyMilliseconds = require("pretty-ms");

module.exports = {
	name: "info",
	aliases: ["i"],
	utilisation: "{prefix}info",

	async execute(bot, message) {
		var gamenames = JSON.stringify(bot.config.presenceUpdate.alias, null, 4);
		const embed = new EmbedBuilder()
			.setColor(bot.config.embedColor)
			.setTitle("Bot Info")
			.setDescription(`${bot.package.description}`)
			.setThumbnail(bot.config.serverLogo)
			.addFields(
				{
					name: "Bot Version",
					value: `\`${bot.package.version}\``,
				},
				{
					name: "Bot Uptime",
					value: `\`${prettyMilliseconds(bot.uptime)}\``,
				},
				{
					name: "Activities Registered",
					value: `${gamenames}`,
				},
				{
					name: "Created By",
					value: `<@${bot.config.IDs.creatorId}>`,
				}
			)
			.setTimestamp()
			.setFooter({
				text: `Requested By: ${message.author.username}`,
			});
		message.channel
			.send({
				embeds: [embed],
			})
			.then((msg) => {
				setTimeout(() => msg.delete(), 25000);
			})
			.catch();
	},
};
