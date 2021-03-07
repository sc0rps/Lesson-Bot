# Lesson Bot
A Discord Bot where you can seamlessly view and change your school timetable throughout the day. 

## Features
A timetable with days from Monday to Friday, each day consisting from period 0 to period 10.
You are able to input the time, subject, teacher and link to the class. In a face-to-face teaching, the link can be used as the location of a room.

## Making the bot 
1. Make a [Free Discord Account](https://discord.com/register) (if you don't have one already) and go to the [Discord Homepage](https://discord.com/app).  Press the "plus" icon if you have not created a server and follow these instructions:
1. Create My Own, For me and my friends, Enter a server name of your choice (Example: "Lesson Server"), and hit create!
2. You have now created your own server in Discord!
2. Head over to the [Discord Developer Portal](https://discord.com/developers/applications/) and create a new application with a name of your choice (Example: "Lesson Bot").

![Create Application](https://raw.githubusercontent.com/sc0rps/Lesson-Bot/main/readMeImages/createApplication.png)

3. Click the "Bot" section on the left panel and click "Add Bot".
4. Go to "OAuth2" section on the left panel and tick the "Bot" box in the "Scope" section. 

![Scope](https://raw.githubusercontent.com/sc0rps/Lesson-Bot/main/readMeImages/scope.png)

5. Copy the url and paste it on another tab. Select the server you just created or an existing one and click "Authorise". Complete the Captcha and head back to the other tab, where you are on your server. You should see that your bot has now arrived to the server!

![Adding bot to Server](https://raw.githubusercontent.com/sc0rps/Lesson-Bot/main/readMeImages/addToServer.png)

You have created your bot, but there is no code actually running for the bot to actually do something.

## Self hosting

This is the most easiest way of running your bot but it does have it drawbacks which includes having to keep your PC on to keep it running at all times.

### Prerequisites
* A Windows PC 
* Installed [node.js](https://discordjs.guide/preparations/#installing-node-js)
* Done all previous steps

### Instructions
1. Download the latest version of Lesson Bot at the [releases section](https://github.com/sc0rps/Lesson-Bot/releases/) and extract the folder to where you want.
2. Head over inside of the folder and select the top bar and type "cmd" and press enter.

![Directory](https://raw.githubusercontent.com/sc0rps/Lesson-Bot/main/readMeImages/fileSelect1.png)
![Select Directory](https://raw.githubusercontent.com/sc0rps/Lesson-Bot/main/readMeImages/fileSelect2.png)
![Typing cmd](https://raw.githubusercontent.com/sc0rps/Lesson-Bot/main/readMeImages/fileSelect3.png)

3. Type the following into the terminal, seperately:
```
npm install discord.js
```
```
npm install sqlite3@5.0.0
```
Well done! You set up the Lesson Bot with self hosting! If you do not want to host it on your on system, follow [this guide](https://www.youtube.com/watch?v=e5Dyk3-4nio&ab_channel=1BestCsharpblog) on how to host it on an external website.

## Setup
 Now, you have to setup things that would be **personal** to you. Follow these steps:
1. Go back to the [Discord Developer Portal](https://discord.com/developers/applications/) and go on your application, then go to the "Bot" section on the right. Press copy under "Click to reveal token". This is a token which is exclusive to your bot and should be kept private. 
2. Open up the `config.json` file (you can use a simple text editor such as Visual Studio Code or even Notepad) and paste the token where it says "INSERT TOKEN HERE" inside the quotation marks. 
3. You can also insert your start and end period number (the minimum is 0 and the maximum is 10).
4. Once this is done, type `node .` into the terminal and it should say "The bot is online!". To stop the code running either close the terminal or "Ctrl + C" on the terminal.

When you try and view your lessons (use the `.help` command to view all commands) it says "EMPTY" for every field. To change this you can do the `.help change` command to find out how to change each and every field. However, this can be time consuming. So what you can do is download a program called [DB Browser](https://github.com/sqlitebrowser/sqlitebrowser/releases/download/v3.12.1/DB.Browser.for.SQLite-3.12.1-win32.zip). These are the instructions on how to use it:
1. Open up the `.exe` file by the name of "DB Browser for SQLite"
2. Click the "Open Database" button at the top and naviagate to your folder where the bot is stored and open up the `linksdb.db` file.
3. Go click the "Browse Data" button on the second top row and it should open your different days!
You can now navigate to each day and fill in the values, here is what you have to do:
* Period numbers have to stay the same
* The UserTime, UserSubject, UserTeacher and UserLink tells us who changes them so they do not need to change
* The subject group would be your option block. Example: O4, O1, Core, Language, etc
* The subject would be the actual subject you have
* The teacher has to be the teacher with their title and their name. Note: It can only be two words. Example: "Mr Mark" has to be used and "Mr Jacob Mark" cannot be used. A way to bypass that would be to use "Mr Jacob_Mark"
* The link would be the zoom link for the lesson or the location of your classroom. If you put "free" in that section the code would automatically say it is a free period. Note: It can only be one word. Example: "Floor Two" cannot be used so "Floor_Two" has to be used instead.

After filling out these values, your Lesson Bot should be complete! Use the `.help` command to get started!

## Updating
This bot should (hopefully) get updates and instead of doing the whole process of installing, you can just copy and paste the new files to your directory. Note: you have to put your token and start/end period preferences back into the `config.json` file.
