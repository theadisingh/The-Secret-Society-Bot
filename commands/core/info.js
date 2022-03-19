const { MessageEmbed } = require("discord.js");

module.exports = {
	name: "info",
	aliases: ["i"],
	utilisation: "{prefix}info",

	async execute(bot, message, args) {
		var gamenames = JSON.stringify(bot.config.presenceUpdate.alias, null, 4);
		const embed = new MessageEmbed()
			.setColor(bot.config.embedColor)
			.setTitle("Bot Info")
			.setDescription(`${bot.package.description}`)
			.setThumbnail(bot.config.serverLogo)
			.addFields(
				{
					name: "Games Registered",
					value: gamenames,
				},
				{
					name: "Bot Version",
					value: `${bot.package.version}`,
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
