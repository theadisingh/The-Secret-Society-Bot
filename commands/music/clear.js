const { EmbedBuilder } = require("discord.js");

module.exports = {
	name: "clear",
	aliases: ["clr"],
	utilisation: "{prefix}clear",
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

		if (!queue.tracks[0])
			return message.channel
				.send(
					`No music in the queue after the current one ${message.author}... try again ? ❌`
				)
				.then((msg) => {
					setTimeout(() => msg.delete(), 2500);
				})
				.catch();

		await queue.clear();

		const songs = queue.tracks.length;
		const methods = ["Disabled", "Track", "Queue"];

		musicChannel.messages.fetch().then((results) => {
			var lastMessage = results.last();
			const trackembed = new EmbedBuilder(lastMessage.embeds[0]).setFooter({
				text: `${songs} Songs in Queue | Loop: ${
					methods[queue.repeatMode]
				} | DJ Mode: ${
					bot.config.music.DJ.enabled ? `Enabled` : `Disabled`
				} | Volume: ${queue.volume}`,
			});
			lastMessage.edit({
				content: "**Queue List:**",
				embeds: [trackembed],
			});
		});

		message.channel
			.send(`The queue has just been cleared 🗑️`)
			.then((msg) => {
				setTimeout(() => msg.delete(), 2500);
			})
			.catch();
	},
};
