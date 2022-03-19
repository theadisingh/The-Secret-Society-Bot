const { MessageEmbed } = require("discord.js");
const { DiscordTogether } = require("discord-together");
const wait = require("util").promisify(setTimeout);

module.exports = {
	name: "youtube",
	aliases: ["yt"],
	utilisation: "{prefix}youtube",
	voiceChannel: true,

	async execute(bot, message) {
		bot.discordTogether = new DiscordTogether(bot);
		bot.discordTogether
			.createTogetherCode(message.member.voice.channel.id, "youtube")
			.then(async (invite) => {
				const embed = new MessageEmbed()
					.setColor(bot.config.embedColor)
					.setTitle("YouTube Watch Together")
					.setDescription(
						`Join using the below link to start watch together in the voice channel.\n**${invite.code}**`
					)
					.setThumbnail("https://i.imgur.com/Mww8KjR.png")
					.setFooter({
						text: `Requested By: ${message.author.username}`,
					})
					.setTimestamp();
				message.channel
					.send({
						embeds: [embed],
					})
					.then((msg) => {
						setTimeout(() => msg.delete(), 60000);
					})
					.catch();
			});
	},
};
