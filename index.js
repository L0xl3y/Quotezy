const Discord = require('discord.js');
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

    //     // Seek information by using the args-info command.
    // } else if (command === 'args-info') {
    //     // Terminate when no arguments are provided in the command.
    //     if (!args.length) {
    //         return message.channel.send(`No arguments provided, ${message.author}!`);

    //     } else if (args[0] === 'foo') {
    //         return message.channel.send('bar');
    //     }
        
    //     message.channel.send(`First argument: ${args[0]}`);
    //     // Kick a user, send them to the sin bin!
    // } else if (command === 'kick') {
    //     // Bot replies with this when the user doesn't tag a user with the kick command.
    //     if (!message.mentions.users.size) {
    //         return message.reply(`Please tag a user to kick them from the server!`);
    //     }

    //     // Tag the user.
    //     const taggedOut = message.mentions.users.first();
    //     // Bot replies when a user is tagged in the kick command.
    //     message.reply(`you wanted to kick: ${taggedOut.username}`);

    //     // Does a permissions check on the user, and returns 
    //     // with message that they have permissions required to kick users from the server.
    //     if (message.guild.me.permissions.has(botPermissions)) {
    //         return message.reply('you have the permissions to do what is needed.');
    //     } else {
    //         // If the user fails the permissions check the bot will respond with this message.
    //         return message.reply('you do not have the required permissions to kick users from the server.');
    //     }

    //     // Display the avatar of the tagged user.
    // } else if (command === 'user-avatar') {
    //     if (!message.mentions.users.size) {
    //         return message.channel.send(`This is your current avatar: <${message.author.displayAvatarURL({ format: "png", dynamic: true })}>`);
    //     }

    //     // Map the list of avatars in the server by user mentions.
    //     const avatarList = message.mentions.users.map(user => {
    //         return `${user.username}'s avatar: <${user.displayAvatarURL({ format: "png", dynamic: true})}>`;
    //     });

    //     // Send them all as a message.
    //     message.channel.send(avatarList);

    //     // Ask for help when working with the bot.
    // } else if (command === 'help') {
    //     // Bot responds with the information by mentioning the user and tells the content.
    // return message.reply('you can use these commands: server, user-info, args-info, user-avatar & help');
    // }

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

            // Send it all as a message.
            message.channel.send(avatarList);
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