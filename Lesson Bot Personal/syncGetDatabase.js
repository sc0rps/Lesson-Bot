const fs = require("fs");
const Discord = require('discord.js');
const config = require('./config.json');
const bot = new Discord.Client();
const guild = new Discord.Guild();
const token = config.token;
const prefix = config.prefix;
const sqlite = require("sqlite3").verbose();
let db = new sqlite.Database('./linksdb.db', sqlite.OPEN_READWRITE);
const startPeriod = config.startPeriod;
const startLoop = startPeriod;
const endPeriod = config.endPeriod;
const endLoop = endPeriod + 1;

var links = new Array(5).fill(0).map(() => new Array(11).fill(0));
var value = new Array(5).fill(0).map(() => new Array(11).fill(0));
var subject = new Array(5).fill(0).map(() => new Array(11).fill(0));
var subjectGroup = new Array(5).fill(0).map(() => new Array(11).fill(0));
var teacher = new Array(5).fill(0).map(() => new Array(11).fill(0));
var times = new Array(5).fill(0).map(() => new Array(11).fill(0));
var tempWho;

function syncLinks() {
	dayCount3 = 0;
	let db = new sqlite.Database('./linksdb.db', sqlite.OPEN_READWRITE | sqlite.OPEN_CREATE);

	for (dayCount3 = 0; dayCount3 < 5; dayCount3++) {
		tempDay = getDay(dayCount3);
		for (var i = 0; i < 11; i++){
			getDatabaseLinks(tempDay, i, dayCount3);
		}
	}
	db.close();
}	
function syncTime() {
	dayCount3 = 0;
	let db = new sqlite.Database('./linksdb.db', sqlite.OPEN_READWRITE | sqlite.OPEN_CREATE);

	for (dayCount3 = 0; dayCount3 < 5; dayCount3++) {
		tempDay = getDay(dayCount3);
		for (var i = 0; i < 11; i++){
			getDatabaseTime(tempDay, i, dayCount3);
		}
	}
	db.close();
}
function syncSubject() {
	dayCount3 = 0;
	let db = new sqlite.Database('./linksdb.db', sqlite.OPEN_READWRITE | sqlite.OPEN_CREATE);

	for (dayCount3 = 0; dayCount3 < 5; dayCount3++) {
		tempDay = getDay(dayCount3);
		for (var i = 0; i < 11; i++){
			getDatabaseSubject(tempDay, i, dayCount3);
		}
	}
	db.close();
}
function syncTeacher() {
	dayCount3 = 0;
	let db = new sqlite.Database('./linksdb.db', sqlite.OPEN_READWRITE | sqlite.OPEN_CREATE);

	for (dayCount3 = 0; dayCount3 < 5; dayCount3++) {
		tempDay = getDay(dayCount3);
		for (var i = 0; i < 11; i++){
			getDatabaseTeacher(tempDay, i, dayCount3);
		}
	}
	db.close();
}

function getDayCount(day) {
	var day = day.toLowerCase();
	if (day == "monday") {
		return 0;
	} else if (day ==  "tuesday") {
		return 1;
	} else if (day == "wednesday") {
		return dayCount2 = 2;
	} else if (day == "thursday") {
		return 3;
	} else if (day == "friday") {
		return 4;
	} else if (day == "Monday") {
		return 0;
	} else if (day ==  "Tuesday") {
		return 1;
	} else if (day == "Wednesday") {
		return 2;
	} else if (day == "Thursday") {
		return 3;
	} else if (day == "Friday") {
		return 4;
	} else if (day == "mon") {
		return 0;
	} else if (day == "tue") {
		return 1;
	} else if (day == "wed") {
		return 2;
	} else if (day == "thu") {
		return 3;
	} else if (day == "fri") {
		return 4;
	} else if (day == "Mon") {
		return 0;
	} else if (day == "Tue") {
		return 1;
	} else if (day == "Wed") {
		return 2;
	} else if (day == "Thu") {
		return 3;
	} else if (day == "Fri") {
		return 4;
	}	
	
}
function getDatabaseLinks(day, period, dayNumber){
	let db = new sqlite.Database('./linksdb.db', sqlite.OPEN_READWRITE | sqlite.OPEN_CREATE);
	let sql = `SELECT Link FROM `+ day+`
                        WHERE Period = `+ period + ``;

	db.all( sql, [], (err, rows) => {
		if (err) {
			throw err;
		}
		
		rows.forEach((row) => {
			links[dayNumber][period] = row.Link;
		});
	});
	db.close();

}
function getDatabaseTime(day, period, dayNumber){
	let db = new sqlite.Database('./linksdb.db', sqlite.OPEN_READWRITE | sqlite.OPEN_CREATE);
	let sql = `SELECT Time FROM `+ day+`
                        WHERE Period = `+ period + ``;

	db.all( sql, [], (err, rows) => {
		if (err) {
			throw err;
		}
		
		rows.forEach((row) => {
			times[dayNumber][period] = row.Time;
		});
	});
	db.close();

}
function getDatabaseSubject(day, period, dayNumber){
	let db = new sqlite.Database('./linksdb.db', sqlite.OPEN_READWRITE | sqlite.OPEN_CREATE);
	let sql = `SELECT Subject FROM `+ day+`
                        WHERE Period = `+ period + ``;

	db.all( sql, [], (err, rows) => {
		if (err) {
			throw err;
		}
		
		rows.forEach((row) => {
			subject[dayNumber][period] = row.Subject;
		});
	});

	sql = `SELECT SubjectGroup FROM `+ day+`
                        WHERE Period = `+ period + ``;

	db.all( sql, [], (err, rows) => {
		if (err) {
			throw err;
		}
		
		rows.forEach((row) => {
			subjectGroup[dayNumber][period] = row.SubjectGroup;
		});
	});
	db.close();
}
function getDatabaseTeacher(day, period, dayNumber){
	let db = new sqlite.Database('./linksdb.db', sqlite.OPEN_READWRITE | sqlite.OPEN_CREATE);
	let sql = `SELECT Teacher FROM `+ day+`
                        WHERE Period = `+ period + ``;

	db.all( sql, [], (err, rows) => {
		if (err) {
			throw err;
		}
		
		rows.forEach((row) => {
			teacher[dayNumber][period] = row.Teacher;
		});
	});
	db.close();
}
function getDay(dayCount) {
	if (dayCount == "0") {
		return "Monday";
	} else if (dayCount == "1") {
		return "Tuesday";
	} else if (dayCount == "2") {
		return "Wednesday";
	} else if (dayCount == "3") {
		return "Thursday";
	} else if (dayCount == "4") {
		return "Friday";
	}   

}
module.exports = { links, value, subject, subjectGroup, teacher, times, who: tempWho, syncLinks, syncTime, syncSubject, syncTeacher, getDayCount, getDatabaseLinks, getDatabaseTime, getDatabaseTeacher, getDatabaseSubject, getDay };