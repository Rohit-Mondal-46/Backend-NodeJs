const { REST, Routes } = require('discord.js');


const commands = [
    {
      name: 'ping',
      description: 'Replies with Pong!',
    },
  ];
  
  const rest = new REST({ version: '10' }).setToken('MTI2MTU3MTc1NTE2ODg5MDk0Mg.Gx_F5E.a4BBn0BLIg-fO0oHaBIc1oDuKwI6KTYKfzLQ1M');
  
(async () =>{

    try {
      console.log('Started refreshing application (/) commands.');
    
      await rest.put(Routes.applicationCommands('1261571755168890942'), { body: commands });
    
      console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
      console.error(error);
    }
})();
