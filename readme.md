# The Loud House

## App structure

1 and 2 player games live in separate folders. 

1 player => nickelodeon-loud-house
2 player => nickelodeon-two-player

You have your game and dist folders. 

Use **npm install** to get the dependencies and build the app for production with **gulp build**

-dist
-game
	-assets
	-css
	-data
	-index.html
	-js
	-shareables
-gulpfile.js
-node_modules
-package.json
-readme.md

## Editable content

###### data > interface_copy.json

All game interface copy is editable here. 

-Control tracking with true/false. The tracking link has been hardcoded to the index.html head section.
-The share_url parameter is the page that holds the app in iframe.
-The base_url is the path to the shareables.
-The return_url is for 2 player only and brings the user back to the 1 player game.
-The heroku_url parameter is the location of the 2 player game.
-Lock and unlock 2 player mode with twoplayeroption true/false.
-Turn on or off the code_unlock feature with codeunlock_on true/false.
-You can change the code unlock password in codeunlock -> password

###### data > data.json

This file contains all character, item and scene data. Item descriptions can be updated here as well as task dialogue copy. It is recommended that you do not touch this unless you need to localise as lots of the values affect the game play and how the tasks work.

If localising then there are numerous sections to edit.

**"scenes": [ ]**

Each entry here is 'scene' within the game, and these contain all frame, furniture and exit data. The only bits to localise here are the exit labels that popup when a player walks near an exit, edit the string in "tooltiplabel", for example below reads "ENTER"

"exits": [
    { "id": 0, "status": 0, "tooltiplabel": "ENTER" },
],

**"items": [ ]**

This contains all item data. The properties to localise are name, description and tooltiplabel. You can see an example below for Lily's milk bottle. The name and description will appear in the item popup and inventory screen on collection, and the tooltiplabel is the copy that appears in the tooltip when a player's character is close to the item.

{ "name": "Lily's milk", "description": "It seems like it holds more than enough milk for just Lily.", "tooltiplabel": "COLLECT" }

**"quests": [ ]**

Quests holds all task data. There are 11 in total (including the boss level), and the task properties and dialogue is stored here. Parts to edit include

"tasksummery" - The task summery that appears at the top of each task in Lincoln's List.

"tasks": [ ] > "text" - This is a task instruction.

"dialogues": [ ] > "text" - Here you have the task dialogue for the sister of the task. There is also an option to add an additional "lincoln": property in each dialogue line that will create a bespoke answer for Lincoln when speaking to a sister, rather than the default answer.

**"medals": [ ]** 

Here you can change the name and description of each medal.

**"clydehints": [ ]**

Change the "hint" property to edit Clyde's hints.


## Two Player

Create your local server with **node game/server.js** and test it on **localhost:5000/uniquecode**

If the user fails to add a string to the heroku link then the page is redirected. This redirect link can be updated in **server.js at line 26**.

To upload to heroku 

###### create repository

$ cd my-project/
$ git init
$ heroku git:remote -a loud-house-two-player-prod

###### deploy

$ git add .
$ git commit -am "make it better"
$ git push heroku master

###### For existing repositories

$ heroku git:remote -a loud-house-two-player-prod
