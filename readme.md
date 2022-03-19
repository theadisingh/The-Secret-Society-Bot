# Secret Society Bot

![Secret Society Bot Logo](https://i.imgur.com/P7bPbjJ.png)
This is the bot we use for our very own server The Secret Society. It can dynamically assign roles to users when they're playing a certain game. Welcome new users with a personalised banner frame in the welcome channel and assign them the member role so they can interact in the server. It can also play music in voice channel from various souces like YouTube, Spotify, Soundcloud etc and has a seperate music channel with a dashboard to control music.

## Requirements

- [Node JS](https://nodejs.org/en/download/) as your environment.
- [FFmpeg](https://www.ffmpeg.org/download.html) to process audio files.

## Setup

- Create `.env` file and define `TOKEN` as the key and give your bot token.
- Open `config.json` and fill in the required fields.
- Run `node index.js` to start the Bot or run `StartBot.bat` to start the Bot on Windows.

## How to Use

### Server Configs

- `prefix` - Enter the prefix of your choice.
- `serverName` - Enter your server name.
- `serverLogo` - Enter URL of your server logo.
- `embedColor` - Enter color of the embeds in hex.

### IDs Configs

- `clientId` - Enter Bot ID after inviting it to your server.
- `guildId` - Enter Server ID.
- `creatorId` - Enter your ID.
- `ignoreRoleId` - Enter ID of roles to ignore for presence update.
- `welcomeChannelId` - Enter Welcome Channel ID.
- `memberRoleId` - Enter Member Role ID.

_NOTE: ID can be acquired using the developer mode in discord and then right clicking on the Server/Channel/Role and copying ID from there._

### Presence Update Configs

- Inside the field `alias` add the name of the game and the exact role name you want to assign. For eg, for **Rainbow Six Siege** you want to add role **R6S** just write as follows

```js
"alias": {
    "Rainbow Six Siege": "R6S",
	"VALORANT": "Valo",
}
```

_You can add as many games as you want. Just follow the formatting._

- `createRoles` - will automatically create new roles for you if they don't exist. (set to false if you dont want to create new roles for every game the user plays)
- `ignoreUnverifiedActivities` - will ignore activities that are not Discord Verified.

### Music Configs

- `maxVol` - Change the maximum volume limit of player.
- `autoShuffle` - If you want playlists to be auto shuffled when added.
- `imgURL` - URL of image that would be displayed on the Music Dashboard.
- `discordPlaylist` - Add link to your playlist (YouTube/Spotify) to instantly add to queue.
- `editPlaylist` - Add link to the collaborative link of your playlist.
- `DJ` - Enable/Disable DJ Mode. Add your DJ Role under the `roleName` and you can also modify the `commands` that are considered DJ use only.

#### NOTE

- Custom banner for the welcome message can be changed by changing the image in `src/images/background.png`.
- To make the bot stay in the channel change/add as below in `commands/music/play.js` and `events/interactionCreate.js`.

```js
const queue = await player.createQueue(message.guild, {
	leaveOnEnd: false,
	leaveOnStop: false,
	metadata: message.channel,
});
```

- You can also specify the inital volume that the bot starts with by changing/adding as below in `commands/music/play.js` and `events/interactionCreate.js`

```js
const queue = await player.createQueue(message.guild, {
	initialVolume: 25,
	metadata: message.channel,
});
```

- Bot will automatically leave the channel once it gets empty. To change the cooldown of this leave action edit the `events/voiceStateUpdate.js`.

```js
setTimeout(() => {}, 60000); // <== Change Here for leave timeout (in milliseconds)
```

- You will have to create a **Welcome Channel** & **Music Channel** by yourself and add the IDs in the config manually.
