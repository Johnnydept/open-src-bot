const fs = require("fs");
const colors = require("colors");

module.exports = (client, config) => {
  console.log("0------------------| Prefix Handler:".blue);

  //ตัวเชื่อม PREFIX COMMANDS
  fs.readdirSync('./src/commands/prefix/').forEach(dir => {
    const commands = fs.readdirSync(`./src/commands/prefix/${dir}`).filter(file => file.endsWith('.js'));
    for (let file of commands) {

      let pull = require(`../commands/prefix/${dir}/${file}`);
      if (pull.config.name) {
        client.prefix_commands.set(pull.config.name, pull);
        console.log(`[HANDLER - PREFIX] กำลังโหลดไฟล์: ${pull.config.name} (#${client.prefix_commands.size})`.brightGreen)
      } else {
        console.log(`[HANDLER - PREFIX] เกิดข้อผิดพลาดในการโหลดไฟล์ ${file}. ชื่อหริอ alisas ผิด.`.red);
        continue;
      }

    }
  })
};
