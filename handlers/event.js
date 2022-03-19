const { MessageEmbed } = require("discord.js");

player.on("error", async (queue, error) => {
	const musicChannel = bot.channels.cache.get(bot.config.IDs.musicChannelId);
	const restartembed = new MessageEmbed()
		.setColor(bot.config.embedColor)
		.setTitle("Oops! The Bot ran into some error!")
		.setDescription(`'🔃---------- RESTARTING BOT ----------🔃`)
		.setFooter({
			text: `This should take around 10 seconds! Please wait...`,
		});

	musicChannel
		.send({
			embeds: [restartembed],
		})
		.then((msg) => {
			setTimeout(() => sendError(), 1000);
		})
		.catch();

	function sendError() {
		throw new Error("Music Player Error, Restarting Bot!");
	}
});

player.on("connectionError", async (queue, error) => {
	const musicChannel = bot.channels.cache.get(bot.config.IDs.musicChannelId);
	const restartembed = new MessageEmbed()
		.setColor(bot.config.embedColor)
		.setTitle("Oops! The Bot ran into some error!")
		.setDescription(`'🔃---------- RESTARTING BOT ----------🔃`)
		.setFooter({
			text: `This should take around 10 seconds! Please wait...`,
		});

	musicChannel
		.send({
			embeds: [restartembed],
		})
		.then((msg) => {
			setTimeout(() => sendError(), 1000);
		})
		.catch();

	function sendError() {
		throw new Error("Music Player Error, Restarting Bot!");
	}
});

player.on("trackStart", async (queue, track) => {
	if (!bot.config.music.loopmessage && queue.repeatMode !== 0) return;

	const tracks = queue.tracks.map(
		(track, i) =>
			`**${i + 1}. ${track.title} - ${track.author}** \`(Requested By : ${
				track.requestedBy.username
			}\`)`
	);
	const songs = queue.tracks.length;
	const musicChannel = bot.channels.cache.get(bot.config.IDs.musicChannelId);
	const methods = ["Disabled", "Track", "Queue"];
	const timestamp = queue.getPlayerTimestamp();
	const trackDuration =
		timestamp.progress == "Infinity" ? "infinity (live)" : track.duration;
	const songThumbnail = track.thumbnail + "?width=960&height=540";

	const trackembed = new MessageEmbed()
		.setColor(bot.config.embedColor)
		.setTitle(`<a:dashboard_equalizer:953273798776475649> ${track.title}`)
		.setDescription(
			`**Artist:** ${track.author}\n**Duration:** ${trackDuration}\n**Requested by:** ${track.requestedBy.username}`
		)
		.setThumbnail(bot.config.music.imgURL)
		.setImage(songThumbnail)
		.setFooter({
			text: `${songs} Songs in Queue | Loop: ${
				methods[queue.repeatMode]
			} | DJ Mode: ${
				bot.config.music.DJ.enabled ? `Enabled` : `Disabled`
			} | Volume: ${queue.volume}`,
		});

	musicChannel.messages.fetch().then((results) => {
		var lastMessage = results.last();
		lastMessage.edit({
			content: `**Queue List:**\n${tracks.slice(0, 5).join("\n")}`,
			embeds: [trackembed],
		});
	});
});

player.on("trackAdd", async (queue, track) => {
	const tracks = queue.tracks.map(
		(track, i) =>
			`**${i + 1}. ${track.title} - ${track.author}** \`(Requested By : ${
				track.requestedBy.username
			}\`)`
	);
	const songs = queue.tracks.length;
	const musicChannel = bot.channels.cache.get(bot.config.IDs.musicChannelId);
	const methods = ["Disabled", "Track", "Queue"];

	musicChannel.messages.fetch().then((results) => {
		var lastMessage = results.last();
		const trackembed = new MessageEmbed(lastMessage.embeds[0]).setFooter({
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
});

player.on("botDisconnect", async (queue) => {
	const musicChannel = bot.channels.cache.get(bot.config.IDs.musicChannelId);

	const trackembed = new MessageEmbed()
		.setColor(bot.config.embedColor)
		.setTitle(`Music Dashboard`)
		.setDescription(
			`Join a voice channel and queue songs by name or url in here.`
		)
		.setImage(bot.config.music.imgURL);

	musicChannel.messages.fetch().then((results) => {
		var lastMessage = results.last();
		lastMessage.edit({
			content: "**Queue List:**",
			embeds: [trackembed],
		});
	});
});

player.on("channelEmpty", async (queue) => {
	const musicChannel = bot.channels.cache.get(bot.config.IDs.musicChannelId);

	const trackembed = new MessageEmbed()
		.setColor(bot.config.embedColor)
		.setTitle(`Music Dashboard`)
		.setDescription(
			`Join a voice channel and queue songs by name or url in here.`
		)
		.setImage(bot.config.music.imgURL);

	musicChannel.messages.fetch().then((results) => {
		var lastMessage = results.last();
		lastMessage.edit({
			content: "**Queue List:**",
			embeds: [trackembed],
		});
	});
});

player.on("queueEnd", async (queue) => {
	const musicChannel = bot.channels.cache.get(bot.config.IDs.musicChannelId);

	const trackembed = new MessageEmbed()
		.setColor(bot.config.embedColor)
		.setTitle(`Music Dashboard`)
		.setDescription(
			`Join a voice channel and queue songs by name or url in here.`
		)
		.setImage(bot.config.music.imgURL);

	musicChannel.messages.fetch().then((results) => {
		var lastMessage = results.last();
		lastMessage.edit({
			content: "**Queue List:**",
			embeds: [trackembed],
		});
	});
});
