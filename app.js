const Discord = require('discord.js');
const client = new Discord.Client();
const secret = require('dotenv').config();
const prefix = ".";
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`)
    client.user.setActivity('Jauert Sucks', {type: 'Playing RotMG'})

});
client.on('guildMemberAdd', member => {
    const logs = member.guild.channels.find(channel => channel.name === "welcome");
    var recruit = member.guild.roles.find(role => role.name === "Recruit");
    member.addRole(recruit);
    logs.send(`Welcome ${member} to Refined, please apply through <#684105932355010565>`)
});

client.on('message', msg => {
    if(msg.author.bot) return; // so bot wont trigger itself
    if(msg.content.indexOf(prefix) !== 0) return; // prefix


    const args = msg.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    console.log(args, command)

    if (command == "prune") {
        if (msg.member.hasPermission('MANAGE_MESSAGES')) {
            if (args.length < 1) {
                msg.channel.send('Prune how many? `' + prefix + 'prune [number]`')
            } 
            else if (!Number.isNaN(parseInt(args[0]))) {
                prune = parseInt(args[0]);
                prune = ((prune) > 10 ? 10 : prune)
                prune = ((prune) < 0 ? 0 : prune);
                (async () => {
                    msg.delete();
                    const messages = await msg.channel.fetchMessages({limit: prune});
                    msg.channel.bulkDelete(messages);
                })()

            }
        } else {
            msg.channel.send('No permission')
        }
    }
})

client.login(process.env.key);