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
const startPeriod = config.startPeriod;
const startLoop = startPeriod;
const endPeriod = config.endPeriod;
const endLoop = endPeriod + 1;

var info = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle('Lesson Bot Personal v1.00:')
	.addFields(
		{name: 'Information:' , value: 'This is a Discord Bot used to help people keep track of their online school lessons and their Zoom Links. Even when online school ends, it can be used as a normal timetable.\nUse the `.help` command to see a full list of commands!'},
		{name: 'Changelog:' , value: 'Use the `.changelog` command to view the full changelog. Use the `.changelogleg` to view the Legacy changelog' },
		{name: 'Github:' , value: 'The open source files of this bot can be found at "https://github.com/sc0rps/Lesson-Bot".' }
	)

var changeLogEmbed = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle('Lesson Bot Changelog:')	
	.addFields(
		{ name: 'v1.00 (06/03/21):' , value: 'First ever release of Lesson Bot which users can host themselves.'},
		{ name: 'v1.01 (06/03/21):' , value: 'Users can now change the start and end period of the day. Head over to config.json and adjust the startPeriod and endPeriod accordingly. The minimum period is 0 and the maximum period is 10.'}
	);

var changeLogLegEmbed = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle('Lesson Bot Changelog:')	
	.addFields(
		{ name: 'v1.00 (11/01/21):' , value: 'Lesson Bot has been created.'},
		{ name: 'v1.01 (11/01/21):' , value: 'Help command created to guide users on how to see their lessons.'},
		{ name: 'v1.02 (12/01/21):' , value: 'Info command created to show version number and changelog.'},
		{ name: 'v1.03 (13/01/21):' , value: 'The time is now alongside the period number.'},
		{ name: 'v1.04 (15/01/21):' , value: 'Fixing some bugs and added future command.'},
		{ name: 'v1.10 (17/01/21):' , value: 'Added the ability to change links! Use the .help command for more information.'},
		{ name: 'v1.11 (20/01/21):' , value: 'Added the ability to change Zoom links for Assembly and Form! Use the .help change for more info!'},
		{ name: 'v1.20 (03/02/21):' , value: 'Revamped the whole code so now it is a third of a size than it used to be!\nChanged how you can display the lessons, you use the first 3 letters of the day. Use command .help for more information.\nCan now display a specific period by adding a number after it (Period 0-5)\nAdded the ability to change the subject and teacher name for future proofing. As a result, the way to change links has changed too. Use the .help change command to find out how.'},
		{ name: 'v1.21 (04/02/21):' , value: 'When changing anything you can now use the short version of a day instead: You can use mon instead of Monday.\nAdded the .future command to the .help command.\nAdded the ability to change the time with they keyword time.'},
		{ name: 'v1.22 (05/02/21):' , value: 'You can now change all of the values for a specific period. Use the .help change command for more info.\nAdded the new .changelog command which shows all previous changelogs and their dates.\nCorrecting some string errors.'},
		{ name: 'v1.23 (13/02/21):' , value: 'Made it so only a certain role can do commands.\nImproved the layout for showing all the links in a day.\nFixed the bug where any letter or prefix can be used in the commands.'},
		{ name: 'v1.24 (20/02/21):' , value: 'You can find out who changed something. Use the `.help who` command to find out more.\nSplit the code up internally by seperating functions in their own `.js` files.\nRemoved the feature where only a certain role can do commands as this can cause problems in other servers.\nChanged the message that would appear once changing something.\nChanged how the embeds look.\nMerged the `.future` command into the `.info` command.'},
	);	

var help = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle('Help:')
	.addFields(
		{name: '`.info`', value: 'Displays information about the bot, its changelog and future updates.'},
		{name: '`.changelog`', value: 'Displays the entire changelog of Lesson Bot'},
		{name: '`.monday` or `.mon`', value: 'Displays the lessons for Monday'},
		{name: '`.tuesday` or `.tue`', value: 'Displays the lessons for Tuesday'},
		{name: '`.wednesday` or `.wed`', value: 'Displays the lessons for Wednesday'},
		{name: '`.thursday` or `.thu`', value: 'Displays the lessons for Thursday'},
		{name: '`.friday` or `.fri`', value: 'Displays the lessons for Friday'},
		{name: '`.help change`', value: 'Displays information on how to change links, subjects, teachers and times of a specific period in a day'},
		{name: '`.help who`', value: 'Displays information on how to find out who changed a link, subject, teacher or time of a specific period in a day'}
	);
	
var helpChange = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle('Change Command:')
	.addFields(
		{name: 'To change the links:', value: '`.change` `link` `day` `period number` `actual link`'},
		{name: 'To change the subject:', value: '`.change` `subject` `day` `period number` `option block` `actual subject`'},
		{name: 'To change the teacher:', value: '`.change` `teacher` `day` `period number` `Mr/Miss/Ms` `name`'},
		{name: 'To change the time:', value: '`.change` `time` `day` `period number` `time`'},
		{name: 'To change all of a specific period in a specific day:', value: '`.change` `all` `day` `period` `time` `option block` `actual subject` `Mr/Miss/Ms` `name` `actual link`'}
	);

var helpWho = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle('Change Command')
	.addFields(
		{name: 'To find out who changed the links:', value: '`.who` `link` `day` `period number`'},
		{name: 'To find out who changed the subject:', value: '`.who` `subject` `day` `period number`'},
		{name: 'To find out who changed the teacher:', value: '`.who` `teacher` `day` `period number`'},
		{name: 'To find out who changed the time:', value: '`.who` `time` `day` `period number`'}
	);	

var extra = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle('Extra')
	.setDescription('O4 Astronomy Tuesday Period 4 Mr Annal: https://zoom.us/j/95285341603?pwd=VVhVYzlzWjdsdUtiZmN0NDBTb0MrZz09&from=msft#success \nO4 Astronomy Friday Period 1 Mr Annal: https://zoom.us/j/92739342615?pwd=YWFMV3V4ZmlJelR6OEJKZm5uQWpndz09&from=msft#success ');			


module.exports = { info, help, helpChange, extra, changeLogEmbed, helpWho}; 