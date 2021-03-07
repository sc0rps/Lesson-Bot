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

function linkChange(type, day, period, link, user) {
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
}else {
    return "You did not provide a **valid day**! Check your spelling and try again!"

}

if (period > -1 && period < 6 ) {
    tempPeriod = period;
} else {
    return "You did not provide a **valid period**! Check your spelling and try again!";

}

tempLink = link;

let db = new sqlite.Database('./linksdb.db', sqlite.OPEN_READWRITE | sqlite.OPEN_CREATE);
let sql = `UPDATE ` + tempDay +`
            SET Link = '` + tempLink + `'
            WHERE Period = ` + tempPeriod + ``;

db.run(sql, function(err) {
    if (err) {
        return console.error(err.message);
    }
    });
    db.close();
    whoChangeLink(user, day, period);
    return "The **" + type + "** for **" + tempDay + "** Period **" + tempPeriod + "** is now:\n**<" + tempLink + ">** ";


}
function timeChange(type, day, period, time, user) {
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
}else {
    return "You did not provide a **valid day**! Check your spelling and try again!";
}

if (period > -1 && period < 6 ) {
    tempPeriod = period;
} else {
    return "You did not provide a **valid period**! Check your spelling and try again!";
}

var tempTime = time;

let db = new sqlite.Database('./linksdb.db', sqlite.OPEN_READWRITE | sqlite.OPEN_CREATE);
let sql = `UPDATE ` + tempDay +`
            SET Time = '` + tempTime + `'
            WHERE Period = ` + tempPeriod + ``;

db.run(sql, function(err) {
    if (err) {
        return console.error(err.message);
    }
    });
    db.close();
    whoChangeTime(user, day, period)
    return "The **" + type + "** for **" + tempDay + "** Period **" + tempPeriod + "** is now:\n**" + tempTime + "** "
 


}
function subjectChange(type, day, period, subjectGroup, subject, user) {
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
}else {
    return "You did not provide a **valid day**! Check your spelling and try again!"
    
}

if (period > -1 && period < 6 ) {
    tempPeriod = period;
} else {
    return "You did not provide a **valid period**! Check your spelling and try again!";
}


let db = new sqlite.Database('./linksdb.db', sqlite.OPEN_READWRITE | sqlite.OPEN_CREATE);
let sql = `UPDATE ` + tempDay +`
            SET SubjectGroup = '` + subjectGroup + `'
            WHERE Period = ` + tempPeriod + ``;

db.run(sql, function(err) {
    if (err) {
        return console.error(err.message);
    }
    });


sql = `UPDATE ` + tempDay +`
            SET Subject = '` + subject + `'
            WHERE Period = ` + tempPeriod + ``;

db.run(sql, function(err) {
    if (err) {
        return console.error(err.message);
    }
    });
    db.close();
    whoChangeSubject(user, day, period)	
    return "The **" + type + "** for **" + tempDay + "** Period **" + tempPeriod + "** is now:\n**" + subjectGroup + " " + subject + "** ";
}
function teacherChange(type, day, period, prefix, name, user) {
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
} else if (day == "mon") {
    tempDay = "Monday";
} else if (day ==  "tue") {
    tempDay = "Tuesday";
} else if (day == "wed") {
    tempDay = "Wednesday";
} else if (day == "thu") {
    tempDay = "Thursday";
} else if (day == "fri") {
    tempDay = "Friday";
}else {
    return "You did not provide a **valid day**! Check your spelling and try again!";
}

if (period > -1 && period < 6 ) {
    tempPeriod = period;
} else {
    return "You did not provide a **valid period**! Check your spelling and try again!";
}

var tempTeacher = prefix + " " + name;

let db = new sqlite.Database('./linksdb.db', sqlite.OPEN_READWRITE | sqlite.OPEN_CREATE);
let sql = `UPDATE ` + tempDay +`
            SET Teacher = '` + tempTeacher + `'
            WHERE Period = ` + tempPeriod + ``;

