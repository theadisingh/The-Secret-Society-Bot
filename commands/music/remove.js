const { EmbedBuilder } = require("discord.js");

module.exports = {
	name: "remove",
	aliases: ["rm"],
	utilisation: "{prefix}remove [tracknumber]",
	voiceChannel: true,

	async execute(bot, message, args) {
		const queue = player.getQueue(message.guild.id);
		const musicChannel = bot.channels.cache.get(bot.config.IDs.musicChannelId);
		const num = args[0] - 1;

		if (!queue || !queue.playing)
			return message.channel
				.send(`No music currently playing ${message.author}... try again ? ❌`)
				.then((msg) => {
					setTimeout(() => msg.delete(), 2500);
				})
				.catch();

		if (isNaN(args[0]))
			return message.channel
				.send(
					`Please enter a valid track number ${message.author}... try again ? ❌`
				)
				.then((msg) => {
					setTimeout(() => msg.delete(), 2500);
				})
				.catch();

		if (!queue.tracks[num])
			return message.channel
				.send(
					`Please enter a valid track number ${message.author}... try again ? ❌`
				)
				.then((msg) => {
					setTimeout(() => msg.delete(), 2500);
				})
				.catch();

		const song = queue.tracks[num];
		const success = queue.remove(num);
		const tracks = queue.tracks.map(
			(track, i) =>
				`**${i + 1}. ${track.title} - ${track.author}** \`(Requested By : ${
					track.requestedBy.username
				}\`)`
		);
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
				content: `**Queue List:**\n${tracks.slice(0, 5).join("\n")}`,
				embeds: [trackembed],
			});
		});

		return message.channel
			.send(
				success
					? `${song} removed from Queue ✅`
					: `Something went wrong ${message.author}... try again ? ❌`
			)
			.then((msg) => {
				setTimeout(() => msg.delete(), 2500);
			})
			.catch();
	},
};
