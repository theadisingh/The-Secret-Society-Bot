const chalk = require("chalk");
const {
	EmbedBuilder,
	ActionRowBuilder,
	ButtonBuilder,
	SelectMenuBuilder,
	ButtonStyle,
} = require("discord.js");

module.exports = async (bot) => {
	console.log(`~~~~~ THE SECRET SOCIETY BOT ONLINE ~~~~~`);
	console.log("\n--------------------------------\n");
	console.log(
		chalk`Current Bot Settings::\n* The bot will {redBright ${
			!bot.config.presenceUpdate.createRoles ? "NOT" : ""
		}} create Game-Roles, if they don't exist already.`
	);
	if (bot.config.presenceUpdate.ignoreUnverifiedActivities)
		console.log(
			chalk`* The bot will {greenBright ignore all activities} that are not verified.\n`
		);
	else
		console.log(
			chalk`* The bot will process {redBright all activities}, regardless of wether they're verified.\n`
		);

	// Bot Status
	let botActivity = [
			`you play games 👀`,
			`some nice music 🎶`,
			`your trash comms 🗑️`,
		],
		activityType = [`WATCHING`, `PLAYING`, `LISTENING`],
		i = 0,
		j = 0;
	setInterval(
		() =>
			bot.user.setActivity(`${botActivity[i++ % botActivity.length]}`, {
				type: `${activityType[j++ % activityType.length]}`,
			}),
		120000
	);

	// Music Dashboard
	const musicembed = new EmbedBuilder()
		.setColor(bot.config.embedColor)
		.setTitle("Music Dashboard")
		.setDescription(
			`Join a voice channel and queue songs by name or url in here`
		)
		.setImage(bot.config.music.imgURL);

	//Music Control Buttons
	const row1 = new ActionRowBuilder().addComponents(
		new ButtonBuilder()
			.setCustomId("clearPlaylist")
			.setLabel(`Clear`)
			.setStyle(ButtonStyle.Secondary)
			.setEmoji("⏏️"),
		new ButtonBuilder()
			.setCustomId("prevTrack")
			.setLabel(`Prev`)
			.setStyle(ButtonStyle.Secondary)
			.setEmoji("⏪"),
		new ButtonBuilder()
			.setCustomId("playpauseTrack")
			.setLabel(`Play/Pause`)
			.setStyle(ButtonStyle.Secondary)
			.setEmoji("⏯️"),
		new ButtonBuilder()
			.setCustomId("nextTrack")
			.setLabel(`Next`)
			.setStyle(ButtonStyle.Secondary)
			.setEmoji("⏩"),
		new ButtonBuilder()
			.setCustomId("stopTrack")
			.setLabel(`Stop`)
			.setStyle(ButtonStyle.Secondary)
			.setEmoji("⏹️")
	);
	const row2 = new ActionRowBuilder().addComponents(
		new ButtonBuilder()
			.setCustomId("shufflePlaylist")
			.setLabel(`Shuffle`)
			.setStyle(ButtonStyle.Secondary)
			.setEmoji("🔀"),
		new ButtonBuilder()
			.setCustomId("volDown")
			.setLabel(`Vol Dn`)
			.setStyle(ButtonStyle.Secondary)
			.setEmoji("🔽"),
		new ButtonBuilder()
			.setCustomId("loopPlaylist")
			.setLabel(`Loop`)
			.setStyle(ButtonStyle.Secondary)
			.setEmoji("🔁"),
		new ButtonBuilder()
			.setCustomId("volUp")
			.setLabel(`Vol Up`)
			.setStyle(ButtonStyle.Secondary)
			.setEmoji("🔼"),
		new ButtonBuilder()
			.setCustomId("saveTrack")
			.setLabel(`Save`)
			.setStyle(ButtonStyle.Secondary)
			.setEmoji("⬇️")
	);

	//Playlist Button
	const row3 = new ActionRowBuilder().addComponents(
		new SelectMenuBuilder()
			.setCustomId("PlaylistSelect")
			.setPlaceholder("Select Playlist")
			.addOptions([
				{
					label: `Aditya's Playlist`,
					description: `Playlist by Aditya Singh`,
					value: `adityaplaylist`,
				},
				{
					label: `Sushant's Playlist`,
					description: `Playlist by Sushant Johri`,
					value: `sushantplaylist`,
				},
			])
	);

	const musicChannel = bot.channels.cache.get(bot.config.IDs.musicChannelId);

	musicChannel.messages.fetch().then((results) => {
		musicChannel.bulkDelete(results);
	});
	musicChannel.send({
		content: "**Queue List:**",
		embeds: [musicembed],
		components: [row3, row1, row2],
	});
};
