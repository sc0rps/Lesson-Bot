const fs = require("fs");
const Discord = require('discord.js');
const config = require('./config.json');
const bot = new Discord.Client();
const guild = new Discord.Guild();
const token = config.token;
const prefix = config.prefix;
const change = require("./change");
const database = require("./syncGetDatabase");
const embed = require("./embed");
const sqlite = require("sqlite3").verbose();
let db = new sqlite.Database('./linksdb.db', sqlite.OPEN_READWRITE);
let tempLink, tempDay, tempPeriod, tempEmbed, finalMessage, commandCount, dayCount, dayCount2, dayCount3, tempWho;
const startPeriod = config.startPeriod;
const startLoop = startPeriod;
const endPeriod = config.endPeriod;
const endLoop = endPeriod + 1;



bot.on('ready', () =>{
	console.log('This bot is online!');
	database.syncLinks();
	database.syncTime();
	database.syncSubject();
	database.syncTeacher();

})

bot.on('message', message =>{
	if (message.channel.type == 'dm') return;
	const args = message.content.slice(prefix.length).trim().split(' ');
	const command = args.shift().toLowerCase();
	database.syncLinks();
	database.syncTime();
	database.syncSubject();
	database.syncTeacher();
	function generateEmbedFields(num1, num2, dayCount) {
    
		let embedFields = [];
		while (parseInt(num1) <= parseInt(num2)) {
			embedFields.push({name : "Period " + parseInt(num1) + " | " + database.times[dayCount][num1], value: database.value[dayCount][num1]});
			num1++;
		}
		
		return embedFields;
	}
	function generateEmbedAll(dayCount) {
		tempDay = database.getDay(dayCount);
		for (var i = startLoop; i < endLoop; i++) {
			if (database.links[dayCount][i] == "free") {
				database.value[dayCount][i] = "Free Period!";
			} else if (database.links[dayCount][i] == "exam") {
				database.value[dayCount][i] = database.subjectGroup[dayCount][i] + ' ' + database.subject[dayCount][i] + ' ' + database.teacher[dayCount][i] + '\n' + 'You have an exam for this subject! Go to this subject\'s team and wait for your exam.\nGood luck!';
			} else {
				database.value[dayCount][i] = database.subjectGroup[dayCount][i] + ' ' + database.subject[dayCount][i] + ' ' + database.teacher[dayCount][i] + '\n' + database.links[dayCount][i];
			}
		}
		let options = generateEmbedFields(startPeriod, endPeriod, dayCount);
		tempEmbed = new Discord.MessageEmbed()
			.setColor('#0099ff')
			.setTitle(tempDay)	
			.addFields(options);
			message.channel.send(tempEmbed);
	
	}
	function generateEmbedSpecific(dayCount, commandCount) {
		tempDay = database.getDay(dayCount);
		if (database.links[dayCount][commandCount] == "free") {
			database.value[dayCount][commandCount] = "Free Period!";
		} else if (database.links[dayCount][commandCount] == "exam") {
			database.value[dayCount][commandCount] = database.subjectGroup[dayCount][commandCount] + ' ' + database.subject[dayCount][commandCount] + ' ' + database.teacher[dayCount][commandCount] + '\n' + 'You have an exam for this subject! Go to this subject\'s team and wait for your exam.\nGood luck!';
		} else {
			database.value[dayCount][commandCount] = database.subjectGroup[dayCount][commandCount] + ' ' + database.subject[dayCount][commandCount] + ' ' + database.teacher[dayCount][commandCount] + '\n' + database.links[dayCount][commandCount];
		}

		tempEmbed = new Discord.MessageEmbed()
			.setColor('#0099ff')
			.setTitle(tempDay)	
			.addFields(
				{ name: 'Period ' + commandCount +' | ' + database.times[dayCount][commandCount], value: database.value[dayCount][commandCount] },
			);
		message.channel.send(tempEmbed);

	}

	if (command == "change") {
		if (!message.content.startsWith(prefix)) {
			return;
		}
		if (args[0] == undefined) {
			return message.channel.send("You did not provide a **type you wanted to change**! Use the `.help change` command to find out how to use this command.");
		}
		if (args[1] == undefined) {
			return message.channel.send("You did not provide a **day**! Use the `.help change` command to find out how to use this command.")
		}
		if (args[2] == undefined) {
			return message.channel.send("You did not provide a **period number**! Use the `.help change` command to find out how to use this command.")
		} else if (args[2] < startPeriod || args[2] > endPeriod) {
			return message.channel.send("You did not provide a **valid period number**! Use the `.help change` command to find out how to use this command.")
		}
		if (args[3] == undefined) {
			return message.channel.send("You did not provide a **the thing you want to change to**! Use the `.help change` command to find out how to use this command.")
		} else if (args[0] == "time") {
			dayCount2 = database.getDayCount(args[1])
			if (dayCount2 == undefined){
				message.channel.send("You did not provide a **valid day**! Use the `.help change` command to find out how to use this command.")
			} else {
				generateEmbedSpecific(dayCount2, args[2]);
				message.channel.send(change.timeChange(args[0], args[1], args[2], args[3], message.author.username));
			}
		} else if (args[0] == "subject") {
			dayCount2 = database.getDayCount(args[1])
			if (dayCount2 == undefined){
				message.channel.send("You did not provide a **valid day**! Use the `.help change` command to find out how to use this command.")
			} else {
				generateEmbedSpecific(dayCount2, args[2]);
				message.channel.send(change.subjectChange(args[0], args[1], args[2], args[3], args[4], args[5], message.author.username));
			}	
		} else if (args[0] == "teacher") {
			dayCount2 = database.getDayCount(args[1])
			if (dayCount2 == undefined){
				message.channel.send("You did not provide a **valid day**! Use the `.help change` command to find out how to use this command.")
			} else {
				generateEmbedSpecific(dayCount2, args[2]);
				message.channel.send(change.teacherChange(args[0], args[1], args[2], args[3], args[4], args[5], message.author.username));		
			}	
		} else if (args[0] == "link") {
			dayCount2 = database.getDayCount(args[1])
			if (dayCount2 == undefined){
				message.channel.send("You did not provide a **valid day**! Use the `.help change` command to find out how to use this command.")
			} else {
				generateEmbedSpecific(dayCount2, args[2]);
				message.channel.send(change.linkChange(args[0], args[1], args[2], args[3], message.author.username));	
			}	
		} else if (args[0] == "all") {
			dayCount2 = database.getDayCount(args[1])
			if (dayCount2 == undefined){
				message.channel.send("You did not provide a **valid day**! Use the `.help change` command to find out how to use this command.")
			} else {
				generateEmbedSpecific(dayCount2, args[2]);	
				message.channel.send(change.allChange(args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8], message.author.username));	
			}	
		} else {
			return message.channel.send("You did not provide a **valid type to change**! Use the `.help change` command to find out how to use this command.")
		}
	}

	if (command == "mon" || command == "monday") {
		if (!message.content.startsWith(prefix)) {
			return;
		}
		dayCount = 0;
		if (args [0] == undefined){ 
			generateEmbedAll(dayCount);
		} else {
			if (args[0] < endLoop && args[0] >= startLoop) {
				generateEmbedSpecific(dayCount, args[0]);	
			} else {
				message.channel.send("Invalid Period Number!")
			}
		}
	}
	if (command == "tue" || command == "tuesday") {
		if (!message.content.startsWith(prefix)) {
			return;
		}
		dayCount = 1;
		if (args [0] == undefined){ 
			generateEmbedAll(dayCount);
		} else {

			if (args[0] < endLoop && args[0] >= startLoop) {
				generateEmbedSpecific(dayCount, args[0]);	
			} else {
				message.channel.send("Invalid Period Number!")
			}
		}
		
	}
	if (command == "wed" || command == "wednesday") {
		if (!message.content.startsWith(prefix)) {
			return;
		}
		dayCount = 2;
		if (args [0] == undefined){ 
			generateEmbedAll(dayCount);
		} else {

			if (args[0] < endLoop && args[0] >= startLoop) {
				generateEmbedSpecific(dayCount, args[0]);	
			} else {
				message.channel.send("Invalid Period Number!")
			}
		}	
		
	}
	if (command == "thu" || command == "thursday") {
		if (!message.content.startsWith(prefix)) {
			return;
		}
		dayCount = 3;
		if (args [0] == undefined){ 
			generateEmbedAll(dayCount);
		} else {

			if (args[0] < endLoop && args[0] >= startLoop) {
				generateEmbedSpecific(dayCount, args[0]);	
			} else {
				message.channel.send("Invalid Period Number!")
			}
		}	
		
	}
	if (command == "fri" || command == "friday") {

		dayCount = 4;
		if (args [0] == undefined){ 
			generateEmbedAll(dayCount);
		} else {
			if (args[0] < endLoop && args[0] >= startLoop) {
				generateEmbedSpecific(dayCount, args[0]);	
			} else {
				message.channel.send("Invalid Period Number!")
			}
		}	
		
	}

	if (command == 'help') {
		if (!message.content.startsWith(prefix)) {
			return;
		}
		if (args[0] === undefined) {
			message.channel.send(embed.help);
		} else if (args[0] === 'change'){
			message.channel.send(embed.helpChange);
		} else if (args[0] === 'who'){
			message.channel.send(embed.helpWho);
		} 
		
	}
	if (command == 'future') {
		message.channel.send(embed.future);
	}
	if (command == 'info') {
		message.channel.send(embed.info);
		
	}
	if (command == 'extra') {
		if (!message.content.startsWith(prefix)) {
			return;
		}
		message.channel.send(embed.extra);
		
	}
	if (command == 'changelog') {
		if (!message.content.startsWith(prefix)) {
			return;
		}
		message.channel.send(embed.changeLogEmbed);
		
	}
	if (command == 'changelogleg') {
		if (!message.content.startsWith(prefix)) {
			return;
		}
		message.channel.send(embed.changeLogLegEmbed);
		
	}

	if (command == 'who') {
		if (!message.content.startsWith(prefix)) {
			return;
		}
		
		if (args[0] == undefined) {
			return message.channel.send("You did not provide a **type**! Use the `.help` command to find out how to use this command.")
		} 
		if (args[1] == undefined) {
			return message.channel.send("You did not provide a **day**! Use the `.help` command to find out how to use this command.")
		}
		if (args[2] == undefined) {
			return message.channel.send("You did not provide a **period**! Use the `.help` command to find out how to use this command.")
		} else if (args[2] < startPeriod || args[2] > endPeriod) {
			return message.channel.send("You did not provide a **valid period**! Use the `.help` command to find out how to use this command.")
		}
		if (args[0] == "time") {
			day = args[1];
			period = args[2];
			if (day == "monday") {
				tempDay = "Monday";
			} else if (day ==  "tuesday") {
				tempDay = "Tuesday";
			} else if (day == "wednesday") {
				tempDay = "Wednesday";
			} else if (day == "thursday") {
				tempDay = "Thursday";
			} else if (day == "friday") {
				tempDay = "Friday";
			} else if (day == "Monday") {
				tempDay = "Monday";
			} else if (day ==  "Tuesday") {
				tempDay = "Tuesday";
			} else if (day == "Wednesday") {
				tempDay = "Wednesday";
			} else if (day == "Thursday") {
				tempDay = "Thursday";
			} else if (day == "Friday") {
				tempDay = "Friday";
			}else if (day == "mon") {
				tempDay = "Monday";
			} else if (day ==  "tue") {
				tempDay = "Tuesday";
			} else if (day == "wed") {
				tempDay = "Wednesday";
			} else if (day == "thu") {
				tempDay = "Thursday";
			} else if (day == "fri") {
				tempDay = "Friday";
			} else {
				return message.channel.send("You did not provide a **valid day**! Use the `.help` command to find out how to use this command.")
			}
			let tempWho;
			let db = new sqlite.Database('./linksdb.db', sqlite.OPEN_READWRITE | sqlite.OPEN_CREATE);
			let sql = `SELECT UserTime FROM `+ tempDay+`
						WHERE Period = `+ period + ``;
		
			db.all( sql, [], (err, rows) => {
				if (err) {
					throw err;
				}
				
				rows.forEach((row) => {
					message.channel.send("The **Time** for **" + tempDay +"** Period **" + period +"** was changed by **" + row.UserTime + "**.")
				});
			});	
			db.close();
		} else if (args[0] == "subject") {
			day = args[1];
			period = args[2];
			if (day == "monday") {
				tempDay = "Monday";
			} else if (day ==  "tuesday") {
				tempDay = "Tuesday";
			} else if (day == "wednesday") {
				tempDay = "Wednesday";
			} else if (day == "thursday") {
				tempDay = "Thursday";
			} else if (day == "friday") {
				tempDay = "Friday";
			} else if (day == "Monday") {
				tempDay = "Monday";
			} else if (day ==  "Tuesday") {
				tempDay = "Tuesday";
			} else if (day == "Wednesday") {
				tempDay = "Wednesday";
			} else if (day == "Thursday") {
				tempDay = "Thursday";
			} else if (day == "Friday") {
				tempDay = "Friday";
			}else if (day == "mon") {
				tempDay = "Monday";
			} else if (day ==  "tue") {
				tempDay = "Tuesday";
			} else if (day == "wed") {
				tempDay = "Wednesday";
			} else if (day == "thu") {
				tempDay = "Thursday";
			} else if (day == "fri") {
				tempDay = "Friday";
			} else {
				return message.channel.send("You did not provide a **valid day**! Use the `.help` command to find out how to use this command.")
			}
			let tempWho;
			let db = new sqlite.Database('./linksdb.db', sqlite.OPEN_READWRITE | sqlite.OPEN_CREATE);
			let sql = `SELECT UserSubject FROM `+ tempDay+`
						WHERE Period = `+ period + ``;
		
			db.all( sql, [], (err, rows) => {
				if (err) {
					throw err;
				}
				
				rows.forEach((row) => {
					message.channel.send("The **Subject** for **" + tempDay +"** Period **" + period +"** was changed by **" + row.UserSubject + "**.")
				});
			});	
			db.close();
		} else if (args[0] == "teacher") {
			day = args[1];
			period = args[2];
			if (day == "monday") {
				tempDay = "Monday";
			} else if (day ==  "tuesday") {
				tempDay = "Tuesday";
			} else if (day == "wednesday") {
				tempDay = "Wednesday";
			} else if (day == "thursday") {
				tempDay = "Thursday";
			} else if (day == "friday") {
				tempDay = "Friday";
			} else if (day == "Monday") {
				tempDay = "Monday";
			} else if (day ==  "Tuesday") {
				tempDay = "Tuesday";
			} else if (day == "Wednesday") {
				tempDay = "Wednesday";
			} else if (day == "Thursday") {
				tempDay = "Thursday";
			} else if (day == "Friday") {
				tempDay = "Friday";
			}else if (day == "mon") {
				tempDay = "Monday";
			} else if (day ==  "tue") {
				tempDay = "Tuesday";
			} else if (day == "wed") {
				tempDay = "Wednesday";
			} else if (day == "thu") {
				tempDay = "Thursday";
			} else if (day == "fri") {
				tempDay = "Friday";
			} else {
				return message.channel.send("You did not provide a **valid day**! Use the `.help` command to find out how to use this command.")
			}
			let tempWho;
			let db = new sqlite.Database('./linksdb.db', sqlite.OPEN_READWRITE | sqlite.OPEN_CREATE);
			let sql = `SELECT UserTeacher FROM `+ tempDay+`
						WHERE Period = `+ period + ``;
		
			db.all( sql, [], (err, rows) => {
				if (err) {
					throw err;
				}
				
				rows.forEach((row) => {
					message.channel.send("The **Teacher** for **" + tempDay +"** Period **" + period +"** was changed by **" + row.UserTeacher + "**.")
				});
			});	
			db.close();
		} else if (args[0] == "link") {
			day = args[1];
			period = args[2];
			if (day == "monday") {
				tempDay = "Monday";
			} else if (day ==  "tuesday") {
				tempDay = "Tuesday";
			} else if (day == "wednesday") {
				tempDay = "Wednesday";
			} else if (day == "thursday") {
				tempDay = "Thursday";
			} else if (day == "friday") {
				tempDay = "Friday";
			} else if (day == "Monday") {
				tempDay = "Monday";
			} else if (day ==  "Tuesday") {
				tempDay = "Tuesday";
			} else if (day == "Wednesday") {
				tempDay = "Wednesday";
			} else if (day == "Thursday") {
				tempDay = "Thursday";
			} else if (day == "Friday") {
				tempDay = "Friday";
			}else if (day == "mon") {
				tempDay = "Monday";
			} else if (day ==  "tue") {
				tempDay = "Tuesday";
			} else if (day == "wed") {
				tempDay = "Wednesday";
			} else if (day == "thu") {
				tempDay = "Thursday";
			} else if (day == "fri") {
				tempDay = "Friday";
			} else {
				return message.channel.send("You did not provide a **valid day**! Use the `.help` command to find out how to use this command.")
			}
			let db = new sqlite.Database('./linksdb.db', sqlite.OPEN_READWRITE | sqlite.OPEN_CREATE);
			let sql = `SELECT UserLink FROM `+ tempDay+`
						WHERE Period = `+ period + ``;
		
			db.all( sql, [], (err, rows) => {
				if (err) {
					throw err;
				}
				
				rows.forEach((row) => {
					message.channel.send("The **Link** for **" + tempDay +"** Period **" + period +"** was changed by **" + row.UserLink + "**.")
				});
			});	
			db.close();
		}  else {
			return message.channel.send("You did not provide a **valid type**! Use the `.help` command to find out how to use this command.")
		}
	}

})		
bot.login(token);