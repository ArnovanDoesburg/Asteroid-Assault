class GameManager {
    private _ships       : Array<Ship> = new Array();
    private _asteroids   : Array<Asteroid> = new Array();
    private _bullets     : Array<Bullet> = new Array();
    private _powerUps    : Array<GameObject> = new Array();
    private _bombs       : Array<Bomb> = new Array();

    private _gameObjects : Array<GameObject> = new Array();

    public lose        : boolean = false;
    public win         : boolean = false;
    public pause       : boolean = false;

    private static _instance    : GameManager;

    private constructor() {

        new Message('author', 'made by arno van doesburg');

        this._ships.push(new Ship());
        this._powerUps.push(new MultiShotUpgrade);

        this._bombs.push(new Bomb());

        for (let i = 0; i < 20; i++) {
            let asteroid = new Asteroid(this._bombs, this._asteroids);
            this._asteroids.push(asteroid);
        }

        document.addEventListener('keydown', event => {
            if (event.key === 'Escape' || event.keyCode === 27) {
                this.togglePause();
            }
        });
    }

    public static getInstance() {
        if (! GameManager._instance) {
            GameManager._instance = new GameManager()
            }
        return GameManager._instance
    }

    private togglePause() {
        if (!this.win && !this.lose) {

            AudioManager.playPauseSound(this.pause);

            this.pause = !this.pause;
        }
    }

    public loop() {

        if (!this.pause) {
            if (this._asteroids.length > 0) {
                if (this._ships.length > 0) {
                    for (let ship of this._ships) {

                        for (let bomb of this._bombs) {
                            if (ship.hasCollision(bomb)) {
                                bomb.activate();
                                setTimeout(() => {
                                    bomb.remove(bomb, this._bombs);
                                }, 100);
                            }
                        }

                        for (let powerup of this._powerUps) {
                            if (ship.hasCollision(powerup)) {

                                ship.shootBehaviour = new MultiShot(ship);
                                powerup.remove(powerup, this._powerUps);
                            }
                        }

                        for (let bullet of ship.bulletList) {
                            bullet.update();
                            bullet.draw();
                        }

                        for (let asteroid of this._asteroids) {
                                for (let bullet of ship.bulletList) {
                                    if (bullet.hasCollision(asteroid)) {
                                        asteroid.remove(asteroid, this._asteroids);
                                        bullet.remove(bullet, ship.bulletList);
                                        AudioManager.playRandomExplosionSound();
                                    }
                                }

                            if (ship.hasCollision(asteroid)) {
                                if (!ship.invincable) {
                                    ship.hit(this._ships);
                                }
                            }

                            asteroid.update();
                            asteroid.draw();
                        }

                        ship.update();
                        ship.draw();
                    }
                    KeyboardInput.getInstance().inputLoop();
                } else {
                    if (!this.lose){
                        this.lose = true;
                        
                        setTimeout(() => {
                            AudioManager.playSound('./../sfx/ui/sfx_lose.wav');
                        }, 300);
                    }
                }
            } else {
                if (!this.win){
                    this.win = true;
                    setTimeout(() => {
                        AudioManager.playSound('./../sfx/ui/sfx_win.wav');
                    }, 300);
                }
            }
        }
    // loop achterstevoren door removables

    }
}