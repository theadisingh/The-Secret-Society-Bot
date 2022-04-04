const chalk = require("chalk");

async function pickRole(guild, name, ass = true) {
	var desiredRolename = bot.config.presenceUpdate.alias[name] || name;

	await guild.roles.fetch();
	var role = guild.roles.cache.find((x) => {
		return x.name === desiredRolename && x.editable; //find role by name
	});

	if (role == null) {
		// create role
		if (!bot.config.presenceUpdate.createRoles) {
			console.log(
				chalk`      {yellow x role} {grey "${desiredRolename}" (Create Role Disabled - Security Setting)}\n`
			);
			return null;
		}
		console.log(
			chalk`      {greenBright + creating role} {grey "${desiredRolename}"}\n`
		);
		role = await guild.roles.create({
			name: desiredRolename,
			color: "DEFAULT",
			reason: "Game Activity Detected",
		});
	} else {
		if (ass)
			console.log(
				chalk`     {greenBright + role} {grey "${desiredRolename}"}\n`
			);
		else console.log(chalk`     {red - role} {grey "${desiredRolename}"}\n`);
	}

	return role;
}

module.exports = async (bot, prev, now) => {
	console.log(
		chalk`\n{blueBright [ACTY] ${
			now.user.username + "#" + now.user.discriminator
		}} is now playing {yellow ${now.activities.map(
			(activity) => activity.name
		)}} {grey (${
			now.activities.length
		})} {grey [${new Date().toLocaleString()}]}`
	);

	if (now.member.roles.cache.has(bot.config.presenceUpdate.ignoreRoleId)) {
		console.log(
			chalk`     {yellow x role} {grey "${desiredRolename}" (Member Ignored - Security Setting)}\n`
		);
		return;
	}

	if (prev) {
		var prevAct = bot.config.presenceUpdate.ignoreUnverifiedActivities
			? prev.activities.filter((act) => act.applicationId != null)
			: prev.activities;
		var prevName = prevAct.map((act) => act.name);
	} else {
		var prevAct = [];
		var prevName = [];
	}

	var nowAct = bot.config.presenceUpdate.ignoreUnverifiedActivities
		? now.activities.filter((act) => act.applicationId != null)
		: now.activities;
	var nowName = nowAct.map((act) => act.name);

	//add roles for new activities
	for (var i = 0; i < nowName.length; i++) {
		var a = nowName[i];
		var role = await pickRole(now.member.guild, a);
		if (role == null) continue;
		now.member.roles.add(role, "Started Playing Game");
	}

	//remove roles for ended activities
	for (var i = 0; i < prevName.length; i++) {
		var a = prevName[i];
		if (!nowName.includes(a)) {
			var role = await pickRole(now.member.guild, a, false);
			if (role == null) continue;
			now.member.roles.remove(role, "Stopped Playing Game");
		}
	}
};
