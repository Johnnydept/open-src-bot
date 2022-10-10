const { EmbedBuilder } = require('discord.js');
const client = require('../../app');
const config = require('../../../config');

module.exports = {
    name: "interactionCreate"
};

// สร้่าง interaction สำหรับใช้ SLASHCOMMANDS

client.on('interactionCreate', async (interaction) => {

    if (interaction.isChatInputCommand()) {
      const command = client.slash_commands.get(interaction.commandName);
  
      if (!command) return;
  
      try {
        command.run(client, interaction, config);
      } catch (e) {
        console.error(e)
      };
    };
  
    if (interaction.isUserContextMenuCommand()) { // User:
      const command = client.user_commands.get(interaction.commandName);
  
      if (!command) return;
  
      try {
        command.run(client, interaction, config);
      } catch (e) {
        console.error(e)
      };
    };
  
    if (interaction.isMessageContextMenuCommand()) { // Message:
      const command = client.message_commands.get(interaction.commandName);
  
      if (!command) return;
  
      try {
        command.run(client, interaction, config);
      } catch (e) {
        console.error(e)
      };
    };
  
    if (interaction.isModalSubmit()) { // Modals:
      const modal = client.modals.get(interaction.customId);
  
      if (!modal) return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setDescription('เกิดข้อผิดพลาดบางอย่างโปรดติดต่อนักพัฒนา.')
            .setColor('Red')
        ],
        ephemeral: true
      });
  
      try {
        modal.run(client, interaction, config);
      } catch (e) {
        console.error(e)
      };
    }
    if (interaction.isSelectMenu()) {
      const menu = client.selectMenus.get(interaction.customId);

      if (!menu) return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setDescription('เกิดข้อผิดพลาดบางอย่างโปรดติดต่อนักพัฒนา.')
            .setColor('Red')
        ],
        ephemeral: true
      })
      try {
        menu.run(client, interaction, config);
      } catch (error) {
        console.error(error)
      }
    }
});