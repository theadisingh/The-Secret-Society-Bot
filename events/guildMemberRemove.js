const chalk = require("chalk");

module.exports = async (bot, member) => {
	console.log(
		chalk`\n{cyanBright [INFO] ${member.user.username} has left the Server!}`
	);

	bot.channels.cache.get(bot.config.IDs.welcomeChannelId).send({
		content: `**${member.user.username}** has left ${bot.config.serverName}. `,
	});
};
