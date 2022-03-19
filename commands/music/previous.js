module.exports = {
	name: "previous",
	aliases: ["prev"],
	utilisation: "{prefix}previous",
	voiceChannel: true,

	async execute(bot, message) {
		const queue = player.getQueue(message.guild.id);

		if (!queue || !queue.playing)
			return message.channel
				.send(`No music currently playing ${message.author}... try again ? ❌`)
				.then((msg) => {
					setTimeout(() => msg.delete(), 2500);
				})
				.catch();

		if (!queue.previousTracks[1])
			return message.channel
				.send(
					`There was no music played before ${message.author}... try again ? ❌`
				)
				.then((msg) => {
					setTimeout(() => msg.delete(), 2500);
				})
				.catch();

		await queue.back();

		message.channel
			.send(`Playing the **previous** track ✅`)
			.then((msg) => {
				setTimeout(() => msg.delete(), 2500);
			})
			.catch();
	},
};
