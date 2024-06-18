const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'Gifted;;;eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid0RoNmtmOGk5a09LUWF6MWJFK1VXU1JlWHVVQjVNYzE2TVc4NEFqbnVsYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVzZZWXRXSUUwdDhCMURYN3ozb1lLUzNtNSt3RVNJSkIzUUVXSkRqV0h4UT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJzSlczTjhLVmFES3pvR3lIZHhTaStOaVdMOVZWRjNyait6MnlZWE9laW1zPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJhaVB3L0pPNW5JQlk2SXVsMkUralp5NzRiTExxcjhveWZBaTdITm5vN0NBPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImtFMk1aMndhYStUMTVhb0dyL3pJK2xJT0pwOXV3azlBTENiT2U5MXhYbGM9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkMvNXVtaWJUcEdXL1NhUGxsYjVVQ0tDb3VLaE5JUmV3Rzd0MWpnZWJuZzA9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQUt5eHE3RnFQeFhnbG9kY1NEcndtNW1idE4raXkxWVhnK2hNd1psYmRHTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZjgxc2tOazllMXpYUEZrck1LQTRKR1FiYlJkbkxQb01EOEpzN0ROSkl5TT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjkwN2w4MFZrWE1GTzYvZjRHcStQaDZlWHppbFhCSnpPVFJCMkR0cHRXdVFxMEwvNFRxZ3J6RkpBRThPcDVoRDBwRGlpZXEyNUJMcU5HSHV0WHUyMGhnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTIsImFkdlNlY3JldEtleSI6IlE3bmJIL3NaV2UvdW5SM1l4NDVEcWdSUFJlbnAvV2xVenQ5R2c3T09WV0E9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IjFvejF1MVFoU0NDcGtxaUg2WHd6bUEiLCJwaG9uZUlkIjoiZWQxZWE4MzctN2E3ZS00M2UwLTlkOTctM2MxOWQwODM1MTczIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImsvOURWK3orTGM3V3czcCtUZWo1RkphZS9nWT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJyVXo0dVAwZXF2T21JS2UyUFlobjJJWXdxWm89In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiRTZHVlgyQkgiLCJtZSI6eyJpZCI6IjI1NDc0NjQ0MDU5NTo5MEBzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDUEs0Kys4REVJYnF4Yk1HR0JBZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiaVZSR2pVSzF6NklVZnFrNzJMRGtHN1pnVnh0Z05Sci80NldDRkgxVUdDWT0iLCJhY2NvdW50U2lnbmF0dXJlIjoicmVWQ0RiYXZFWTZ4dnhSMTNwMElORTZTVTc3SlhqcDNHazJ0eUVxUS9JUXdQNGNOM0VROWZ4SjdrOWtEYWlleTdNTi9mVjcvamt3b0tMWWQrcEVvQ1E9PSIsImRldmljZVNpZ25hdHVyZSI6ImVoNjdIZ2NFdTl0SVNldEgwSGg4SSs4bzNJam5IQ1Bidnd2N1BlU1pwRExsV1d4QnluUm1CRzlKT2ZoMWFjT3lNZDVlQmpHdmF2Qyt3ZzZoWmNZd2lRPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjU0NzQ2NDQwNTk1OjkwQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQllsVVJvMUN0YytpRkg2cE85aXc1QnUyWUZjYllEVWEvK09sZ2hSOVZCZ20ifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MTg3MTE1NzYsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBRk9MIn0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Mbuvi Tech",
    NUMERO_OWNER : process.env.OWNER_NUMBER || "254743680703,254746440595", 
             
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "no",
CHATBOT: process.env.CHAT_BOT || "no",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'mbuvi-md',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/a7ca8d4777fa8ad977795.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '5' ,
    PRESENCE : process.env.PRESENCE || 'online',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