db.run(sql, function(err) {
    if (err) {
        return console.error(err.message);
    }
    });


    db.close();
    whoChangeTeacher(user, day, period)	
    return "The **" + type + "** for **" + tempDay + "** Period **" + tempPeriod + "** is now:\n**" + tempTeacher + "** ";

}
function whoChangeLink(user, day, period){
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
    }

    if (period > -1 && period < 6 ) {
        tempPeriod = period;
    }


    let db = new sqlite.Database('./linksdb.db', sqlite.OPEN_READWRITE | sqlite.OPEN_CREATE);
    let sql = `UPDATE ` + tempDay +`
                SET UserLink = '` + user + `'
                WHERE Period = ` + tempPeriod + ``;

    db.run(sql, function(err) {
        if (err) {
            return console.error(err.message);
        }
        });


     db.close();

}
function whoChangeSubject(user, day, period){
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
    }

    if (period > -1 && period < 6 ) {
        tempPeriod = period;
    }

    let db = new sqlite.Database('./linksdb.db', sqlite.OPEN_READWRITE | sqlite.OPEN_CREATE);
    let sql = `UPDATE ` + tempDay +`
                SET UserSubject = '` + user + `'
                WHERE Period = ` + tempPeriod + ``;

    db.run(sql, function(err) {
        if (err) {
            return console.error(err.message);
        }
        });


        db.close();

}
function whoChangeTime(user, day, period){
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
    }

    if (period > -1 && period < 6 ) {
        tempPeriod = period;
    }

    let db = new sqlite.Database('./linksdb.db', sqlite.OPEN_READWRITE | sqlite.OPEN_CREATE);
    let sql = `UPDATE ` + tempDay +`
                SET UserTime = '` + user + `'
                WHERE Period = ` + tempPeriod + ``;

    db.run(sql, function(err) {
        if (err) {
            return console.error(err.message);
        }
        });


        db.close();

}
function whoChangeTeacher(user, day, period){
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
    }

    if (period > -1 && period < 6 ) {
        tempPeriod = period;
    }

    let db = new sqlite.Database('./linksdb.db', sqlite.OPEN_READWRITE | sqlite.OPEN_CREATE);
    let sql = `UPDATE ` + tempDay +`
                SET UserTeacher = '` + user + `'
                WHERE Period = ` + tempPeriod + ``;

    db.run(sql, function(err) {
        if (err) {
            return console.error(err.message);
        }
        });


        db.close();

}

function allChange(day, period, time, subjectGroup, subject, prefix, name, link) {
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
}else {
    return "You did not provide a **valid day**! Check your spelling and try again!";
}

if (period > -1 && period < 6 ) {
    tempPeriod = period;
} else {
    return "You did not provide a **valid period**! Check your spelling and try again!";
}

var tempTime = time;
tempLink = link;
var tempTeacher = prefix + " " + name;

let db = new sqlite.Database('./linksdb.db', sqlite.OPEN_READWRITE | sqlite.OPEN_CREATE);

let sql = `UPDATE ` + tempDay +`
            SET Time = '` + tempTime + `'
            WHERE Period = ` + tempPeriod + ``;

db.run(sql, function(err) {
    if (err) {
        return console.error(err.message);
    }
    });

sql = `UPDATE ` + tempDay +`
            SET SubjectGroup = '` + subjectGroup + `'
            WHERE Period = ` + tempPeriod + ``;

db.run(sql, function(err) {
    if (err) {
        return console.error(err.message);
    }
    });


sql = `UPDATE ` + tempDay +`
            SET Subject = '` + subject + `'
            WHERE Period = ` + tempPeriod + ``;

db.run(sql, function(err) {
    if (err) {
        return console.error(err.message);
    }
    });	

sql = `UPDATE ` + tempDay +`
            SET Teacher = '` + tempTeacher + `'
            WHERE Period = ` + tempPeriod + ``;

db.run(sql, function(err) {
    if (err) {
        return console.error(err.message);
    }
    });
    
sql = `UPDATE ` + tempDay +`
            SET Link = '` + tempLink + `'
            WHERE Period = ` + tempPeriod + ``;

db.run(sql, function(err) {
    if (err) {
        return console.error(err.message);
    }
    });
db.close();
return "**" + tempDay  + "** Period **" + tempPeriod + "** is now:\n**" + subjectGroup + "** **" + subject + "** with **" + tempTeacher + "** at **" + tempTime + "**, with the link: \n**<" + link + ">**.";  	
}
module.exports = { linkChange, timeChange, subjectChange, teacherChange, allChange, whoChangeLink, whoChangeSubject, whoChangeTime, whoChangeTeacher };
