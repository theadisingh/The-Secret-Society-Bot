const maxVol = bot.config.music.maxVol;
const { MessageEmbed } = require("discord.js");

module.exports = {
	name: "volume",
	aliases: ["vol"],
	utilisation: `{prefix}volume [1-${maxVol}]`,
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

		const vol = parseInt(args[0]);

		if (!vol)
			return message.channel
				.send(
					`The current volume is ${queue.volume} 🔊\n*To change the volume enter a valid number between **1** and **${maxVol}**.*`
				)
				.then((msg) => {
					setTimeout(() => msg.delete(), 2500);
				})
				.catch();

		if (queue.volume === vol)
			return message.channel
				.send(
					`The volume you want to change is already the current one ${message.author}... try again ? ❌`
				)
				.then((msg) => {
					setTimeout(() => msg.delete(), 2500);
				})
				.catch();

		if (vol < 0 || vol > maxVol)
			return message.channel
				.send(
					`The specified number is not valid. Enter a number between **1** and **${maxVol}** ${message.author}... try again ? ❌`
				)
				.then((msg) => {
					setTimeout(() => msg.delete(), 2500);
				})
				.catch();

		const success = queue.setVolume(vol);

		const songs = queue.tracks.length;
		const methods = ["Disabled", "Track", "Queue"];

		musicChannel.messages.fetch().then((results) => {
			var lastMessage = results.last();
			const trackembed = new MessageEmbed(lastMessage.embeds[0]).setFooter({
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
					? `The volume has been modified to **${vol}**/**${maxVol}** 🔊`
					: `Something went wrong ${message.author}... try again ? ❌`
			)
			.then((msg) => {
				setTimeout(() => msg.delete(), 2500);
			})
			.catch();
	},
};
