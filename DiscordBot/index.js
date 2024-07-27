const {Client, GatewayIntentBits}= require('discord.js')
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', msg =>{
    console.log(msg.content)
    if(!msg.author.bot){
        msg.reply({
            content:"Hello user, welcome from this bot"
        })
    }
})

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'ping') {
        await interaction.reply('Pong!');
    }
});

client.login('MTI2MTU3MTc1NTE2ODg5MDk0Mg.Gx_F5E.a4BBn0BLIg-fO0oHaBIc1oDuKwI6KTYKfzLQ1M');