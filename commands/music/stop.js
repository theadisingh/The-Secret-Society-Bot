const { MessageEmbed } = require("discord.js");

module.exports = {
	name: "stop",
	aliases: [""],
	utilisation: "{prefix}stop",
	voiceChannel: true,

	async execute(bot, message) {
		const queue = player.getQueue(message.guild.id);
		const musicChannel = bot.channels.cache.get(bot.config.IDs.musicChannelId);

		if (!queue || !queue.playing)
			return message.channel
				.send(`No music currently playing ${message.author}... try again ? ❌`)
				.then((msg) => {
					setTimeout(() => msg.delete(), 2500);
				})
				.catch();

		queue.destroy();

		const trackembed = new MessageEmbed()
			.setColor(bot.config.embedColor)
			.setTitle(`Music Dashboard`)
			.setDescription(
				`Join a voice channel and queue songs by name or url in here.`
			)
			.setImage(bot.config.music.imgURL);

		musicChannel.messages.fetch().then((results) => {
			var lastMessage = results.last();
			lastMessage.edit({
				content: "**Queue List:**",
				embeds: [trackembed],
			});
		});

		message.channel
			.send(`Music stopped into this server, see you next time ✅`)
			.then((msg) => {
				setTimeout(() => msg.delete(), 2500);
			})
			.catch();
	},
};
