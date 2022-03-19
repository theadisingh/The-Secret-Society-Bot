const { MessageEmbed } = require("discord.js");

module.exports = {
	name: "help",
	aliases: ["h"],
	showHelp: true,
	utilisation: "{prefix}help",

	async execute(bot, message, args) {
		const commands = bot.commands.filter((x) => x.showHelp !== false);
		const prefix = bot.config.prefix;
		const listitems = commands
			.map(
				(x) =>
					`\`${x.name}${
						x.aliases[0] ? ` (${x.aliases.map((y) => y).join(", ")})\`` : "`"
					}`
			)
			.join(" | ");
		const embed = new MessageEmbed()
			.setColor(bot.config.embedColor)
			.setTitle("Help")
			.addFields(
				{
					name: "Bot Prefix",
					value: `\`${prefix}\``,
				},
				{
					name: "Commands Available",
					value: `${listitems}`,
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
