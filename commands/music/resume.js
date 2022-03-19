module.exports = {
	name: "resume",
	aliases: ["rs"],
	utilisation: "{prefix}resume",
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

		const success = queue.setPaused(false);

		return message.channel
			.send(
				success
					? `Current music ${queue.current.title} resumed ✅`
					: `Something went wrong ${message.author}... try again ? ❌`
			)
			.then((msg) => {
				setTimeout(() => msg.delete(), 2500);
			})
			.catch();
	},
};
