const chalk = require("chalk");
const {
	MessageEmbed,
	MessageActionRow,
	MessageButton,
	MessageSelectMenu,
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
	const musicembed = new MessageEmbed()
		.setColor(bot.config.embedColor)
		.setTitle("Music Dashboard")
		.setDescription(
			`Join a voice channel and queue songs by name or url in here`
		)
		.setImage(bot.config.music.imgURL);

	//Music Control Buttons
	const row1 = new MessageActionRow().addComponents(
		new MessageButton()
			.setCustomId("clearPlaylist")
			.setLabel(`Clear`)
			.setStyle("SECONDARY")
			.setEmoji("⏏️"),
		new MessageButton()
			.setCustomId("prevTrack")
			.setLabel(`Prev`)
			.setStyle("SECONDARY")
			.setEmoji("⏪"),
		new MessageButton()
			.setCustomId("playpauseTrack")
			.setLabel(`Play/Pause`)
			.setStyle("SECONDARY")
			.setEmoji("⏯️"),
		new MessageButton()
			.setCustomId("nextTrack")
			.setLabel(`Next`)
			.setStyle("SECONDARY")
			.setEmoji("⏩"),
		new MessageButton()
			.setCustomId("stopTrack")
			.setLabel(`Stop`)
			.setStyle("SECONDARY")
			.setEmoji("⏹️")
	);
	const row2 = new MessageActionRow().addComponents(
		new MessageButton()
			.setCustomId("shufflePlaylist")
			.setLabel(`Shuffle`)
			.setStyle("SECONDARY")
			.setEmoji("🔀"),
		new MessageButton()
			.setCustomId("volDown")
			.setLabel(`Vol Dn`)
			.setStyle("SECONDARY")
			.setEmoji("🔽"),
		new MessageButton()
			.setCustomId("loopPlaylist")
			.setLabel(`Loop`)
			.setStyle("SECONDARY")
			.setEmoji("🔁"),
		new MessageButton()
			.setCustomId("volUp")
			.setLabel(`Vol Up`)
			.setStyle("SECONDARY")
			.setEmoji("🔼"),
		new MessageButton()
			.setCustomId("saveTrack")
			.setLabel(`Save`)
			.setStyle("SECONDARY")
			.setEmoji("⬇️")
	);

	//Playlist Button
	const row3 = new MessageActionRow().addComponents(
		new MessageSelectMenu()
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
