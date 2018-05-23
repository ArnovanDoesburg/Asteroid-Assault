class Game {
    private _ships       : Array<Ship> = new Array();
    private _asteroids   : Array<Asteroid> = new Array();
    private _pause      : boolean = false;

    constructor() {

        let ship = new Ship();
        this._ships.push(ship);

        let asteroid = new Asteroid();
        this._asteroids.push(asteroid);

        requestAnimationFrame(() => this.gameLoop());
    }

    private togglePause() {
        this._pause != this._pause;
    }

    private gameLoop() {
    
        if (!this._pause) {

            for (let ship of this._ships) {
                for (let asteroid of this._asteroids) {
                    let isColliding = ship.hasCollision(asteroid);
                    if (isColliding) {
                        // Player lose life
                    }
                }
                
                for (let bullet of ship.bulletList) {
                    for (let asteroid of this._asteroids) {
                        asteroid.remove(asteroid, this._asteroids);
                        bullet.remove(bullet, ship.bulletList);
                    }
                 }

                ship.update();
                ship.draw();
            }

            for (let asteroid of this._asteroids) {
                asteroid.draw();
                asteroid.update();
            }

            KeyboardInput.getInstance().inputLoop();
        }

        requestAnimationFrame(() => this.gameLoop());
    }

}