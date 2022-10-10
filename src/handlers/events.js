const fs = require("fs");
const colors = require("colors");

module.exports = (client) => {
  console.log("0------------------| Events Handler:".blue);
  
  //ตัวเชื่อมอีเว้น
  fs.readdirSync('./src/events/').forEach(dir => {
		const commands = fs.readdirSync(`./src/events/${dir}`).filter(file => file.endsWith('.js'));
		for (let file of commands) {
      
			let pull = require(`../events/${dir}/${file}`);
			if (pull.name) {
				client.events.set(pull.name, pull);
				console.log(`[HANDLER - EVENTS] กำลังโหลดไฟล์: ${pull.name}`.brightGreen);
			} else {
				console.log(`[HANDLER - EVENTS] เกิดข้อผิดพลาดในการโหลดไฟล์ ${file}. ชื่อหริอ alisas ผิด.`.red);
				continue;
			}
      
		}
	});
}