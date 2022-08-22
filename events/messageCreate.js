module.exports = async (bot, message) => {
	if (message.author.bot || message.channel.type === "dm") return;

	const prefix = bot.config.prefix;
	const musicChannel = bot.channels.cache.get(bot.config.IDs.musicChannelId);
	const DJ = bot.config.music.DJ;
	const args = message.content.slice(prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();
	const cmd =
		bot.commands.get(command) ||
		bot.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(command));

	if (message.content.indexOf(prefix) !== 0 && message.channel === musicChannel)
		return message.delete();

	if (message.content.indexOf(prefix) !== 0) return;

	if (cmd && DJ.enabled && DJ.commands.includes(cmd.name)) {
		const roleDJ = message.guild.roles.cache.find(
			(x) => x.name === DJ.roleName
		);

		if (!message.member._roles.includes(roleDJ.id)) {
			return message.channel
				.send(
					`This command is reserved for members with the DJ role on the server ${message.author}... try again ? ❌`
				)
				.then((msg) => {
					message.delete();
					setTimeout(() => msg.delete(), 10000);
				})
				.catch();
		}
	}

	if (cmd && cmd.voiceChannel) {
		if (!message.member.voice.channel)
			return message.channel
				.send(
					`You're not in a voice channel ${message.author}... try again ? ❌`
				)
				.then((msg) => {
					message.delete();
					setTimeout(() => msg.delete(), 10000);
				})
				.catch();

		if (
			message.guild.members.me.voice.channel &&
			message.member.voice.channel.id !==
				message.guild.members.me.voice.channel.id
		)
			return message.channel
				.send(
					`You are not in the same voice channel ${message.author}... try again ? ❌`
				)
				.then((msg) => {
					message.delete();
					setTimeout(() => msg.delete(), 10000);
				})
				.catch();
	}

	if (message.content.indexOf(prefix) == 0 && !cmd)
		return message.channel
			.send(`No such command! ${message.author}... try again ? ❌`)
			.then((msg) => {
				message.delete();
				setTimeout(() => msg.delete(), 10000);
			})
			.catch();

	if (cmd) {
		message.delete();
		cmd.execute(bot, message, args);
	}
};
