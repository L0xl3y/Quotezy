const Discord = require('discord.js');
const embedText = require('./embededtext.js');
const { prefix, token } = require('./config.json');
const client = new Discord.Client();

// Bring the bot online.
client.once('Ready', () => {
    console.log('Bot armed and online!');
});

// Initialise the 'message' to the client.
client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    // Set bot permissions.
    const botPermissions = ['MANAGE_MESSAGES', 'KICK_MESSAGES', 'MANAGE_ROLES', 'MANAGE_CHANNELS'];

    // Usuable commands for the bot.
    // Seek server info and find server info.
    switch(command) {
        case 'server':

            // Send information information and current server population.
            message.channel.send(`Server name: ${message.guild.name}\n Total Members: ${message.guild.memberCount}`);
            break;

        case 'user-info':

            // Return username and user ID.
            message.channel.send(`Your username: ${message.author.username}\n Your ID: ${message.author.id}`);
            break;

        case 'kick':


            if (!message.mentions.users.size) {
                return message.reply(`Please tag a user to kick them from the server!`);
            }
            const taggedOut = message.mentions.users.first();
            // Bot replies when a user is tagged in the kick command.
            message.reply(`You wanted to kick: ${taggedOut.username}`);

            // Does a permissions check on the user, and returns
            // with message that they have permissions required to kick users from the server.
            if (message.guild.me.permissions.has(botPermissions)) {
                return message.reply('You have the permissions to do what is needed.');
            } else {
                // If the user fails the permissions check the bot will respond with this message.
                return message.reply('You do not have the required permissions to kick users from the server.');
            }
            break;

        case 'user-avatar':
            if (!message.mentions.users.size) {
                return message.channel.send(`This is your current avatar: <${message.author.displayAvatarURL({ format: "png", dynamic: true})}>`);
            }
            // Map the list of avatars in the server by user mentions.
              const avatarList = message.mentions.users.map(user => {
                  return `${user.username}'s avatar: <${user.displayAvatarURL({ format: "png", dynamic: true})}>`;
              });

            // Map the list of avatars in the server by the user menetion.
            // Send the data


            // Send it all as a message.
            // message.channel.send(avatarList);
            break;

        case 'help':
            // Bot responds with the information by mentioning the user and responds with valid commands.
            return message.reply(`${message.author.username}, you can use these commands: server, user-info, kick, user-avatar, help`);
            break;

        default:
            message.channel.send("Something has gone wrong.");
    }
});

client.login(token);