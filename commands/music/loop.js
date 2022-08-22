const { QueueRepeatMode } = require("discord-player");
const { EmbedBuilder } = require("discord.js");

module.exports = {
	name: "loop",
	aliases: ["lp", "repeat"],
	utilisation: "{prefix}loop <queue>",
	voiceChannel: true,

	async execute(bot, message, args) {
		const queue = player.getQueue(message.guild.id);
		const musicChannel = bot.channels.cache.get(bot.config.IDs.musicChannelId);

		if (!queue || !queue.playing)
			return message.channel
				.send(`No music currently playing ${message.author}... try again ? ❌`)
				.then((msg) => {
					setTimeout(() => msg.delete(), 2500);
				})
				.catch();

		if (args.join("").toLowerCase() === "queue") {
			if (queue.repeatMode === 1)
				return message.channel
					.send(
						`You must first disable the current music in the loop mode (${bot.config.prefix}loop) ${message.author}... try again ? ❌`
					)
					.then((msg) => {
						setTimeout(() => msg.delete(), 2500);
					})
					.catch();

			const success = queue.setRepeatMode(
				queue.repeatMode === 0 ? QueueRepeatMode.QUEUE : QueueRepeatMode.OFF
			);

			const methods = ["Disabled", "Track", "Queue"];
			const songs = queue.tracks.length;
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
					embeds: [trackembed],
				});
			});

			return message.channel
				.send(
					success
						? `Repeat mode **${
								queue.repeatMode === 0 ? "disabled" : "enabled"
						  }**`
						: `Something went wrong ${message.author}... try again ? ❌`
				)
				.then((msg) => {
					setTimeout(() => msg.delete(), 2500);
				})
				.catch();
		} else {
			if (queue.repeatMode === 2)
				return message.channel
					.send(
						`You must first disable the current queue in the loop mode (${bot.config.prefix}loop queue) ${message.author}... try again ? ❌`
					)
					.then((msg) => {
						setTimeout(() => msg.delete(), 2500);
					})
					.catch();

			const success = queue.setRepeatMode(
				queue.repeatMode === 0 ? QueueRepeatMode.TRACK : QueueRepeatMode.OFF
			);

			const methods = ["Disabled", "Track", "Queue"];
			const songs = queue.tracks.length;
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
					embeds: [trackembed],
				});
			});

			return message.channel
				.send(
					success
						? `Repeat mode **${
								queue.repeatMode === 0 ? "disabled" : "enabled"
						  }** the current music will be repeated endlessly 🔂`
						: `Something went wrong ${message.author}... try again ? ❌`
				)
				.then((msg) => {
					setTimeout(() => msg.delete(), 2500);
				})
				.catch();
		}
	},
};
