const { readdirSync } = require("fs");
const { Collection } = require("discord.js");
//const chalk = require('chalk');

bot.commands = new Collection();

const events = readdirSync("./events/").filter((file) => file.endsWith(".js"));

//console.log(chalk.yellowBright(`\nLoading events...`));

for (const file of events) {
	const event = require(`../events/${file}`);
	//console.log(chalk.greenBright(`-> Loaded event ${file.split('.')[0]}`));
	bot.on(file.split(".")[0], event.bind(null, bot));
	delete require.cache[require.resolve(`../events/${file}`)];
}

//console.log(chalk.yellowBright(`\nLoading commands...`));

readdirSync("./commands/").forEach((dirs) => {
	const commands = readdirSync(`./commands/${dirs}`).filter((files) =>
		files.endsWith(".js")
	);

	for (const file of commands) {
		const command = require(`../commands/${dirs}/${file}`);
		//console.log(chalk.greenBright(`-> Loaded command ${command.name.toLowerCase()}`));
		bot.commands.set(command.name.toLowerCase(), command);
		delete require.cache[require.resolve(`../commands/${dirs}/${file}`)];
	}
});
