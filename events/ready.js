const chalk = require("chalk");
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = async (bot) => {
	console.log(`~~~~~ THE SECRET SOCIETY BOT ONLINE ~~~~~`);
	console.log("\n--------------------------------\n");
	console.log(
		chalk`Current Bot Settings::\n* The bot will {redBright.bold ${
			!bot.config.presenceUpdate.createRoles ? "NOT" : ""
		}} create Game-Roles, if they don't exist already.`
	);
	if (bot.config.presenceUpdate.ignoreUnverifiedActivities)
		console.log(
			chalk`* The bot will ignore all activities that are not verified.\n`
		);
	else
		console.log(
			chalk`* The bot will process all activities, regardless of wether they're verified.\n`
		);

	// Bot Status
	bot.user.setActivity("you play games 👀", {
		type: "WATCHING",
	});

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
		new MessageButton()
			.setCustomId("playlist")
			.setLabel("Add Playlist Songs to Queue")
			.setStyle("SECONDARY")
			.setEmoji("🅿️"),
		new MessageButton()
			.setLabel("Edit Saved Playlist on YouTube")
			.setURL(bot.config.music.editPlaylist)
			.setStyle("LINK")
			.setEmoji("🛃")
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
