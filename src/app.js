const discordjs = require('discord.js'); //นำเข้า module discord.js
const config = require('../config'); //นำเข้า config

///สร้าง ตัวแปร client
const client = new discordjs.Client({
    intents: [
        discordjs.GatewayIntentBits.Guilds,
        discordjs.GatewayIntentBits.GuildMessages,
        discordjs.GatewayIntentBits.GuildPresences,
        discordjs.GatewayIntentBits.GuildMessageReactions,
        discordjs.GatewayIntentBits.DirectMessages,
        discordjs.GatewayIntentBits.MessageContent,
        discordjs.GatewayIntentBits.GuildVoiceStates
    ],
    partials: [
        discordjs.Partials.Channel,
        discordjs.Partials.Message,
        discordjs.Partials.User,
        discordjs.Partials.GuildMember,
        discordjs.Partials.Reaction
    ],
})
///

require('events').EventEmitter.defaultMaxListeners = 15;
process.setMaxListeners(0); //แก้บอทรันนานๆแล้ว error

//เช็คว่ามีโทเค้นหรือป่าว
const Check_TOKEN = config.client.token;
if (!Check_TOKEN) {
    console.warn("[CRASH] ไม่พบ TOKEN ของ BOT โปรดไปที่ไฟล์ config.js เพื่อเพิ่มTOKEN".red);
    return process.exit();
};

//สร้าง collection เพื่อเชื่อมไฟล์
client.prefix_commands = new discordjs.Collection();
client.slash_commands = new discordjs.Collection();
client.user_commands = new discordjs.Collection();
client.message_commands = new discordjs.Collection();
client.events = new discordjs.Collection();

//ส่งออกตัวแปล client
module.exports = client;

["prefix", "application_commands", "events"].forEach((file) => {
    require(`./handlers/${file}`)(client, config);
});

//login bot หรือ ออนไลน์bot
client.login(Check_TOKEN)
    //แจ้ง error
    .catch((err) => {
        console.error("[CRASH] มีบางอย่างผิดปกติในการเชื่อมต่อ");
        console.error("[CRASH] ERROR FROM DISCORD API" + err);
        process.exit();
    });

//ตัว ANTI CRASH
process.on('unhandledRejection', async (err, promise) => {
    console.error(`[ANTI-CRASH] ตรวจพบข้อผิดพลาด : ${err}`.red);
    console.error(promise);
});