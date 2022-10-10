const { EmbedBuilder } = require("discord.js"); 

module.exports = {
  config: {
    name: "ping",
    description: "เช็คปืง SERVER !",
  },
  permissions: ['SendMessages'],
  owner: false,
  run: async (client, message, args, prefix, config, db) => {

    message.reply({ embeds: [
      new EmbedBuilder()
        .setDescription(`🏓 **Pong!** Client websocket ping: \`${client.ws.ping}\` ms.`)
        .setColor("Green")
    ] })
    
  },
};
