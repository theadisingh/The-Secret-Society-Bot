const { QueryType } = require("discord-player");
const { MessageEmbed } = require("discord.js");

module.exports = async (bot, interaction) => {
	const musicChannel = bot.channels.cache.get(bot.config.IDs.musicChannelId);

	if (interaction.isSelectMenu()) {
		// Check if user in voice channel
		if (!interaction.member.voice.channel)
			return interaction
				.reply(
					`You're not in a voice channel ${interaction.user}... try again ? ❌`
				)
				.then(() => {
					setTimeout(() => interaction.deleteReply(), 2500);
				})
				.catch();
		// Check if command user in same voice channel
		if (
			interaction.guild.me.voice.channel &&
			interaction.member.voice.channel !== interaction.guild.me.voice.channel
		)
			return interaction
				.reply(
					`You are not in the same voice channel ${interaction.user}... try again ? ❌`
				)
				.then(() => {
					setTimeout(() => interaction.deleteReply(), 2500);
				})
				.catch();

		if (interaction.customId === "PlaylistSelect") {
			let selplaylist = "";

			if (interaction.values[0] === "adityaplaylist")
				selplaylist = bot.config.music.adityaPlaylist;
			else if (interaction.values[0] === "sushantplaylist")
				selplaylist = bot.config.music.adityaPlaylist;

			const res = await player.search(selplaylist, {
				requestedBy: interaction.member,
				searchEngine: QueryType.AUTO,
			});

			const queue = await player.createQueue(interaction.guild, {
				//initialVolume: 25,
				leaveOnEnd: false,
				leaveOnStop: false,
				metadata: interaction.channel,
			});

			// Check if command user in voice channel
			if (!interaction.member.voice.channel)
				return interaction
					.reply(
						`You're not in a voice channel ${interaction.user}... try again ? ❌`
					)
					.then(() => {
						setTimeout(() => interaction.deleteReply(), 2500);
					})
					.catch();
			// Check if command user in same voice channel
			if (
				interaction.guild.me.voice.channel &&
				interaction.member.voice.channel !== interaction.guild.me.voice.channel
			)
				return interaction
					.reply(
						`You are not in the same voice channel ${interaction.user}... try again ? ❌`
					)
					.then(() => {
						setTimeout(() => interaction.deleteReply(), 2500);
					})
					.catch();

			// Queue Song
			try {
				if (!queue.connection) {
					await interaction.deferReply();
					await queue.connect(interaction.member.voice.channel);
				} else {
					await interaction.deferReply();
				}
			} catch {
				await player.deleteQueue(interaction.guild.id);
				return interaction
					.reply(
						`I can't join the voice channel ${interaction.user}... try again ? ❌`
					)
					.then(() => {
						setTimeout(() => interaction.deleteReply(), 2500);
					})
					.catch();
			}

			queue.addTracks(res.tracks);

			// Auto Shuffle
			if (bot.config.music.autoShuffle) queue.shuffle();

			await interaction
				.editReply(`Loading your playlist... 🎧`)
				.then(() => {
					setTimeout(() => interaction.deleteReply(), 2500);
				})
				.catch();

			if (!queue.playing) await queue.play();
			else {
				const tracks = queue.tracks.map(
					(track, i) =>
						`**${i + 1}** - ${track.title} | ${track.author} (Requested By : ${
							track.requestedBy.username
						})`
				);
				const songs = queue.tracks.length;
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
			}
		}
	}

	if (interaction.isButton()) {
		// Check if user in voice channel
		if (!interaction.member.voice.channel)
			return interaction
				.reply(
					`You're not in a voice channel ${interaction.user}... try again ? ❌`
				)
				.then(() => {
					setTimeout(() => interaction.deleteReply(), 2500);
				})
				.catch();
		// Check if command user in same voice channel
		if (
			interaction.guild.me.voice.channel &&
			interaction.member.voice.channel !== interaction.guild.me.voice.channel
		)
			return interaction
				.reply(
					`You are not in the same voice channel ${interaction.user}... try again ? ❌`
				)
				.then(() => {
					setTimeout(() => interaction.deleteReply(), 2500);
				})
				.catch();

		if (interaction.customId === "clearPlaylist") {
			const command = "clear";
			const cmd =
				bot.commands.get(command) ||
				bot.commands.find(
					(cmd) => cmd.aliases && cmd.aliases.includes(command)
				);

			if (cmd) {
				interaction
					.reply(`Clearing Queue ... 🧹`)
					.then(() => {
						setTimeout(() => interaction.deleteReply(), 2500);
					})
					.catch();
				cmd.execute(bot, interaction.message);
			}
		}
		if (interaction.customId === "prevTrack") {
			const command = "previous";
			const cmd =
				bot.commands.get(command) ||
				bot.commands.find(
					(cmd) => cmd.aliases && cmd.aliases.includes(command)
				);

			if (cmd) {
				interaction
					.reply(`Loading Previous Track ... ⏮️`)
					.then(() => {
						setTimeout(() => interaction.deleteReply(), 2500);
					})
					.catch();
				cmd.execute(bot, interaction.message);
			}
		}
		if (interaction.customId === "playpauseTrack") {
			const queue = player.getQueue(interaction.message.guild.id);

			if (!queue)
				return interaction
					.reply(`No Music is Queued ... try again ? ❌`)
					.then(() => {
						setTimeout(() => interaction.deleteReply(), 2500);
					})
					.catch();

			console.log();

			if (!queue.connection.paused) {
				const command = "pause";
				const cmd =
					bot.commands.get(command) ||
					bot.commands.find(
						(cmd) => cmd.aliases && cmd.aliases.includes(command)
					);
				if (cmd) {
					interaction
						.reply(`Pausing Queue ... ⏸️`)
						.then(() => {
							setTimeout(() => interaction.deleteReply(), 2500);
						})
						.catch();
					cmd.execute(bot, interaction.message);
				}
			} else {
				const command = "resume";
				const cmd =
					bot.commands.get(command) ||
					bot.commands.find(
						(cmd) => cmd.aliases && cmd.aliases.includes(command)
					);
				if (cmd) {
					interaction
						.reply(`Resuming Queue ... ▶️`)
						.then(() => {
							setTimeout(() => interaction.deleteReply(), 2500);
						})
						.catch();
					cmd.execute(bot, interaction.message);
				}
			}
		}
		if (interaction.customId === "nextTrack") {
			const command = "next";
			const cmd =
				bot.commands.get(command) ||
				bot.commands.find(
					(cmd) => cmd.aliases && cmd.aliases.includes(command)
				);

			if (cmd) {
				interaction
					.reply(`Loading Next Track ... ⏭️`)
					.then(() => {
						setTimeout(() => interaction.deleteReply(), 2500);
					})
					.catch();
				cmd.execute(bot, interaction.message);
			}
		}
		if (interaction.customId === "stopTrack") {
			const command = "stop";
			const cmd =
				bot.commands.get(command) ||
				bot.commands.find(
					(cmd) => cmd.aliases && cmd.aliases.includes(command)
				);

			if (cmd) {
				interaction
					.reply(`Stopping Music ... ⛔`)
					.then(() => {
						setTimeout(() => interaction.deleteReply(), 2500);
					})
					.catch();
				cmd.execute(bot, interaction.message);
			}
		}
		if (interaction.customId === "shufflePlaylist") {
			const command = "shuffle";
			const cmd =
				bot.commands.get(command) ||
				bot.commands.find(
					(cmd) => cmd.aliases && cmd.aliases.includes(command)
				);

			if (cmd) {
				interaction
					.reply(`Shuffling Queue ... 🔀`)
					.then(() => {
						setTimeout(() => interaction.deleteReply(), 2500);
					})
					.catch();
				cmd.execute(bot, interaction.message);
			}
		}
		if (interaction.customId === "volDown") {
			const command = "volume";
			const cmd =
				bot.commands.get(command) ||
				bot.commands.find(
					(cmd) => cmd.aliases && cmd.aliases.includes(command)
				);
			const queue = player.getQueue(interaction.message.guild.id);
			const curVol = queue.volume;
			const newVol = curVol - 10;
			if (cmd) {
				interaction
					.reply(`Decreasing Volume ... 🔉`)
					.then(() => {
						setTimeout(() => interaction.deleteReply(), 2500);
					})
					.catch();
				cmd.execute(bot, interaction.message, [newVol]);
			}
		}
		if (interaction.customId === "loopPlaylist") {
			const command = "loop";
			const args = ["queue"];
			const cmd =
				bot.commands.get(command) ||
				bot.commands.find(
					(cmd) => cmd.aliases && cmd.aliases.includes(command)
				);

			if (cmd) {
				interaction
					.reply(`Looping Queue ... 🔁`)
					.then(() => {
						setTimeout(() => interaction.deleteReply(), 2500);
					})
					.catch();
				cmd.execute(bot, interaction.message, args);
			}
		}
		if (interaction.customId === "volUp") {
			const command = "volume";
			const cmd =
				bot.commands.get(command) ||
				bot.commands.find(
					(cmd) => cmd.aliases && cmd.aliases.includes(command)
				);
			const queue = player.getQueue(interaction.message.guild.id);
			const curVol = queue.volume;
			const newVol = curVol + 10;
			if (cmd) {
				interaction
					.reply(`Increasing Volume ... 🔊`)
					.then(() => {
						setTimeout(() => interaction.deleteReply(), 2500);
					})
					.catch();
				cmd.execute(bot, interaction.message, [newVol]);
			}
		}
		if (interaction.customId === "saveTrack") {
			const queue = player.getQueue(interaction.message.guild.id);

			if (!queue || !queue.playing)
				return interaction
					.reply(`No music currently playing ... try again ? ❌`)
					.then(() => {
						setTimeout(() => interaction.deleteReply(), 2500);
					})
					.catch();

			const songembed = new MessageEmbed()
				.setColor("RED")
				.setTitle(`${queue.current.title}`)
				.setDescription(
					`**Artist:** ${queue.current.author}\n${queue.current.url}`
				)
				.setThumbnail(queue.current.thumbnail)
				.setFooter({
					text: `${interaction.message.guild.name}`,
				})
				.setTimestamp();

			interaction
				.reply(`DMing the Song! ... 📤`)
				.then(() => {
					setTimeout(() => interaction.deleteReply(), 2500);
				})
				.catch();

			interaction.user.send({
				embeds: [songembed],
			});
		}
	}
};
