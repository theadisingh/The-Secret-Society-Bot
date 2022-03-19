const Canvas = require("canvas");
const discord = require("discord.js");
const { MessageEmbed } = require("discord.js");

const background = "./src/images/background.png";

const dim = {
	height: 1080,
	width: 1920,
	margin: 100,
};

const av = {
	size: 256,
	x: 832,
	y: 412,
};

Canvas.registerFont("./src/fonts/Copperplate Gothic Bold Regular.ttf", {
	family: "Copperplate Gothic Bold",
});

async function generateImage(member) {
	let username = member.user.username;
	let avatarURL = member.user.displayAvatarURL({
		format: "png",
		dynamic: false,
		size: av.size,
	});

	const canvas = Canvas.createCanvas(dim.width, dim.height);
	const ctx = canvas.getContext("2d");

	//Draw the backgroundno
	const backimg = await Canvas.loadImage(background);
	ctx.drawImage(backimg, 0, 0);

	//Draw the Avatar
	const avimg = await Canvas.loadImage(avatarURL);
	ctx.save();

	ctx.beginPath();
	ctx.arc();
	ctx.arc(
		av.x + av.size / 2,
		av.y + av.size / 2,
		av.size / 2,
		0,
		Math.PI * 2,
		true
	);
	ctx.closePath();
	ctx.clip();

	ctx.drawImage(avimg, av.x, av.y);
	ctx.restore();

	//Draw the Username Outline
	function drawStrokedText(text, x, y) {
		ctx.save();
		ctx.textAlign = "center";
		ctx.font = "92px Copperplate Gothic Bold";
		ctx.strokeStyle = "black";
		ctx.fillStyle = "white";
		ctx.lineWidth = 8;
		ctx.lineJoin = "round";
		ctx.miterLimit = 2;
		ctx.strokeText(text, x, y);
		ctx.fillText(text, x, y);
		ctx.restore();
	}
	drawStrokedText(username, dim.width / 2, dim.height - dim.margin);

	const attachment = new discord.MessageAttachment(
		canvas.toBuffer(),
		"welcome.png"
	);
	return attachment;
}

module.exports = async (bot, member) => {
	const attachment = await generateImage(member);
	const serverName = bot.config.serverName;

	//Member Role on join
	//const memberRole = member.guild.roles.cache.get(bot.config.IDs.memberRoleId);
	//member.roles.add(memberRole, "Joined Server");

	bot.channels.cache.get(bot.config.IDs.welcomeChannelId).send({
		content: `Welcome to ${serverName} <@${member.id}>!`,
		files: [attachment],
	});
};
