const { QueryType } = require("discord-player");

module.exports = {
	name: "play",
	aliases: ["p"],
	utilisation: "{prefix}play [song name/URL]",
	voiceChannel: true,

	async execute(bot, message, args) {
		if (!args[0])
			return message.channel
				.send(`Please enter a valid search ${message.author}... try again ? ❌`)
				.then((msg) => {
					setTimeout(() => msg.delete(), 2500);
				})
				.catch();

		const res = await player.search(args.join(" "), {
			requestedBy: message.member,
			searchEngine: QueryType.AUTO,
		});

		if (!res || !res.tracks.length)
			return message.channel
				.send(`No results found ${message.author}... try again ? ❌`)
				.then((msg) => {
					setTimeout(() => msg.delete(), 2500);
				})
				.catch();

		const queue = await player.createQueue(message.guild, {
			spotifyBridge: bot.config.music.spotifyBridge,
			initialVolume: bot.config.music.initialVol,
			leaveOnEnd: false,
			leaveOnStop: false,
			metadata: message.channel,
		});

		try {
			if (!queue.connection) await queue.connect(message.member.voice.channel);
		} catch {
			await player.deleteQueue(message.guild.id);
			return message.channel
				.send(
					`I can't join the voice channel ${message.author}... try again ? ❌`
				)
				.then((msg) => {
					setTimeout(() => msg.delete(), 2500);
				})
				.catch();
		}

		await message.channel
			.send(`Loading your ${res.playlist ? "playlist" : "track"}... 🎧`)
			.then((msg) => {
				setTimeout(() => msg.delete(), 2500);
			})
			.catch();

		res.playlist ? queue.addTracks(res.tracks) : queue.addTrack(res.tracks[0]);

		//Auto Shuffle Playlist
		if (bot.config.music.autoShuffle && res.playlist) queue.shuffle();

		if (!queue.playing) await queue.play();
	},
};
