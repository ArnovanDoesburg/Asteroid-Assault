#  ![](https://raw.githubusercontent.com/ArnovanDoesburg/CMTPRG01-8/feature/Collision/dist/img/meteor/tiny2.png) Asteroid Assault ![](https://raw.githubusercontent.com/ArnovanDoesburg/CMTPRG01-8/feature/Collision/dist/img/meteor/tiny1.png)

Destroy all the asteroids without getting hit more than once! Each level spawns more asteroids than the last one, how long will you survive? Use powerups to upgrade your ship's weapons or use the superbomb powerup to make the asteroids go bye-bye!

This project was made on behalf of the Rotterdam University of Applied Sciences.

Play Asteroid Assault on http://arnovandoesburg.nl/AsteroidAssault/

## Powerups
* multi-shot - allows the player to shoot in a wide angle three times.
* superbomb - makes all the asteroids explode.

## Controls
* Movement : arrow keys
* Fire : space bar
* Pause : escape

# Development

## Getting Started 

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

To run this project the TypeScriptCompiler is required.

```
npm install -g typescript
```

You'll also require BrowserSync for live reloading.

```
npm install -g browser-sync
```

### Installing & running

To get the project up and running be sure to watch local files for changes by executing the build command, this can be done by pressing ⌘CMD+⇧SHIFT+B.

Next up we'll want our project to be reloaded everytime the built javascript is changed, this can be done by executing the following command.

```
browser-sync start --server --files "js/main.js"
```

Make sure to execute this command in the /dist directory and not the root folder.

## Design patterns

### Singleton
I applied the singleton pattern within gameManager.ts because there will most likely always be only one GameManager at all times. This class is responsible for taking care of all the GameObject instances that are being used within the game. 

By making this class a singleton it's easy to let objects add and remove themselves from the GameObject array, taking away possible unwanted responsibilities and duplicate parameters. This is made possible by having a GameManager instance available at all times.

### Strategy

The strategy pattern is used to configure the ship shooting behaviour on runtime. At the moment there are two concrete shootingbehaviours which can be toggled on a ship accordingly. By picking up a weapon powerup the colliding ship will have it's shootingbehaviour changed to the multishot shootingbehaviour, which on it's own turn resets the ships shooting behaviour after running out of ammo.

### Observer

Another powerup in the game makes use of the observer pattern. The bomb powerup (**subject**) has a list of asteroids (**observer**) which, when picked up, notifies all the asteroids to explode.

All asteroids are registered to the bomb once a level is created. When an asteroid is shot it unsubscribes and deletes itself from the game.

### Polymorphism

By making every game-related object into a GameObject it was easy to loop through all the different types of GameObjects and check for collision etc. by Using instanceof it was possible to differentiate a ship from a asteroid while they are both of the same type GameObject.

The different messages you see on screen while playing the game are also of the same type Message while also being it's own type. An instance of authorMessage.ts is also an instance of message.ts. 

## Pull request

[Link](https://github.com/Tim0182/CMTPRG01-8/pull/2)

## Peer review

[Link](https://github.com/Tim0182/CMTPRG01-8/issues/6)

## UML diagram

Coming soon™

## Authors

* **Arno van Doesburg** - *development*
* **Kenney.nl** - *graphics*
* **SubspaceAudio** - *sfx*
