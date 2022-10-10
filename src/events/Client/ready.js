const client = require("../../app");
const colors = require("colors");

module.exports = {
  name: "ready.js"
};

//แสดงบอทออนไลน์แล้ว
client.once('ready', async () => {
  console.log("\n" + `[READY] ${client.user.tag} is up and ready to go.`.brightGreen);
})