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

    // Usuable commands for the bot.
    // Seek server info and find server info.
    if (command === 'server') {
        message.channel.send(`Server name: ${message.guild.name}\n Total Members: ${message.guild.memberCount}`);

        // Seek user info and find user info.
    } else if (command === 'user-info') {
        message.channel.send(`Your username: ${message.author.username}\n Your ID: ${message.author.id}`);
        
        // Seek information by using the args-info command.
    } else if (command === 'args-info') {
        // Terminate when no arguments are provided in the command.
        if (!args.length) {
            return message.channel.send(`No arguments provided, ${message.author}!`);

        } else if (args[0] === 'foo') {
            return message.channel.send('bar');
        }
        
        message.channel.send(`First argument: ${args[0]}`);
        // Kick a user, send them to the sin bin!
    } else if (command === 'kick') {
        // Bot replies with this when the user doesn't tag a user with the kick command.
        if (!message.mentions.users.size) {
            return message.reply(`Please tag a user to kick them from the server!`);
        }

        // Tag the user.
        const taggedOut = message.mentions.users.first();
        // Bot replies when a user is tagged in the kick command.
        message.reply(`you wanted to kick: ${taggedOut.username}`);

        // Display the avatar of the tagged user.
    } else if (command === 'user-avatar') {
        if (!message.mentions.users.size) {
            return message.channel.send(`This is your current avatar: <${message.author.displayAvatarURL({ format: "png", dynamic: true })}>`);
        }

        // Map the list of avatars in the server by user mentions.
        const avatarList = message.mentions.users.map(user => {
            return `${user.username}'s avatar: <${user.displayAvatarURL({ format: "png", dynamic: true})}>`
        });

        // Send them all as a message.
        message.channel.send(avatarList);

        // Delete messages from a channel.
    } else if (command === 'prune') {
        const amount = parseInt(args[0]) + 1;

        // Error handling, in the event that the number cannot be computed.
        if (isNaN(amount)) {
            return message.reply('That\'s not a valid number, try again.');

            // Limit the range from greater than 2 to less than 100.
        } else if (amount < 2 || amount > 100) {
            return message.reply('Enter a number that is between 2 and 100.');
        }
/*
    // Delete messages as per the value input.
    message.channel.bulkDelete(amount);
    }
*/

    // Delete messages.
    message.channel.bulkDelete(amount, true).catch(err => {
        console.error(err);
        message.channel.send('Something went wrong in pruning messages in the channel.');
        });
    }
});

client.login(token);