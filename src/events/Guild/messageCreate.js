const { EmbedBuilder, PermissionsBitField, codeBlock } = require("discord.js");
const client = require('../../app');
const config = require('../../../config');

module.exports = {
    name: "messageCreate"
};

//สร้าง MESSAGE สำหรับใช้ PREFIX_COMMANDS

client.on('messageCreate', async message => {

    const prefix = config.prefix

    if (message.channel.type !== 0) return;
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
    if (!message.guild) return;
    if (!message.member) message.member = message.guild.fetchMember(message);
  
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if (cmd.length == 0) return;
  
    let command = client.prefix_commands.get(cmd);
  
    if (!command) return;
  
    if (command) {
      if (command.permissions) {
        if (!message.member.permissions.has(PermissionsBitField.resolve(command.permissions || []))) return message.reply({
          embeds: [
            new EmbedBuilder()
              .setDescription(`🚫 ขออภัย คุณไม่ได้รับอนุญาตให้ใช้คําสั่งนี้.`)
              .setColor("Red")
          ]
        })
      };
  
      if (command.owner, command.owner == true) {
        if (!config.user.owners) return;
  
        const allowedUsers = []; // New Array.
  
        config.user.owners.forEach(user => {
          const fetchedUser = message.guild.members.cache.get(user);
          if (!fetchedUser) return allowedUsers.push('*Unknown User#0000*');
          allowedUsers.push(`${fetchedUser.user.tag}`);
        })
  
        if (!config.user.owners.some(ID => message.member.id.includes(ID))) return message.reply({
          embeds: [
            new EmbedBuilder()
              .setDescription(`🚫 ขออภัย แต่เจ้าของเท่านั้นที่สามารถใช้คําสั่งนี้! ผู้ใช้ที่อนุญาต:\n**${allowedUsers.join(", ")}**`)
              .setColor("Red")
          ]
        })
      };
  
      try {
        command.run(client, message, args, prefix, config);
      } catch (e) {
        console.error(e);
      };

      if (!command) return;
      if (command.inVoiceChannel && !message.member.voice.channel) {
        return message.channel.send(`${config.emotes.error} | คุณต้องอยู่ในช่องเสียง!`)
      };
    };
});
  