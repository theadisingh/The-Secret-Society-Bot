const { MessageEmbed } = require("discord.js");

module.exports = async (bot, oldState, newState) => {
	const queue = player.getQueue(oldState.guild.id);
	const musicChannel = bot.channels.cache.get(bot.config.IDs.musicChannelId);

	const trackembed = new MessageEmbed()
		.setColor(bot.config.embedColor)
		.setTitle(`Music Dashboard`)
		.setDescription(
			`Join a voice channel and queue songs by name or url in here.`
		)
		.setImage(bot.config.music.imgURL);

	if (oldState.guild.me.voice.channel) {
		if (newState.channelId === null) {
			if (oldState.channelId === oldState.guild.me.voice.channel.id) {
				if (!(oldState.channel.members.size - 1)) {
					setTimeout(() => {
						if (!(oldState.channel.members.size - 1)) {
							if (queue) queue.destroy();

							musicChannel.messages.fetch().then((results) => {
								var lastMessage = results.last();
								lastMessage.edit({
									content: "**Queue List:**",
									embeds: [trackembed],
								});
							});

							musicChannel
								.send(`Nobody in Voice Channel, see you next time ✅`)
								.then((msg) => {
									setTimeout(() => msg.delete(), 2500);
								})
								.catch();

							oldState.guild.me.voice.disconnect();
						}
					}, 60000); // <== Change Here for leave timeout (in milliseconds)
				}
			}
		}
	}
};
