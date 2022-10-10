const client = require('../app');
const discordjs = require('discord.js');
const fs = require('fs');
const colors = require('colors');

module.exports = (client, config) => {

    //ตัวเชื่อม SLASH COMMANDS
    console.log("0------------------| Application commands Handler:".blue);
    let commands = [];
    fs.readdirSync('./src/commands/slash/').forEach((dir) => {
        console.log('[!] กำลังโหลดข้อมูล slash_commands...'.yellow);
        const SlashCommands = fs.readdirSync(`./src/commands/slash/${dir}`).filter((file) => file.endsWith('.js'));

        for (let file of SlashCommands) {
            let pull = require(`../commands/slash/${dir}/${file}`);
      
            if (pull.name, pull.description, pull.type == 1) {
                client.slash_commands.set(pull.name, pull);
                console.log(`[HANDLER - SLASH] กำลังโหลดไฟล์: ${pull.name} (#${client.slash_commands.size})`.brightGreen);
        
                commands.push({
                    name: pull.name,
                    description: pull.description,
                    type: pull.type || 1,
                    options: pull.options ? pull.options : null,
                    default_permission: pull.permissions.DEFAULT_PERMISSIONS ? pull.permissions.DEFAULT_PERMISSIONS : null,
                    default_member_permissions: pull.permissions.DEFAULT_MEMBER_PERMISSIONS ? discordjs.PermissionsBitField.resolve(pull.permissions.DEFAULT_MEMBER_PERMISSIONS).toString() : null
                });

            } else {
                console.log(`[HANDLER - SLASH] เกิดข้อผิดพลาดในการโหลดไฟล์ ${file}, โหลดเช็ค โมดูล และลองอีกครั้ง`.red)
                continue;
            };
        };
    });
    //------------------------------------------------------------------------------------------//
    
    //ตัวเชื่อม USER COMMANDS
    fs.readdirSync('./src/commands/user/').forEach((dir) => {
        console.log('[!] กำลังโหลดข้อมูล user_commands...'.yellow);
        const UserCommands = fs.readdirSync(`./src/commands/user/${dir}`).filter((file) => file.endsWith('.js'));
    
        for (let file of UserCommands) {
          let pull = require(`../commands/user/${dir}/${file}`);
    
          if (pull.name, pull.type == 2) {
            client.user_commands.set(pull.name, pull);
            console.log(`[HANDLER - USER] กำลังโหลดไฟล์: ${pull.name} (#${client.user_commands.size})`.brightGreen);
    
            commands.push({
                name: pull.name,
                type: pull.type || 2,
            });
    
          } else {
            console.log(`[HANDLER - USER] เกิดข้อผิดพลาดในการโหลดไฟล์ ${file}, โหลดเช็ค โมดูล และลองอีกครั้ง`.red)
            continue;
          };
        };
    });
    //------------------------------------------------------------------------------------------//

    //ตัวเชื่อม MESSAGECOMMANDS
    fs.readdirSync('./src/commands/message/').forEach((dir) => {
        console.log('[!] กำลังโหลดข้อมูล message_commands...'.yellow);
        const UserCommands = fs.readdirSync(`./src/commands/message/${dir}`).filter((file) => file.endsWith('.js'));
    
        for (let file of UserCommands) {
          let pull = require(`../commands/message/${dir}/${file}`);
    
          if (pull.name, pull.type == 3) {
            client.message_commands.set(pull.name, pull);
            console.log(`[HANDLER - MESSAGE] กำลังโหลดไฟล์: ${pull.name} (#${client.user_commands.size})`.brightGreen);
    
            commands.push({
                name: pull.name,
                type: pull.type || 3,
            });
    
          } else {
            console.log(`[HANDLER - MESSAGE] เกิดข้อผิดพลาดในการโหลดไฟล์ ${file}, โหลดเช็ค โมดูล และลองอีกครั้ง`.red)
            continue;
          };
        };
    });
    //------------------------------------------------------------------------------------------//

    //ตัวส่งคำสั่ง SLASH COMMANDS เข้าไปในSERVER DISCORD
    if (!config.client.client_id) {
        console.log("[CRASH] ไม่พบ clientid โปรดไปที่ไฟล์config.js!".red + "\n");
        return process.exit();
      };
    
      const rest = new discordjs.REST({ version: '10' }).setToken(config.client.token || process.env.TOKEN);
    
      (async () => {
        console.log('[HANDLER] กำลังติดตั้ง application. commands'.yellow);
    
        try {
          await rest.put(
            discordjs.Routes.applicationCommands(config.client.client_id),
            { body: commands }
          );
    
          console.log('[HANDLER] ติดติั้ง application commands สำเร็จ'.brightGreen);
        } catch (err) {
          console.log(err);
        }
    })();
    //------------------------------------------------------------------------------------------//
};