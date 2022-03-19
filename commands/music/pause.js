module.exports = {
	name: "pause",
	aliases: [],
	utilisation: "{prefix}pause",
	voiceChannel: true,

	async execute(bot, message) {
		const queue = player.getQueue(message.guild.id);

		if (!queue)
			return message.channel
				.send(`No music currently playing ${message.author}... try again ? ❌`)
				.then((msg) => {
					setTimeout(() => msg.delete(), 2500);
				})
				.catch();

		const success = queue.setPaused(true);

		return message.channel
			.send(
				success
					? `Current music ${queue.current.title} paused ✅`
					: `Something went wrong ${message.author}... try again ? ❌`
			)
			.then((msg) => {
				setTimeout(() => msg.delete(), 2500);
			})
			.catch();
	},
};
