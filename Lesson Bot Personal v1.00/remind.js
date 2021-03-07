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
const cron = require("node-cron"); 
const express = require("express"); 
let db = new sqlite.Database('./linksdb.db', sqlite.OPEN_READWRITE);
let tempLink, tempDay, tempPeriod, tempEmbed, finalMessage, commandCount, dayCount, dayCount2, dayCount3, tempWho;

const Discord = require('discord.js');
const client = new Discord.Client();

bot.login(token).then(() => {
    
});
