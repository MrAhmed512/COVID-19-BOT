const Discord = require('discord.js');
const superagent = require('superagent');
const client = new Discord.Client();
const prefix = "c19";
client.once('ready', () => {
	console.log('Ready!');
});
client.on('message', async message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;
	const args = message.content.slice(prefix.length).trim().split(/ +/g);
	var country = args.splice(0, args.length).join(" ").replace(" ", "-");
	if(country === ''){
		let {body} = await superagent
		.get(`https://api.covid19api.com/summary`);
		
		let RecoveryRate = Math.round((body['Global'].TotalRecovered / body['Global'].TotalConfirmed) * 100);
		let DeathRate = Math.round((body['Global'].TotalDeaths / body['Global'].TotalConfirmed) * 100);
		let msgembed = new Discord.MessageEmbed()
		.setColor('#fff')
		.setTitle('Global')
		.addFields(
			{ name: 'Confirmed', value: `${body['Global'].TotalConfirmed}`, inline: true },
			{ name: 'Recovered', value: `${body['Global'].TotalRecovered}`, inline: true },
			{ name: 'Deaths', value: `${body['Global'].TotalDeaths}`, inline: true },
			{ name: 'Recovery Rate', value: `${RecoveryRate}%`, inline: true},
			{ name: 'Mortality Rate', value: `${DeathRate}%`, inline: true },
		)
		.setThumbnail("https://purepng.com/public/uploads/medium/purepng.com-earthearthplanetglobethird-planet-from-the-sun-14115269879031kx7w.png")
		.setFooter('use c19 [Country]');
		message.channel.send(msgembed);
	}else{
		let {body} = await superagent
		.get(`https://api.covid19api.com/dayone/country/${country}`);
		let lastDay = Object.keys(body).length - 1;
		let RecoveryRate = Math.round((body[lastDay].Recovered / body[lastDay].Confirmed) * 100);
		let DeathRate = Math.round((body[lastDay].Deaths / body[lastDay].Confirmed) * 100);
		let msgembed = new Discord.MessageEmbed()
		.setColor('#fff')
		.setTitle(`${body[lastDay].Country} Cases`)
		.addFields(
			{ name: 'Confirmed', value: `${body[lastDay].Confirmed}`, inline: true },
			{ name: 'Recovered', value: `${body[lastDay].Recovered}`, inline: true },
			{ name: 'Deaths', value: `${body[lastDay].Deaths}`, inline: true },
			{ name: 'Recovery Rate', value: `${RecoveryRate}%`, inline: true},
			{ name: 'Mortality Rate', value: `${DeathRate}%`, inline: true },
		)
		.setThumbnail(`https://www.countryflags.io/${body[lastDay].CountryCode}/flat/64.png`);
		message.channel.send(msgembed);
	}
	
});
client.login('NzE1MjY2OTU1ODY2NTM4MDg2.Xs7KOg.BZp5lY5VnY2Mw0JFabXkwH7DAKI');