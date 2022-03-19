module.exports = {
	name: "next",
	aliases: ["nxt"],
	utilisation: "{prefix}skip",
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

		const success = queue.skip();

		return message.channel
			.send(
				success
					? `Current music ${queue.current.title} skipped ✅`
					: `Something went wrong ${message.author}... try again ? ❌`
			)
			.then((msg) => {
				setTimeout(() => msg.delete(), 2500);
			})
			.catch();
	},
};
