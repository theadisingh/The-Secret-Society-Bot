const { MessageEmbed } = require("discord.js");

module.exports = {
	name: "shuffle",
	aliases: ["sh", "mix"],
	utilisation: "{prefix}shuffle",
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

		await queue.shuffle();

		const tracks = queue.tracks.map(
			(track, i) =>
				`**${i + 1}. ${track.title} - ${track.author}** \`(Requested By : ${
					track.requestedBy.username
				}\`)`
		);

		musicChannel.messages.fetch().then((results) => {
			var lastMessage = results.last();
			const trackembed = new MessageEmbed(lastMessage.embeds[0]);
			lastMessage.edit({
				content: `**Queue List:**\n${tracks.slice(0, 5).join("\n")}`,
				embeds: [trackembed],
			});
		});

		return message.channel
			.send(`Queue shuffled **${queue.tracks.length}** song(s) ! ✅`)
			.then((msg) => {
				setTimeout(() => msg.delete(), 2500);
			})
			.catch();
	},
};
