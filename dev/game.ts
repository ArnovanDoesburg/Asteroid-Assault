class Game {
    private _ships       : Array<Ship> = new Array();
    private _asteroids   : Array<Asteroid> = new Array();
    private _bullets     : Array<Bullet> = new Array();
    private _powerUps    : Array<GameObject> = new Array();
    private _bombs       : Array<Bomb> = new Array();
    
    private _pause       : boolean = false;
    private _bomb        : Bomb;

    constructor() {

        let ship = new Ship();
        this._ships.push(ship);

        let upgrade = new MultiShotUpgrade();
        this._powerUps.push(upgrade);

        this._bomb = new Bomb();
        this._bombs.push(this._bomb);

        for (let i = 0; i < 10; i++) {
            let asteroid = new Asteroid(this._bomb, this._asteroids);
            this._asteroids.push(asteroid);
        }

        let pauseButton = new PauseButton(this);

        requestAnimationFrame(() => this.gameLoop());
    }

    public togglePause() {
        this._pause = !this._pause;
        console.log(this._pause);
    }

    private gameLoop() {
    
        if (!this._pause) {
            if (this._asteroids.length > 0) {
                for (let ship of this._ships) {
                    for (let asteroid of this._asteroids) {
                        let isColliding = ship.hasCollision(asteroid);
                        if (isColliding) {
                            ship.remove(ship, this._ships);
                        }
                    }

                    for (let powerup of this._powerUps) {
                        let isColliding = ship.hasCollision(powerup);
                        if (isColliding) {
                            ship.shootBehaviour = new MultiShot(ship);
                            powerup.remove(powerup, this._powerUps);
                        }
                    }

                    for (let bomb of this._bombs) {
                        let isColliding = ship.hasCollision(bomb);
                        if (isColliding) {
                            bomb.activate(this._bombs);
                        }
                    }
                    
                    for (let bullet of ship.bulletList) {
                        for (let asteroid of this._asteroids) {
                            let isColliding = bullet.hasCollision(asteroid);
                            if (isColliding) {
                                asteroid.remove(asteroid, this._asteroids);
                                bullet.remove(bullet, ship.bulletList);
                            }
                        }
                        bullet.draw();
                        bullet.update();
                    }
                ship.update();
                ship.draw();
                }
                for (let asteroid of this._asteroids) {
                    asteroid.draw();
                    asteroid.update();
                }
                KeyboardInput.getInstance().inputLoop();
            } else {
                new Message('winmessage', 'YOU WIN!');
                this.togglePause();
            }
        }

        requestAnimationFrame(() => this.gameLoop());
    }

}