module.exports = async (bot, member) => {
	bot.channels.cache.get(bot.config.IDs.welcomeChannelId).send({
		content: `**${member.user.username}** has left ${bot.config.serverName}. `,
	});
};
