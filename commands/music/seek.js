const ms = require("ms");

module.exports = {
	name: "seek",
	aliases: [],
	utilisation: "{prefix}seek [time]",
	voiceChannel: true,

	async execute(bot, message, args) {
		const queue = player.getQueue(message.guild.id);

		if (!queue || !queue.playing)
			return message.channel
				.send(`No music currently playing ${message.author}... try again ? ❌`)
				.then((msg) => {
					setTimeout(() => msg.delete(), 2500);
				})
				.catch();

		const tym = parseInt(args.join(" "));
		const timeToMs = tym * 1000;

		if (timeToMs >= queue.current.durationMS)
			return message.channel
				.send(
					`The indicated time is higher than the total time of the current song ${message.author}... try again ?`
				)
				.then((msg) => {
					setTimeout(() => msg.delete(), 2500);
				})
				.catch();

		if (timeToMs) await queue.seek(timeToMs);

		message.channel
			.send(
				`Time set on the current song **${ms(timeToMs, { long: true })}** ✅`
			)
			.then((msg) => {
				setTimeout(() => msg.delete(), 2500);
			})
			.catch();
	},
};
