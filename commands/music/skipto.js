module.exports = {
	name: "skipto",
	aliases: ["skp"],
	utilisation: "{prefix}skp [tracknumber]",
	voiceChannel: true,

	async execute(bot, message, args) {
		const queue = player.getQueue(message.guild.id);
		const num = args[0] - 1;

		if (!queue || !queue.playing)
			return message.channel
				.send(`No music currently playing ${message.author}... try again ? ❌`)
				.then((msg) => {
					setTimeout(() => msg.delete(), 2500);
				})
				.catch();

		if (queue.tracks.length < 2)
			return message.channel
				.send(`No more tracks in Queue ${message.author}... try again ? ❌`)
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

		queue.jump(num);

		return message.channel
			.send(`Current music ${queue.current.title} skipped ✅`)
			.then((msg) => {
				setTimeout(() => msg.delete(), 2500);
			})
			.catch();
	},
};
